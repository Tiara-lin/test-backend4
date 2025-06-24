import { useEffect, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://test-backend2-production.up.railway.app/api';

interface AnalyticsHook {
  trackSession: () => Promise<void>;
  trackInteraction: (actionType: string, postId?: string, postUsername?: string, additionalData?: any) => Promise<void>;
  trackPostView: (postId: string, postUsername: string, viewDuration: number, scrollPercentage: number, mediaType: 'image' | 'video') => Promise<void>;
}

let sessionId: string | null = null;

export const useAnalytics = (): AnalyticsHook => {
  const sessionTracked = useRef(false);

  const trackSession = async () => {
    if (sessionTracked.current) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/track/session`, {
        page_url: window.location.href
      });

      if (response.data.success) {
        sessionId = response.data.session_id;
        sessionTracked.current = true;
        console.log('Session tracked:', sessionId);
      }
    } catch (error) {
      console.error('Session tracking failed:', error);
    }
  };

  const ensureSession = async () => {
    if (!sessionTracked.current) {
      await trackSession();
    }
  };

  const trackInteraction = async (
    actionType: string,
    postId?: string,
    postUsername?: string,
    additionalData?: any
  ) => {
    await ensureSession();
    if (!sessionId) return;

    try {
      await axios.post(`${API_BASE_URL}/track/interaction`, {
        action_type: actionType,
        post_id: postId,
        post_username: postUsername,
        session_id: sessionId,
        additional_data: additionalData
      });

      console.log(`Interaction tracked: ${actionType}`, { postId, postUsername });
    } catch (error) {
      console.error('Interaction tracking failed:', error);
    }
  };

  const trackPostView = async (
    postId: string,
    postUsername: string,
    viewDuration: number,
    scrollPercentage: number,
    mediaType: 'image' | 'video'
  ) => {
    await ensureSession();
    if (!sessionId) return;

    try {
      await axios.post(`${API_BASE_URL}/track/post-view`, {
        post_id: postId,
        post_username: postUsername,
        session_id: sessionId,
        view_duration: viewDuration,
        scroll_percentage: scrollPercentage,
        media_type: mediaType
      });

      console.log(`Post view tracked: ${postId}`, { viewDuration, scrollPercentage });
    } catch (error) {
      console.error('Post view tracking failed:', error);
    }
  };

  useEffect(() => {
    trackSession();
  }, []);

  return {
    trackSession,
    trackInteraction,
    trackPostView
  };
};