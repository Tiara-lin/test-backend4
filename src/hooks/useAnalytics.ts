import { useEffect, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://test-backend3-production.up.railway.app/api';

interface AnalyticsHook {
  trackSession: () => Promise<void>;
  trackInteraction: (
    actionType: string,
    postId?: string,
    postUsername?: string,
    additionalData?: any
  ) => Promise<void>;
  trackPostView: (
    postId: string,
    postUsername: string,
    viewDuration: number,
    scrollPercentage: number,
    mediaType: 'image' | 'video'
  ) => Promise<void>;
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
        console.log('✅ Session tracked:', sessionId);
      }
    } catch (error) {
      console.error('❌ Session tracking failed:', error);
    }
  };

  const ensureSession = async () => {
    if (sessionTracked.current && sessionId) return;

    await trackSession();

    // 確保 sessionId 有值才繼續
    let retries = 0;
    while (!sessionId && retries < 20) {
      await new Promise((r) => setTimeout(r, 50));
      retries++;
    }

    if (!sessionId) {
      console.warn('⚠️ Failed to initialize sessionId in time');
    }
  };

  const trackInteraction = async (
    actionType: string,
    postId?: string,
    postUsername?: string,
    additionalData: any = {}
  ) => {
    if (!actionType || typeof actionType !== 'string') {
      console.warn('⚠️ trackInteraction called with invalid actionType:', actionType);
      return;
    }

    await ensureSession();
    if (!sessionId) return;

    try {
      await axios.post(`${API_BASE_URL}/track/interaction`, {
        session_id: sessionId,
        action_type: actionType,
        post_id: postId,
        post_username: postUsername,
        additional_data: additionalData
      });

      console.log(`✅ Interaction tracked: ${actionType}`, { postId, postUsername });
    } catch (error) {
      console.error('❌ Interaction tracking failed:', error);
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
        session_id: sessionId,
        post_id: postId,
        post_username: postUsername,
        view_duration: viewDuration,
        scroll_percentage: scrollPercentage,
        media_type: mediaType
      });

      console.log(`✅ Post view tracked: ${postId}`, { viewDuration, scrollPercentage });
    } catch (error) {
      console.error('❌ Post view tracking failed:', error);
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
