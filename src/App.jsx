import React, { useState, useEffect } from 'react';
import './App.css';

const STORAGE_KEY = 'busSeats';

const App = () => {
  const rows = 5;
  const cols = 4;
  const totalSeats = rows * cols;

  const getStoredSeats = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && stored.length === totalSeats) return stored;
    const initial = Array(totalSeats).fill('available');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  };

  const [seats, setSeats] = useState(getStoredSeats);

  
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored) setSeats(stored);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSeatClick = (index) => {
    const updated = [...seats];
    if (updated[index] === 'reserved') return;
    updated[index] = 'reserved'; 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSeats(updated);
  };

  const getSeatClass = (status) => {
    return {
      available: 'seat available',
      reserved: 'seat reserved',
      selected: 'seat selected',
    }[status];
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1> Bus Seat Booking</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 60px)`,
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        {seats.map((status, i) => (
          <div
            key={i}
            className={getSeatClass(status)}
            onClick={() => handleSeatClick(i)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: status === 'reserved' ? 'not-allowed' : 'pointer',
              backgroundColor:
                status === 'reserved'
                  ? '#f44336'
                  : status === 'selected'
                  ? '#ff9800'
                  : '#4caf50',
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
