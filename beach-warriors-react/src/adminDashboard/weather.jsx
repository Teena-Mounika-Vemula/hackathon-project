import React, { useState, useEffect } from 'react';

// SVG Icon Components for better reusability and cleaner code
const BellIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-slate-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5-5-5h5v-5a3 3 0 10-6 0v5" />
    </svg>
);

const RefreshIcon = ({ className }) => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

const CheckIcon = () => <span>✓</span>;


// Weather Data Card Component
const WeatherCard = ({ icon, label, value, color }) => (
    <div className={`rounded-2xl p-6 text-white shadow-lg hover:transform hover:-translate-y-1 transition-transform duration-300 ${color}`}>
        <div className="text-3xl mb-3 opacity-90">{icon}</div>
        <div className="text-4xl font-bold mb-1">{value}</div>
        <div className="text-sm font-medium opacity-90">{label}</div>
    </div>
);

// Forecast Item Component
const ForecastItem = ({ time, temp, condition }) => (
    <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="text-sm font-semibold text-slate-600 mb-2">{time}</div>
        <div className="text-2xl font-bold text-slate-800 mb-1">{temp}</div>
        <div className="text-xs text-cyan-600 font-semibold">{condition}</div>
    </div>
);

// Main Content Component
const MainContent = () => {
    const [weatherData, setWeatherData] = useState({
        temperature: 22,
        humidity: 65,
        wind: 12,
        visibility: 8,
    });
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    // Effect for real-time temperature fluctuation simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setWeatherData(prevData => ({
                ...prevData,
                temperature: prevData.temperature + (Math.random() > 0.5 ? 1 : -1)
            }));
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const refreshWeatherData = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            // Simulate fetching new data
            setWeatherData({
                temperature: Math.floor(Math.random() * 15) + 15, // 15 to 29
                humidity: Math.floor(Math.random() * 41) + 50, // 50 to 90
                wind: Math.floor(Math.random() * 16) + 5, // 5 to 20
                visibility: Math.floor(Math.random() * 6) + 5, // 5 to 10
            });
            setLastUpdated(new Date());
            setIsRefreshing(false);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }, 1500);
    };

    return (
        <div className="flex-1 bg-slate-100">

            {/* Main content area */}
            <main className="bg-white m-4 md:m-5 mt-0 p-6 md:p-8 rounded-2xl shadow-lg min-h-[calc(100vh-120px)]">
                {/* Weather Header */}
                <div className="pb-5 border-b border-slate-200">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Weather Intelligence Center</h2>
                    <p className="text-slate-500 mb-4">Smart recommendations for volunteer event safety</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                        <span>Last updated: {lastUpdated.toLocaleString('en-GB')}</span>
                        <span className="hidden md:inline">•</span>
                        <span>Real-time monitoring active</span>
                        <button onClick={refreshWeatherData} disabled={isRefreshing} className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition-all duration-200 disabled:bg-cyan-400 disabled:cursor-not-allowed">
                            <RefreshIcon className={isRefreshing ? 'animate-spin' : ''} />
                            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                        </button>
                    </div>
                </div>

                {/* Weather Grid */}
                <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <WeatherCard icon="🌡️" label="Temperature" value={`${weatherData.temperature}°C`} color="bg-gradient-to-br from-blue-500 to-blue-700" />
                    <WeatherCard icon="💧" label="Humidity" value={`${weatherData.humidity}%`} color="bg-gradient-to-br from-emerald-500 to-emerald-700" />
                    <WeatherCard icon="💨" label="Wind Speed" value={`${weatherData.wind} km/h`} color="bg-gradient-to-br from-violet-500 to-violet-700" />
                    <WeatherCard icon="👁️" label="Visibility" value={`${weatherData.visibility} km`} color="bg-gradient-to-br from-amber-500 to-amber-700" />
                </div>

                {/* Event Section */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-5">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Beach Cleanup Drive</h3>
                            <div className="flex flex-col gap-2 text-slate-600 text-sm">
                                <div className="flex items-center gap-2"><span>📅</span><span>Today • 14:00 - 17:00</span></div>
                                <div className="flex items-center gap-2"><span>📍</span><span>Sunset Beach</span></div>
                                <div className="flex items-center gap-2"><span>👥</span><span>40 volunteers</span></div>
                            </div>
                        </div>
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                            <CheckIcon /> Safety Score: 100/100
                        </div>
                    </div>

                    <div className="bg-green-100 border border-green-200 text-green-800 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold"><CheckIcon /></div>
                        <strong>Proceed</strong> - Event can proceed as planned
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Event Period Forecast</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <ForecastItem time="09:00" temp="18°C" condition="10% rain" />
                            <ForecastItem time="12:00" temp="22°C" condition="5% rain" />
                            <ForecastItem time="15:00" temp="24°C" condition="2% rain" />
                            <ForecastItem time="17:00" temp="21°C" condition="8% rain" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button className="px-5 py-2.5 rounded-lg font-semibold bg-cyan-600 text-white hover:bg-cyan-700 transition-all">Send Alert to Volunteers</button>
                        <button className="px-5 py-2.5 rounded-lg font-semibold bg-slate-600 text-white hover:bg-slate-700 transition-all">Update Event Details</button>
                        <button className="px-5 py-2.5 rounded-lg font-semibold bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 transition-all">View Detailed Report</button>
                    </div>
                </div>
            </main>

            {/* Refresh Notification */}
            <div className={`fixed top-5 right-5 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-xl transition-transform duration-300 ease-in-out ${showNotification ? 'translate-x-0' : 'translate-x-[400px]'}`}>
                Weather data updated successfully
            </div>
        </div>
    );
};

// Main App Component
export default function App() {
    return (
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 min-h-screen font-sans">
            <div className="flex flex-col lg:flex-row min-h-screen">
                <MainContent />
            </div>
        </div>
    );
}
