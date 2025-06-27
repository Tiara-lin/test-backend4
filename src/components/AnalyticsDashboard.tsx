import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, Heart, MessageCircle, Share, Bookmark, Clock } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'https://test-backend3-production.up.railway.app/api';

interface AnalyticsData {
  total_interactions: number;
  unique_users: number;
  interaction_breakdown: { _id: string; count: number }[];
  popular_posts: { _id: { post_id: string; post_username: string }; interactions: number }[];
  device_breakdown: { _id: string; count: number }[];
  hourly_activity: { _id: number; count: number }[];
  timeframe: string;
}

interface PostInteractionStats {
  post_id: string;
  likes: number;
  saves: number;
  shares: number;
  comments: number;
  views: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [postStats, setPostStats] = useState<PostInteractionStats[]>([]);
  const [timeframe, setTimeframe] = useState('24h');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async (selectedTimeframe: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/analytics/dashboard?timeframe=${selectedTimeframe}`);
      if (response.data.success) {
        setAnalyticsData(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(timeframe);
  }, [timeframe]);

  useEffect(() => {
    if (analyticsData?.popular_posts?.length) {
      const ids = analyticsData.popular_posts.map(p => p._id.post_id).join(',');
      axios.get(`${API_BASE_URL}/posts/stats?ids=${ids}`)
        .then(res => {
          if (res.data.success) setPostStats(res.data.data);
        });
    }
  }, [analyticsData]);

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment': return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'share': return <Share className="w-4 h-4 text-green-500" />;
      case 'save': return <Bookmark className="w-4 h-4 text-purple-500" />;
      case 'post_view': return <Eye className="w-4 h-4 text-gray-500" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-red-200">
        <div className="text-red-600 text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="font-medium">Analytics Unavailable</p>
          <p className="text-sm text-red-500 mt-1">{error}</p>
          <button 
            onClick={() => fetchAnalytics(timeframe)}
            className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          Analytics Dashboard
        </h2>
        <select 
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      {analyticsData && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Interactions</p>
                  <p className="text-2xl font-bold text-blue-800">{analyticsData.total_interactions.toLocaleString()}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Unique Users</p>
                  <p className="text-2xl font-bold text-green-800">{analyticsData.unique_users.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Interaction Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Interaction Types</h3>
            <div className="space-y-2">
              {analyticsData.interaction_breakdown.map((interaction) => (
                <div key={interaction._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getInteractionIcon(interaction._id)}
                    <span className="font-medium capitalize">{interaction._id.replace('_', ' ')}</span>
                  </div>
                  <span className="font-bold text-gray-700">{interaction.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Posts */}
          {analyticsData.popular_posts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Most Popular Posts</h3>
              <div className="space-y-2">
                {analyticsData.popular_posts.slice(0, 5).map((post, index) => (
                  <div key={post._id.post_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">@{post._id.post_username}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">{post._id.post_id}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-700">{post.interactions} interactions</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Post Stats */}
          {postStats.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Detailed Post Stats</h3>
              <div className="space-y-2">
                {postStats.map((stat) => (
                  <div key={stat.post_id} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium truncate mb-1 text-sm">{stat.post_id}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span>👁️ {stat.views} views</span>
                      <span>❤️ {stat.likes} likes</span>
                      <span>💬 {stat.comments} comments</span>
                      <span>🔖 {stat.saves} saves</span>
                      <span>📤 {stat.shares} shares</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Device Breakdown */}
          {analyticsData.device_breakdown.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Device Types</h3>
              <div className="grid grid-cols-2 gap-4">
                {analyticsData.device_breakdown.map((device) => (
                  <div key={device._id} className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 capitalize">{device._id || 'Unknown'}</p>
                    <p className="text-xl font-bold text-gray-800">{device.count}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hourly Activity */}
          {analyticsData.hourly_activity.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Activity by Hour</h3>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {Array.from({ length: 24 }, (_, hour) => {
                  const activity = analyticsData.hourly_activity.find(a => a._id === hour);
                  const count = activity?.count || 0;
                  const maxCount = Math.max(...analyticsData.hourly_activity.map(a => a.count));
                  const height = maxCount > 0 ? (count / maxCount) * 100 : 0;

                  return (
                    <div key={hour} className="text-center">
                      <div className="bg-gray-200 rounded-t h-16 flex items-end justify-center relative">
                        <div 
                          className="bg-blue-500 rounded-t w-full transition-all duration-300"
                          style={{ height: `${height}%` }}
                        ></div>
                        {count > 0 && (
                          <span className="absolute top-1 text-xs font-bold text-white">
                            {count}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{hour}:00</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
