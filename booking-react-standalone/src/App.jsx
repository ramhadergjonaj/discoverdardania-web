import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Placeholder components (Të tjerët do i mbushin këto)
const BookingContainer = () => <div className="p-10"><h1>Booking Form (Coming Soon by Person 5)</h1></div>;
const NotFound = () => <div className="p-10"><h1>404 - Page Not Found</h1></div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<BookingContainer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;