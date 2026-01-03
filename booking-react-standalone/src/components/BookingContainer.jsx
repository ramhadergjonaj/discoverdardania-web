// src/components/BookingContainer.jsx
import React, { useState, useEffect } from 'react';

// Importojmë komponentët që kanë bërë shokët e ekipit
// (Nëse ata nuk i kanë bërë ende, krijo versionet dummy sa për të testuar)
import DestinationSelect from './DestinationSelect'; // Nga Personi 2
import TourSelect from './TourSelect';             // Nga Personi 3
import { Input, Button } from './ui/Input';        // Nga Personi 4 (supozojmë Input exportohet nga ui/Input ose ui/index)
// SHËNIM: Rregullojini importet sipas emrave që kanë vendosur të tjerët

const BookingContainer = () => {
  // 1. STATE MANAGEMENT (Gjendja e aplikacionit)
  const [formData, setFormData] = useState({
    destination: null,
    tour: null,
    name: '',
    email: '',
    date: '',
    people: 1 // Default 1 person
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // 2. LLOGARITJA E ÇMIMIT (Sa herë ndryshon tour ose people)
  useEffect(() => {
    if (formData.tour) {
      const basePrice = formData.tour.price;
      const total = basePrice * formData.people;
      setTotalPrice(total);
    }
  }, [formData.tour, formData.people]);

  // 3. HANDLERS (Funksionet që ndryshojnë state-in)
  const handleDestinationSelect = (dest) => {
    setFormData(prev => ({ ...prev, destination: dest, tour: null })); // Reset tour kur ndërron vendin
  };

  const handleTourSelect = (tour) => {
    setFormData(prev => ({ ...prev, tour: tour }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.tour || !formData.date) {
      alert("Please fill in all fields!");
      return;
    }
    // Simulation of API Call
    alert(`Success! Booking confirmed for ${formData.name}.\nTotal: €${totalPrice}`);
    console.log("Final Booking Data:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* MAJTAS: Forma e Zgjedhjes */}
      <div className="md:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">Book Your Adventure</h1>
        
        {/* Hapi 1: Zgjidh Destinacionin (Personi 2) */}
        <DestinationSelect 
          selectedId={formData.destination?.id} 
          onSelect={handleDestinationSelect} 
        />

        {/* Hapi 2: Zgjidh Turin (Personi 3) - Shfaqet vetëm pasi ke zgjedhur Destinacionin */}
        {formData.destination && (
          <TourSelect 
            selectedId={formData.tour?.id} 
            onSelect={handleTourSelect} 
            destinationId={formData.destination.id} // Filter tours by destination if needed
          />
        )}

        {/* Hapi 3: Detajet Personale (Personi 4) */}
        {formData.tour && (
            <div className="space-y-4 pt-6 border-t">
                <h3 className="text-xl font-bold text-gray-800">3. Your Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Full Name" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                    <Input 
                      label="Email" 
                      type="email"
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                     <Input 
                      label="Date" 
                      type="date"
                      value={formData.date} 
                      onChange={(e) => setFormData({...formData, date: e.target.value})} 
                    />
                     <Input 
                      label="People" 
                      type="number"
                      value={formData.people} 
                      onChange={(e) => setFormData({...formData, people: parseInt(e.target.value) || 1})} 
                    />
                </div>
            </div>
        )}
      </div>

      {/* DJATHTAS: Summary / Fatura (Personi 5 Logic) */}
      <div className="md:col-span-1">
        <div className="bg-gray-50 p-6 rounded-lg sticky top-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Destination:</span>
                    <span className="font-medium">{formData.destination?.name || '-'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Tour:</span>
                    <span className="font-medium">{formData.tour?.name || '-'}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-gray-500">People:</span>
                    <span className="font-medium">{formData.people}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between text-lg font-bold text-yellow-600">
                    <span>TOTAL:</span>
                    <span>€{totalPrice}</span>
                </div>
            </div>

            <Button 
              className="w-full mt-6 py-3 text-lg" 
              onClick={handleSubmit}
            >
              Confirm Booking
            </Button>
        </div>
      </div>

    </div>
  );
};

export default BookingContainer;