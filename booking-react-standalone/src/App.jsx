import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingContainer from './components/BookingContainer'; // <--- Importo container-in e ri

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 py-12">
        <Routes>
          {/* Tani Route '/' shfaq aplikacionin e vërtetë, jo placeholder */}
          <Route path="/" element={<BookingContainer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;