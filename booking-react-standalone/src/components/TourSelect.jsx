// src/components/TourSelect.jsx
import React from 'react';

const tours = [
    { id: 1, name: "Rugova Hiking (Full Day)", price: 50, duration: "8h" },
    { id: 2, name: "Prizren City Tour", price: 40, duration: "4h" },
];

const TourSelect = ({ onSelect, selectedId }) => {
  return (
    <div className="space-y-4 pt-6">
      <h3 className="text-xl font-bold text-gray-800">2. Select Experience</h3>
      <div className="space-y-2">
        {tours.map((tour) => (
          <div 
            key={tour.id}
            onClick={() => onSelect(tour)}
            className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedId === tour.id ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
            }`}
          >
            <div>
                <div className="font-bold">{tour.name}</div>
                <div className="text-xs text-gray-500">{tour.duration}</div>
            </div>
            <div className="font-bold text-yellow-600">€{tour.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourSelect;