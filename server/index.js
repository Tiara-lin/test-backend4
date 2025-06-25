import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS 設定：允許 GitHub Pages 請求
app.use(cors({
  origin: 'https://tiara-lin.github.io',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));
app.use(express.json());

// MongoDB connection
let db;
const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db('instagram_analytics');
    console.log('Connected to MongoDB');

    await db.collection('user_interactions').createIndex({ timestamp: -1 });
    await db.collection('user_interactions').createIndex({ ip_address: 1 });
    await db.collection('user_interactions').createIndex({ post_id: 1 });
    await db.collection('user_sessions').createIndex({ ip_address: 1 });
    await db.collection('user_sessions').createIndex({ session_start: -1 });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.connection?.remoteAddress || req.socket?.remoteAddress || req.connection?.socket?.remoteAddress || req.ip;
}

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

// ✅ Dashboard API
app.get('/api/analytics/dashboard', async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '24h';
    const now = new Date();
    let since;

    switch (timeframe) {
      case '1h':
        since = new Date(now.getTime() - 60 * 60 * 1000); break;
      case '7d':
        since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); break;
      case '30d':
        since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); break;
      case '24h':
      default:
        since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    const matchStage = { $match: { timestamp: { $gte: since } } };

    const [
      totalInteractions,
      uniqueUsers,
      interactionBreakdown,
      popularPosts,
      deviceBreakdown,
      hourlyActivity
    ] = await Promise.all([
      db.collection('user_interactions').countDocuments({ timestamp: { $gte: since } }),
      db.collection('user_sessions').distinct('ip_address', { session_start: { $gte: since } }).then(arr => arr.length),
      db.collection('user_interactions').aggregate([
        matchStage,
        { $group: { _id: '$interaction_type', count: { $sum: 1 } } }
      ]).toArray(),
      db.collection('user_interactions').aggregate([
        matchStage,
        { $group: { _id: { post_id: '$post_id', post_username: '$post_username' }, interactions: { $sum: 1 } } },
        { $sort: { interactions: -1 } },
        { $limit: 5 }
      ]).toArray(),
      db.collection('user_sessions').aggregate([
        { $match: { session_start: { $gte: since } } },
        { $group: { _id: '$device.device_type', count: { $sum: 1 } } }
      ]).toArray(),
      db.collection('user_interactions').aggregate([
        matchStage,
        { $group: { _id: { $hour: '$timestamp' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]).toArray()
    ]);

    res.json({
      success: true,
      data: {
        total_interactions: totalInteractions,
        unique_users: uniqueUsers,
        interaction_breakdown: interactionBreakdown,
        popular_posts: popularPosts,
        device_breakdown: deviceBreakdown,
        hourly_activity: hourlyActivity,
        timeframe
      }
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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

// ✅ 靜態前端處理修正（改為 ../dist）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// ✅ 啟動伺服器
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToMongoDB();
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await client.close();
  process.exit(0);
});
