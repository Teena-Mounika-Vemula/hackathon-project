// src/components/DirectionsModal.jsx
import React from 'react';

const DirectionsModal = ({ locationKey, onClose }) => {
  const locationDetails = {
    'juhu-beach': {
      name: 'Juhu Beach - ISKCON Temple Area',
      address: 'Juhu Beach, Zone A, Near ISKCON Temple, Juhu, Mumbai - 400049',
      coordinates: '19.1075° N, 72.8263° E',
      landmark: 'ISKCON Temple (Hare Krishna Land)',
      parking: 'Available at ISKCON Temple premises (₹20/hour)',
      transport: [
        { mode: '🚌 Bus', route: 'Take 28, 56, 80L to Juhu Beach', time: '45 mins from Andheri' },
        { mode: '🚊 Metro + Auto', route: 'Versova Metro → Auto (₹50-70)', time: '35 mins total' },
        { mode: '🚗 Car/Taxi', route: 'Via Western Express Highway → Juhu Tara Road', time: '25-40 mins depending on traffic' },
        { mode: '🚲 Cycle', route: 'Cycling path along Carter Road → Juhu', time: '1 hour (scenic route!)' }
      ],
      meetingPoint: 'Look for the GREEN Beach Warriors banner near the temple entrance',
      tips: [
        'Arrive by 6:45 AM for briefing',
        'Free breakfast provided after cleanup',
        'Parking fills up quickly - arrive early or use public transport',
        'Beach access is easiest near the temple stairs'
      ]
    },
    'versova-beach': {
      name: 'Versova Beach - Fishing Village',
      address: 'Versova Beach, Near Fishing Village, Versova, Mumbai - 400061',
      coordinates: '19.1317° N, 72.8092° E',
      landmark: 'Versova Fishing Village (Koliwada)',
      parking: 'Limited street parking (₹10/hour)',
      transport: [
        { mode: '🚊 Metro', route: 'Blue Line to Versova Station → 5 min walk', time: '5 mins walk from metro' },
        { mode: '🚌 Bus', route: 'Take 210, 224, 255 to Versova', time: '30 mins from Bandra' },
        { mode: '🚗 Car/Taxi', route: 'Via Link Road → Seven Bungalows → Versova', time: '20-35 mins' },
        { mode: '🛵 Bike', route: 'Two-wheeler parking available near jetty', time: 'Fastest option during rush hour' }
      ],
      meetingPoint: 'Near the fishing boats - look for BLUE Beach Warriors flag',
      tips: [
        'Strong fish smell near village - bring a mask if sensitive',
        'Tide is low in morning - perfect for cleanup',
        'Amazing sunrise view - bring camera!',
        'Local fishermen very supportive of cleanup efforts'
      ]
    }
  };

  const loc = locationDetails[locationKey] || locationDetails['juhu-beach'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl">×</button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-green-400 drop-shadow mb-1">🗺️ Navigation Guide</h2>
          <h3 className="text-blue-200 text-lg">{loc.name}</h3>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-4 mb-6 border border-blue-600 text-center shadow">
          <div className="text-4xl mb-2">📍</div>
          <h3 className="text-green-400 font-bold">Exact Location</h3>
          <p className="text-blue-300 font-semibold mb-1">{loc.address}</p>
          <p className="text-blue-400 font-mono">{loc.coordinates}</p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-4 mb-6">
          <h3 className="text-lg font-bold text-green-400 mb-3">🚗 Transport Options</h3>
          {loc.transport.map((t, i) => (
            <div key={i} className="bg-[#0f172a] rounded-md p-3 mb-2 border-l-4 border-blue-600 shadow">
              <div className="flex justify-between items-start flex-wrap">
                <div className="min-w-[200px]">
                  <h4 className="text-blue-300 font-semibold mb-1">{t.mode}</h4>
                  <p className="text-sm text-gray-300">{t.route}</p>
                </div>
                <div className="bg-green-800 text-green-200 text-xs font-semibold rounded-full px-3 py-1 mt-2 sm:mt-0">
                  {t.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1e293b] rounded-xl p-4 mb-6 border border-yellow-500">
          <h3 className="text-lg font-bold text-yellow-400 mb-3">🎯 Meeting Point</h3>
          <div className="bg-[#0f172a] border border-yellow-400 rounded-xl text-center p-4">
            <div className="text-3xl mb-2">🚩</div>
            <p className="text-yellow-300 font-semibold">{loc.meetingPoint}</p>
            <p className="text-sm text-gray-400">Landmark: {loc.landmark}</p>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-4 mb-6 border border-green-600">
          <h3 className="text-lg font-bold text-green-400 mb-3">🅿️ Parking</h3>
          <p className="text-green-300">{loc.parking}</p>
        </div>

        <div className="bg-gradient-to-br from-green-700 to-blue-900 text-white rounded-xl p-4 mb-6">
          <h3 className="text-lg font-bold mb-3">💡 Pro Tips</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-white/90">
            {loc.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <button className="bg-gradient-to-br from-green-500 to-green-700 text-white font-bold py-3 px-6 rounded-full shadow hover:opacity-90 transition-all">🧭 Start Navigation</button>
          <button className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white font-bold py-3 px-6 rounded-full shadow hover:opacity-90 transition-all">💾 Save Offline</button>
        </div>
      </div>
    </div>
  );
};

export default DirectionsModal;
