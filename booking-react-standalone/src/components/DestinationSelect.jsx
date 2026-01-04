// src/components/DestinationSelect.jsx
import React from 'react';

// Këto të dhëna normalisht vijnë nga API, por këtu i kemi statike
const destinations = [
  { id: 1, name: "Rugova Canyon", price: 50 },
  { id: 2, name: "Prizren", price: 40 },
  { id: 3, name: "Mirusha", price: 45 },
];

const DestinationSelect = ({ onSelect, selectedId }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">1. Choose Destination</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {destinations.map((dest) => (
          <div 
            key={dest.id}
            onClick={() => onSelect(dest)}
            className={`cursor-pointer border-2 rounded-xl p-4 transition-all hover:shadow-lg ${
              selectedId === dest.id 
                ? 'border-yellow-500 bg-yellow-50' 
                : 'border-gray-200 hover:border-yellow-200'
            }`}
          >
            <div className="font-bold">{dest.name}</div>
            <div className="text-sm text-gray-500">From €{dest.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationSelect;