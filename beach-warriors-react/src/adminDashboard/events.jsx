import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- Initial Data ---
const initialEventsData = [
  { id: 1, title: 'Marina Beach Cleanup Drive', location: 'Marina Beach, Chennai', date: '2025-07-01', time: '06:00', volunteers: { current: 45, max: 60 }, target: '500kg waste collection', status: 'live' },
  { id: 2, title: 'Coastal Restoration Workshop', location: 'Kovalam Beach, Kerala', date: '2025-07-01', time: '07:00', volunteers: { current: 28, max: 35 }, target: 'Mangrove planting & cleanup', status: 'live' },
  { id: 3, title: 'World Ocean Day Celebration', location: 'Juhu Beach, Mumbai', date: '2025-07-08', time: '05:30', volunteers: { current: 125, max: 150 }, target: 'Awareness campaign + cleanup', status: 'upcoming' },
  { id: 4, title: 'Plastic-Free Beach Initiative', location: 'Calangute Beach, Goa', date: '2025-07-15', time: '06:00', volunteers: { current: 67, max: 80 }, target: 'Focus on plastic waste removal', status: 'upcoming' },
  { id: 5, title: 'Earth Day Beach Cleanup', location: 'Baga Beach, Goa', date: '2025-06-22', time: '07:00', volunteers: { current: 98, max: 100 }, target: 'Collected 750kg waste', status: 'completed' },
  { id: 6, title: 'Community Awareness Drive', location: 'Puri Beach, Odisha', date: '2025-06-18', time: '08:00', volunteers: { current: 156, max: 160 }, target: 'Educated 500+ people', status: 'completed' },
];

// --- UI Components ---
const StatCard = ({ number, label, color }) => (
  <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className={`text-4xl font-bold mb-2 ${color}`}>{number}</div>
    <div className="text-sm text-slate-500 font-semibold">{label}</div>
  </div>
);

const EventStatusBadge = ({ status }) => {
  const styles = {
    live: 'bg-red-100 text-red-700 animate-pulse',
    upcoming: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
  };
  return <div className={`absolute top-6 right-6 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${styles[status]}`}>{status}</div>;
};

const EventCard = ({ event, onDelete, onEdit }) => {
  const details = [
    { icon: '📍', text: event.location },
    { icon: '📅', text: `${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, ${event.time}` },
    { icon: '👥', text: `${event.volunteers.current}/${event.volunteers.max} volunteers registered` },
    { icon: '🎯', text: event.target },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
      <EventStatusBadge status={event.status} />
      <h3 className="text-lg font-bold text-slate-800 mb-3 pr-24">{event.title}</h3>
      <div className="space-y-2 text-sm text-slate-600">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start">
            <span className="mr-3">{detail.icon}</span>
            <span>{detail.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex gap-3 flex-wrap">
        <button className="bg-sky-500 text-white font-semibold px-4 py-2 text-xs rounded-lg hover:bg-sky-600 transition-all">
          {event.status === 'live' ? 'View Live' : event.status === 'upcoming' ? 'View Details' : 'View Report'}
        </button>
        <button onClick={() => onEdit(event)} className="bg-yellow-100 text-yellow-700 font-semibold px-4 py-2 text-xs rounded-lg hover:bg-yellow-200 transition-all">
          Edit
        </button>
        <button onClick={() => onDelete(event.id)} className="bg-red-100 text-red-600 font-semibold px-4 py-2 text-xs rounded-lg hover:bg-red-200 transition-all">
          Delete
        </button>
      </div>
    </div>
  );
};

const EventModal = ({ isOpen, onClose, onSaveEvent, editEvent }) => {
  const [formData, setFormData] = useState({ name: '', description: '', location: '', date: '', time: '', minVolunteers: '', maxVolunteers: '' });
  const [aiSuggestion, setAiSuggestion] = useState(null);

  useEffect(() => {
    if (editEvent) {
      setFormData({
        name: editEvent.title,
        description: editEvent.target,
        location: editEvent.location,
        date: editEvent.date,
        time: editEvent.time,
        minVolunteers: '',
        maxVolunteers: editEvent.volunteers.max,
      });
    } else {
      setFormData({ name: '', description: '', location: '', date: '', time: '', minVolunteers: '', maxVolunteers: '' });
    }
  }, [editEvent]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const getAISuggestions = useCallback((location) => {
    const beachSizes = {
      'marina': { min: 40, max: 80 }, 'juhu': { min: 50, max: 100 }, 'calangute': { min: 30, max: 60 }, 'kovalam': { min: 20, max: 40 }, 'default': { min: 25, max: 50 }
    };
    const locationKey = location.toLowerCase();
    for (let beach in beachSizes) {
      if (locationKey.includes(beach)) return beachSizes[beach];
    }
    return beachSizes.default;
  }, []);

  useEffect(() => {
    if (formData.location && formData.date && formData.name) {
      const timer = setTimeout(() => {
        const suggestion = getAISuggestions(formData.location);
        setAiSuggestion(suggestion);
        setFormData(prev => ({ ...prev, minVolunteers: suggestion.min, maxVolunteers: suggestion.max }));
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAiSuggestion(null);
    }
  }, [formData.name, formData.location, formData.date, getAISuggestions]);

  const handleSubmit = () => {
    const updatedEvent = {
      id: editEvent?.id || Date.now(),
      title: formData.name,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      volunteers: { current: editEvent?.volunteers?.current || 0, max: Number(formData.maxVolunteers) },
      target: formData.description.substring(0, 50) + '...',
      status: editEvent?.status || 'upcoming',
    };
    onSaveEvent(updatedEvent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">{editEvent ? 'Edit Event' : 'Create New Event'}</h2>
          <button onClick={onClose} className="text-3xl text-slate-400 hover:text-slate-700">&times;</button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          <input id="name" value={formData.name} onChange={handleInputChange} placeholder="Event Name" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-sky-500 outline-none" />
          <textarea id="description" value={formData.description} onChange={handleInputChange} placeholder="Event Description" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-sky-500 outline-none min-h-[100px]"></textarea>
          <input id="location" value={formData.location} onChange={handleInputChange} placeholder="Location (e.g., Juhu Beach, Mumbai)" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-sky-500 outline-none" />
          <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">📍 Interactive map placeholder</div>
          <div className="grid grid-cols-2 gap-4">
            <input id="date" type="date" value={formData.date} onChange={handleInputChange} className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-sky-500 outline-none" />
            <input id="time" type="time" value={formData.time} onChange={handleInputChange} className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-sky-500 outline-none" />
          </div>
          {aiSuggestion && (
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 transition-all">
              <h4 className="font-bold text-sky-800 mb-2">🤖 AI Volunteer Recommendations</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg text-center"><div className="text-xs text-slate-500">Min Volunteers</div><div className="text-2xl font-bold">{aiSuggestion.min}</div></div>
                <div className="bg-white p-3 rounded-lg text-center"><div className="text-xs text-slate-500">Max Volunteers</div><div className="text-2xl font-bold">{aiSuggestion.max}</div></div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <input id="minVolunteers" type="number" value={formData.minVolunteers} onChange={handleInputChange} placeholder="Min Volunteers" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-sky-500 outline-none" />
            <input id="maxVolunteers" type="number" value={formData.maxVolunteers} onChange={handleInputChange} placeholder="Max Volunteers" className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-sky-500 outline-none" />
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-4">
          <button onClick={onClose} className="bg-slate-100 text-slate-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-200">Cancel</button>
          <button onClick={handleSubmit} className="bg-sky-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-sky-600">{editEvent ? 'Save Changes' : 'Create Event'}</button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const EventsPage = () => {
  const [events, setEvents] = useState(initialEventsData);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  const stats = useMemo(() => ({
    completed: events.filter(e => e.status === 'completed').length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    live: events.filter(e => e.status === 'live').length,
    participants: events.reduce((sum, e) => sum + e.volunteers.current, 0),
  }), [events]);

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return events;
    return events.filter(event => event.status === filter);
  }, [events, filter]);

  const handleDelete = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (updatedEvent) => {
    setEvents(prev => {
      const exists = prev.some(e => e.id === updatedEvent.id);
      if (exists) {
        return prev.map(e => (e.id === updatedEvent.id ? updatedEvent : e));
      }
      return [updatedEvent, ...prev];
    });
    setEditEvent(null);
  };

  const FilterButton = ({ status, children }) => (
    <button onClick={() => setFilter(status)} className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${filter === status ? 'bg-white text-slate-800 shadow-md' : 'bg-white/50 text-slate-600 hover:bg-white/80'}`}>
      {children}
    </button>
  );

  return (
    <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-y-auto">
      <EventModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditEvent(null); }} onSaveEvent={handleSaveEvent} editEvent={editEvent} />
      <header className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-lg">
        <p className="text-slate-500 mt-1">Organize and track environmental cleanup events</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard number={stats.completed} label="Completed Events" color="text-green-500" />
        <StatCard number={stats.upcoming} label="Upcoming Events" color="text-blue-500" />
        <StatCard number={stats.live} label="Live Events" color="text-red-500" />
        <StatCard number={stats.participants} label="Total Participants" color="text-indigo-500" />
      </div>

      <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <button onClick={() => { setEditEvent(null); setIsModalOpen(true); }} className="bg-sky-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:bg-sky-600 transition-all transform hover:-translate-y-0.5">
          Add New Event
        </button>
        <div className="flex gap-2 p-1 bg-slate-200/50 rounded-xl">
          <FilterButton status="all">All Events</FilterButton>
          <FilterButton status="live">Live</FilterButton>
          <FilterButton status="upcoming">Upcoming</FilterButton>
          <FilterButton status="completed">Completed</FilterButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  return (
    <div className="bg-gradient-to-br from-sky-400 to-indigo-500 min-h-screen font-sans text-slate-800">
      <div className="flex flex-col lg:flex-row w-full">
        <EventsPage />
      </div>
    </div>
  );
}
