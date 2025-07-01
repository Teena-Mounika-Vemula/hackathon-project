import React, { useState } from 'react';

const Equipment = () => {
  const [tools, setTools] = useState({
    trash: 250,
    gloves: 120,
    pickers: 45,
    buckets: 30,
    firstaid: 8,
    water: 80
  });

  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '2025-06-24',
    volunteers: '',
    duration: '4 hours'
  });

  const [tempInputs, setTempInputs] = useState({
    trash: 250,
    gloves: 120,
    pickers: 45,
    buckets: 30,
    firstaid: 8,
    water: 80
  });

  const toolsConfig = [
    { key: 'trash', name: 'Trash Bags', icon: '🗑️' },
    { key: 'gloves', name: 'Gloves', icon: '🧤' },
    { key: 'pickers', name: 'Grabbers/Pickers', icon: '🥢' },
    { key: 'buckets', name: 'Buckets', icon: '🪣' },
    { key: 'firstaid', name: 'First Aid Kits', icon: '🏥' },
    { key: 'water', name: 'Water Bottles', icon: '💧' }
  ];

  const updateCount = (toolKey) => {
    const newValue = tempInputs[toolKey];
    if (newValue !== '' && newValue >= 0) {
      setTools(prev => ({ ...prev, [toolKey]: parseInt(newValue) }));
    }
  };

  const handleInputChange = (toolKey, value) => {
    setTempInputs(prev => ({ ...prev, [toolKey]: value }));
  };

  const handleKeyPress = (e, toolKey) => {
    if (e.key === 'Enter') {
      updateCount(toolKey);
    }
  };

  const handleEventDataChange = (field, value) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const calculateRequirements = () => {
    const volunteers = parseInt(eventData.volunteers);
    
    if (!volunteers || volunteers <= 0) {
      alert('Please enter a valid number of volunteers first!');
      return;
    }

    const trashBagsNeeded = Math.ceil(volunteers * 2);
    const glovesNeeded = volunteers;
    const pickersNeeded = Math.ceil(volunteers * 0.3);
    const bucketsNeeded = Math.ceil(volunteers * 0.2);
    const firstAidNeeded = Math.ceil(volunteers / 25);
    const waterNeeded = volunteers;

    const requirements = `Estimated Requirements for ${volunteers} volunteers:

• Trash Bags: ${trashBagsNeeded}
• Gloves: ${glovesNeeded}
• Grabbers/Pickers: ${pickersNeeded}
• Buckets: ${bucketsNeeded}
• First Aid Kits: ${firstAidNeeded}
• Water Bottles: ${waterNeeded}`;

    alert(requirements);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Tools Inventory */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30">
          <h2 className="text-3xl font-bold text-black mb-8 flex items-center gap-3">
            🧰 Tools Inventory
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsConfig.map(({ key, name, icon }) => (
              <div 
                key={key}
                className="bg-white rounded-xl p-4 shadow-lg border-2 border-cyan-100 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl">
                    {icon}
                  </div>
                  <div className="text-lg font-semibold text-black">{name}</div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-black font-medium">Available:</span>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-base">
                    {tools[key]}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="number"
                    value={tempInputs[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, key)}
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                    placeholder="Enter quantity"
                    min="0"
                  />
                  <button
                    onClick={() => updateCount(key)}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-sm whitespace-nowrap"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Planning */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30">
          <h2 className="text-3xl font-bold text-black mb-8 flex items-center gap-3">
            📅 Event Planning
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-black font-semibold mb-2">Event Name</label>
              <input
                type="text"
                value={eventData.eventName}
                onChange={(e) => handleEventDataChange('eventName', e.target.value)}
                className="w-full px-4 py-4 border-2 border-cyan-100 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all"
                placeholder="Enter event name"
              />
            </div>
            
            <div>
              <label className="block text-black font-semibold mb-2">Event Date</label>
              <input
                type="date"
                value={eventData.eventDate}
                onChange={(e) => handleEventDataChange('eventDate', e.target.value)}
                className="w-full px-4 py-4 border-2 border-cyan-100 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-black font-semibold mb-2">Number of Volunteers</label>
              <input
                type="number"
                value={eventData.volunteers}
                onChange={(e) => handleEventDataChange('volunteers', e.target.value)}
                className="w-full px-4 py-4 border-2 border-cyan-100 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all"
                placeholder="Enter number of volunteers"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-black font-semibold mb-2">Event Duration</label>
              <select
                value={eventData.duration}
                onChange={(e) => handleEventDataChange('duration', e.target.value)}
                className="w-full px-4 py-4 border-2 border-cyan-100 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all"
              >
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="4 hours">4 hours</option>
                <option value="5 hours">5 hours</option>
                <option value="6 hours">6 hours</option>
                <option value="8 hours">8 hours</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={calculateRequirements}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            📊 Calculate Tool Requirements
          </button>
        </div>
      </div>
    </div>
  );
};

export default Equipment;