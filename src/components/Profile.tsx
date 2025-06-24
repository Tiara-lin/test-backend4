import React from 'react';

interface ProfileProps {
  username: string;
  name: string;
  imageUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ username, name, imageUrl }) => {
  return (
    <div className="flex items-center mb-5">
      <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
        <img 
          src={imageUrl} 
          alt={username} 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="font-semibold">{username}</p>
        <p className="text-gray-500">{name}</p>
      </div>
    </div>
  );
};

export default Profile;