import React from 'react';

interface SuggestionProps {
  username: string;
  imageUrl: string;
  relationship: string;
}

const Suggestion: React.FC<SuggestionProps> = ({ username, imageUrl, relationship }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className="w-9 h-9 rounded-full overflow-hidden mr-3">
          <img 
            src={imageUrl} 
            alt={username} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{username}</p>
          <p className="text-xs text-gray-500">{relationship}</p>
        </div>
      </div>
      <button className="text-xs font-semibold text-blue-500">Follow</button>
    </div>
  );
};

const Suggestions: React.FC = () => {
  const suggestions = [
    { username: 'travel.photos', imageUrl: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', relationship: 'New to Instagram' },
    { username: 'art.daily', imageUrl: 'https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', relationship: 'Followed by user1 + 3 more' },
    { username: 'nature_lover', imageUrl: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', relationship: 'Suggested for you' },
    { username: 'fitness.goals', imageUrl: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', relationship: 'Followed by user2 + 7 more' },
    { username: 'food.adventures', imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', relationship: 'Suggested for you' },
  ];

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-500">Suggestions For You</h3>
        <button className="text-xs font-semibold">See All</button>
      </div>
      
      {suggestions.map((suggestion, index) => (
        <Suggestion
          key={index}
          username={suggestion.username}
          imageUrl={suggestion.imageUrl}
          relationship={suggestion.relationship}
        />
      ))}
    </div>
  );
};

export default Suggestions;