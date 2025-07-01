// src/components/EventModal.jsx
import React from 'react';

const eventDetails = {
  'juhu-cleanup': {
    title: 'Juhu Beach Sunrise Cleanup',
    date: 'Tomorrow, 7:00 AM - 10:00 AM',
    location: 'Juhu Beach, Zone A - Near ISKCON Temple',
    organizer: 'Anjali Sharma',
    volunteers: 32,
    capacity: 50,
    equipment: 'Gloves and bags provided',
    transport: 'Bus from Andheri Station (6:30 AM)',
    weather: '26°C, Partly cloudy'
  },
  'versova-cleanup': {
    title: 'Versova Beach Conservation Drive',
    date: 'Sunday, 6:30 AM - 9:30 AM',
    location: 'Versova Beach - Near Fishing Village',
    organizer: 'Green Mumbai Initiative',
    volunteers: 18,
    capacity: 40,
    equipment: 'Bring your own gloves',
    transport: 'Metro to Versova, 5 min walk',
    weather: '24°C, Clear skies'
  }
};

const EventModal = ({ eventId, onClose, onOpenDirections }) => {
  const event = eventDetails[eventId] || eventDetails['juhu-cleanup'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[2000] animate-fadeIn">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-2xl p-8 max-w-xl w-11/12 max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <h2 className="text-green-400 text-2xl font-extrabold mb-2 drop-shadow">{event.title}</h2>
          <div className="inline-block bg-green-700 text-white px-4 py-1 rounded-full font-semibold">
            Registration Confirmed! 🎉
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-5 mb-5 border border-blue-600">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">🗓️ Event Details</h3>
          <div className="space-y-2 text-blue-100">
            <div><strong>Date & Time:</strong> {event.date}</div>
            <div><strong>Location:</strong> {event.location}</div>
            <div><strong>Organizer:</strong> {event.organizer}</div>
            <div><strong>Volunteers:</strong> {event.volunteers + 1}/{event.capacity}</div>
            <div><strong>Weather:</strong> {event.weather}</div>
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-xl p-5 mb-5 border border-green-600">
          <h3 className="text-green-400 text-lg font-semibold mb-3">✅ What to Bring</h3>
          <ul className="list-disc list-inside text-green-300 space-y-1">
            <li>Comfortable clothes and closed shoes</li>
            <li>Water bottle</li>
            <li>Sunscreen and hat</li>
            <li>Hand sanitizer</li>
            <li>{event.equipment}</li>
          </ul>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-5 mb-5 border border-blue-500">
          <h3 className="text-blue-400 text-lg font-semibold mb-3">🚌 Transportation</h3>
          <p className="text-blue-200">{event.transport}</p>
          <button
            onClick={() => onOpenDirections(eventId.includes('versova') ? 'versova-beach' : 'juhu-beach')}
            className="mt-3 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold py-2 px-4 rounded-full hover:opacity-90"
          >
            Get Directions
          </button>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-5 mb-5 border border-yellow-500">
          <h3 className="text-yellow-400 text-lg font-semibold mb-3">🏆 Rewards for This Event</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">+50 Impact Points</span>
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">Early Bird Badge</span>
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">Team Player</span>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-gradient-to-br from-green-600 to-green-800 text-white py-3 px-6 rounded-full font-bold shadow-md hover:opacity-90"
          >
            Got it! See you at the beach! 🌺
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
