import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db('instagram_analytics');
    console.log('Connected to MongoDB');

    // Create indexes
    await db.collection('user_interactions').createIndex({ timestamp: -1 });
    await db.collection('user_interactions').createIndex({ ip_address: 1 });
    await db.collection('user_interactions').createIndex({ post_id: 1 });
    await db.collection('user_sessions').createIndex({ ip_address: 1 });
    await db.collection('user_sessions').createIndex({ session_start: -1 });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Helper: Get client IP
function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.connection?.remoteAddress || req.socket?.remoteAddress || req.connection?.socket?.remoteAddress || req.ip;
}

// Helper: Get device info
function getDeviceInfo(req) {
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
  const browser = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)/i)?.[0] || 'Unknown';
  return {
    user_agent: userAgent,
    is_mobile: isMobile,
    browser,
    device_type: isMobile ? 'mobile' : 'desktop'
  };
}

// API: Track session
app.post('/api/track/session', async (req, res) => {
  try {
    const ip_address = getClientIP(req);
    const device_info = getDeviceInfo(req);
    const { page_url } = req.body;

    const sessionData = {
      ip_address,
      session_start: new Date(),
      page_url,
      ...device_info,
      session_id: `${ip_address}_${Date.now()}`
    };

    await db.collection('user_sessions').insertOne(sessionData);

    res.json({
      success: true,
      session_id: sessionData.session_id,
      message: 'Session tracked successfully'
    });
  } catch (error) {
    console.error('Session tracking error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Track interaction
app.post('/api/track/interaction', async (req, res) => {
  try {
    const ip_address = getClientIP(req);
    const device_info = getDeviceInfo(req);
    const {
      action_type,
      post_id,
      post_username,
      session_id,
      additional_data
    } = req.body;

    const interactionData = {
      ip_address,
      action_type,
      post_id,
      post_username,
      session_id,
      timestamp: new Date(),
      additional_data: additional_data || {},
      ...device_info
    };

    await db.collection('user_interactions').insertOne(interactionData);

    res.json({
      success: true,
      message: 'Interaction tracked successfully'
    });
  } catch (error) {
    console.error('Interaction tracking error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Track post view
app.post('/api/track/post-view', async (req, res) => {
  try {
    const ip_address = getClientIP(req);
    const device_info = getDeviceInfo(req);
    const {
      post_id,
      post_username,
      session_id,
      view_duration,
      scroll_percentage,
      media_type
    } = req.body;

    const viewData = {
      ip_address,
      action_type: 'post_view',
      post_id,
      post_username,
      session_id,
      timestamp: new Date(),
      view_duration,
      scroll_percentage,
      media_type,
      ...device_info
    };

    await db.collection('user_interactions').insertOne(viewData);

    res.json({
      success: true,
      message: 'Post view tracked successfully'
    });
  } catch (error) {
    console.error('Post view tracking error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Dashboard
app.get('/api/analytics/dashboard', async (req, res) => {
  try {
    const { timeframe = '24h' } = req.query;
    const now = new Date();
    let timeFilter = {};

    switch (timeframe) {
      case '1h':
        timeFilter = { timestamp: { $gte: new Date(now - 60 * 60 * 1000) } };
        break;
      case '24h':
        timeFilter = { timestamp: { $gte: new Date(now - 24 * 60 * 60 * 1000) } };
        break;
      case '7d':
        timeFilter = { timestamp: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } };
        break;
      case '30d':
        timeFilter = { timestamp: { $gte: new Date(now - 30 * 24 * 60 * 60 * 1000) } };
        break;
    }

    const interactionStats = await db.collection('user_interactions').aggregate([
      { $match: timeFilter },
      { $group: { _id: '$action_type', count: { $sum: 1 } } }
    ]).toArray();

    const uniqueUsers = await db.collection('user_interactions').distinct('ip_address', timeFilter);

    const popularPosts = await db.collection('user_interactions').aggregate([
      { $match: { ...timeFilter, post_id: { $exists: true } } },
      { $group: { _id: { post_id: '$post_id', post_username: '$post_username' }, interactions: { $sum: 1 } } },
      { $sort: { interactions: -1 } },
      { $limit: 10 }
    ]).toArray();

    const deviceStats = await db.collection('user_interactions').aggregate([
      { $match: timeFilter },
      { $group: { _id: '$device_type', count: { $sum: 1 } } }
    ]).toArray();

    const hourlyActivity = await db.collection('user_interactions').aggregate([
      { $match: timeFilter },
      {
        $group: {
          _id: { $hour: '$timestamp' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]).toArray();

    res.json({
      success: true,
      data: {
        total_interactions: interactionStats.reduce((sum, stat) => sum + stat.count, 0),
        unique_users: uniqueUsers.length,
        interaction_breakdown: interactionStats,
        popular_posts: popularPosts,
        device_breakdown: deviceStats,
        hourly_activity: hourlyActivity,
        timeframe
      }
    });
  } catch (error) {
    console.error('Analytics dashboard error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Per-user analytics
app.get('/api/analytics/user/:ip', async (req, res) => {
  try {
    const { ip } = req.params;

    const userInteractions = await db.collection('user_interactions')
      .find({ ip_address: ip })
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    const userSessions = await db.collection('user_sessions')
      .find({ ip_address: ip })
      .sort({ session_start: -1 })
      .limit(10)
      .toArray();

    res.json({
      success: true,
      data: {
        ip_address: ip,
        interactions: userInteractions,
        sessions: userSessions,
        total_interactions: userInteractions.length
      }
    });
  } catch (error) {
    console.error('User analytics error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    mongodb_connected: !!db,
    timestamp: new Date()
  });
});

// ---- 靜態檔案處理 ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- 啟動伺服器 ----
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToMongoDB();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await client.close();
  process.exit(0);
});