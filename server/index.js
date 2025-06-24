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

    // 建立索引
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

// 各種 API routes（略） ← 這部分你可以保留原來的

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    mongodb_connected: !!db,
    timestamp: new Date()
  });
});

// 🔧 靜態前端處理（Vite）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
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
