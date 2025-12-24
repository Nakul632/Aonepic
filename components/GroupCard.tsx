
import React from 'react';
import { Group } from '../types';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const formattedDate = group.createdAt?.toDate().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) || 'N/A';

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full">
      <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
        {group.coverImage ? (
          <img 
            src={group.coverImage} 
            alt={group.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">{group.name}</h3>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{formattedDate}</p>
      </div>
    </div>
  );
};

export default GroupCard;
