import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Volume2, VolumeX } from 'lucide-react';

interface Comment {
  username: string;
  text: string;
}

interface PostProps {
  username: string;
  userImage: string;
  location?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  caption: string;
  likes: number;
  timestamp: string;
  comments: Comment[];
}

const Post: React.FC<PostProps> = ({
  username,
  userImage,
  location,
  media,
  caption,
  likes,
  timestamp,
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleLike = () => setIsLiked(!isLiked);
  const handleSave = () => setIsSaved(!isSaved);
  const toggleComments = () => setShowAllComments(!showAllComments);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={userImage} alt={username} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-semibold text-sm">{username}</p>
            {location && <p className="text-xs text-gray-500">{location}</p>}
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-500 cursor-pointer" />
      </div>

      {/* Post Media */}
      {media && (
        <div className="w-full aspect-square bg-black flex items-center justify-center overflow-hidden relative">
          {media.type === 'image' ? (
            <img 
              src={media.url} 
              alt="Post" 
              className="w-full h-full object-cover"
              onDoubleClick={handleLike}
            />
          ) : (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={media.url}
                poster={media.thumbnail}
                className="w-full h-full object-contain bg-black"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
              <button
                className="absolute bottom-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Heart 
              className={`h-6 w-6 cursor-pointer transition-transform hover:scale-110 ${isLiked ? 'fill-red-500 text-red-500' : 'text-black'}`} 
              onClick={handleLike}
            />
            <MessageCircle className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" />
            <Send className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" />
          </div>
          <Bookmark 
            className={`h-6 w-6 cursor-pointer transition-transform hover:scale-110 ${isSaved ? 'fill-black' : ''}`} 
            onClick={handleSave}
          />
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mt-2">{likes + (isLiked ? 1 : 0)} likes</p>

        {/* Caption */}
        <div className="mt-1">
          <p className="text-sm">
            <span className="font-semibold">{username}</span> {caption}
          </p>
        </div>

        {/* Comments */}
        {comments.length > 0 && (
          <div className="mt-2">
            {comments.length > 2 && !showAllComments && (
              <button 
                className="text-sm text-gray-500 mb-1"
                onClick={toggleComments}
              >
                View all {comments.length} comments
              </button>
            )}
            
            {displayedComments.map((comment, index) => (
              <div key={index} className="text-sm mb-1">
                <span className="font-semibold">{comment.username}</span> {comment.text}
              </div>
            ))}
            
            {showAllComments && comments.length > 2 && (
              <button 
                className="text-sm text-gray-500 mt-1"
                onClick={toggleComments}
              >
                Show less
              </button>
            )}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>

        {/* Add Comment */}
        <div className="mt-3 border-t border-gray-200 pt-3">
          <form className="flex items-center">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 text-sm border-none focus:ring-0 focus:outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {comment.length > 0 && (
              <button 
                type="submit" 
                className="text-blue-500 font-semibold text-sm"
              >
                Post
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
