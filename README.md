# Instagram Interface Clone with Analytics

A production-ready Instagram interface clone built with React, TypeScript, and Tailwind CSS, featuring comprehensive user behavior tracking and MongoDB integration.

## Features

### Frontend
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Instagram-like Interface**: Stories, feed, posts, comments, likes, and saves
- **Interactive Elements**: Video playback, image viewing, comment interactions
- **Modern UI**: Clean design with hover effects and smooth transitions

### Backend Analytics
- **User Behavior Tracking**: Monitors all user interactions including:
  - Likes, unlikes, saves, unsaves
  - Comments and comment viewing
  - Video play/pause, mute/unmute
  - Story clicks and navigation
  - Post views with duration tracking
  - Search queries and navigation clicks

- **Data Collection**: 
  - IP address tracking
  - Device type detection (mobile/desktop)
  - Browser identification
  - Session management
  - Timestamp logging

- **MongoDB Integration**: 
  - Scalable cloud database storage
  - Indexed collections for performance
  - Real-time analytics dashboard

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up MongoDB**:
   - Create a MongoDB Atlas cluster or use local MongoDB
   - Copy `.env.example` to `.env`
   - Update the `MONGODB_URI` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/instagram_analytics?retryWrites=true&w=majority
   ```

3. **Start the application**:
   ```bash
   # Start the backend server
   npm run server

   # In another terminal, start the frontend
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Analytics Dashboard: Click the chart icon in the bottom-right corner

## API Endpoints

### Analytics Tracking
- `POST /api/track/session` - Track user session start
- `POST /api/track/interaction` - Track user interactions
- `POST /api/track/post-view` - Track post viewing behavior

### Analytics Retrieval
- `GET /api/analytics/dashboard?timeframe=24h` - Get dashboard analytics
- `GET /api/analytics/user/:ip` - Get specific user behavior data
- `GET /api/health` - Health check endpoint

## Database Schema

### Collections

**user_sessions**:
- `ip_address`: User's IP address
- `session_start`: Session start timestamp
- `page_url`: Initial page URL
- `user_agent`: Browser user agent
- `is_mobile`: Boolean for mobile detection
- `browser`: Browser type
- `device_type`: 'mobile' or 'desktop'
- `session_id`: Unique session identifier

**user_interactions**:
- `ip_address`: User's IP address
- `action_type`: Type of interaction (like, comment, share, etc.)
- `post_id`: Unique post identifier
- `post_username`: Post author username
- `session_id`: Associated session ID
- `timestamp`: Interaction timestamp
- `additional_data`: Extra interaction-specific data
- `user_agent`: Browser user agent
- `is_mobile`: Boolean for mobile detection
- `browser`: Browser type
- `device_type`: 'mobile' or 'desktop'

## Tracked Interactions

- **Post Interactions**: like, unlike, save, unsave, share, comment
- **Media Interactions**: play_video, pause_video, mute_video, unmute_video
- **Navigation**: story_click, navigation_click, search_focus, search_query
- **Viewing Behavior**: post_view, view_all_comments, comment_input_focus
- **Social Features**: follow_suggestion, suggestion_profile_click

## Analytics Dashboard

The built-in analytics dashboard provides:
- Total interactions and unique users
- Interaction type breakdown
- Most popular posts
- Device type distribution
- Hourly activity patterns
- Customizable time ranges (1h, 24h, 7d, 30d)

## Privacy & Compliance

- IP addresses are collected for analytics purposes
- User agents are stored for device detection
- Search queries are truncated to first 20 characters
- No personal identifying information is stored
- All data is anonymized and aggregated

## Production Deployment

For production deployment:
1. Set up MongoDB Atlas with proper security
2. Configure environment variables
3. Enable CORS for your domain
4. Set up proper indexing for performance
5. Implement rate limiting and security measures
6. Consider GDPR compliance for EU users

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with cloud Atlas
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Analytics**: Custom tracking system

## License

This project is for educational and demonstration purposes.