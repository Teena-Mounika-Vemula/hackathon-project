// src/pages/EventDashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import EventModal from './eventModal';
import DirectionsModal from './directionModal';

const EventDashboard = ({ navigateTo }) => {
const [activeNavItem, setActiveNavItem] = useState('cleanup-events');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [directionsLocation, setDirectionsLocation] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);

    const handleNavItemClick = (item) => {
    setActiveNavItem(item);
    navigateTo(item);
  };

const [showAlert, setShowAlert] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, 3000);
  return () => clearTimeout(timer);
}, []);

  const handleJoinEvent = (eventId) => {
    setSelectedEvent(eventId);
    setShowEventModal(true);
  };

  const handleOpenDirections = (location) => {
    setDirectionsLocation(location);
    setShowDirectionsModal(true);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white font-sans">
      <Sidebar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />
      <main className="ml-[280px] w-full p-8 space-y-10">
      <div className="flex-1 p-6">
        {showAlert && (
          <div className="fixed top-20 right-5 bg-gradient-to-br from-green-500 to-green-700 text-white px-4 py-3 rounded-lg shadow-lg z-[1000] animate-slideIn">
            <div className="flex justify-between items-start gap-4">
              <div>
                <strong>🎉 New Event Alert!</strong><br />
                Emergency cleanup at Dadar Beach tomorrow 4 PM
              </div>
              <button onClick={() => setShowAlert(false)} className="text-white text-xl leading-none">×</button>
            </div>
          </div>
        )}
          <h1 className="text-3xl font-extrabold text-green-400 mb-6 drop-shadow">🌊 Cleanup Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] rounded-xl shadow-lg p-5 border-l-4 border-green-500">
            <p className="text-sm text-blue-400 font-semibold">Sunday, 6:30 AM</p>
            <h3 className="text-lg font-bold text-white mt-1">Versova Beach Conservation Drive</h3>
            <p className="text-sm text-gray-300 mt-1">📍 Versova Beach - Near Fishing Village</p>
            <span className="inline-block bg-yellow-100 text-yellow-900 text-xs font-medium px-2 py-1 rounded-full mt-2">
              18 volunteers registered
            </span>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => handleJoinEvent(1)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold transition-all">
                Join Event
              </button>
              <button onClick={() => handleOpenDirections('versova-beach')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-semibold transition-all">
                Get Directions
              </button>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl shadow-lg p-5 border-l-4 border-blue-500">
            <p className="text-sm text-blue-400 font-semibold">Next Saturday, 7:00 AM</p>
            <h3 className="text-lg font-bold text-white mt-1">Marine Drive Coastal Cleanup</h3>
            <p className="text-sm text-gray-300 mt-1">📍 Marine Drive - Near Nariman Point</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mt-2">
              Planning Phase
            </span>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => handleJoinEvent(2)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold transition-all">
                Express Interest
              </button>
            </div>
          </div>
        </div>

      {/* Modals */}
      {showEventModal && (
        <EventModal
          eventId={selectedEvent}
          onClose={() => setShowEventModal(false)}
          onOpenDirections={handleOpenDirections}
        />
      )}

      {showDirectionsModal && (
        <DirectionsModal
          locationKey={directionsLocation}
          onClose={() => setShowDirectionsModal(false)}
        />
      )}
    </div>
    </main>
    </div>
  );
};

export default EventDashboard;
