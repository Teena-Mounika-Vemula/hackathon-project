import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import NewSidebar from './newSidebar'; // Imported from the separate file

// --- Page View Components Defined In-File ---

// 1. Dashboard View Component
const DashboardView = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [showNotification, setShowNotification] = useState(true);
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);

    const closeNotification = () => setShowNotification(false);

    useEffect(() => {
        // Chart.js initialization
        if (chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy();
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Start Here', 'First Mission', 'Second Mission', 'Third Mission', 'Fourth Mission', 'Fifth Mission'],
                    datasets: [{
                        label: 'Your Journey Begins',
                        data: [0, 0, 0, 0, 0, 0],
                        borderColor: '#94a3b8',
                        backgroundColor: 'rgba(148, 163, 184, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#94a3b8',
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: true, labels: { color: '#ffffff' } } },
                    scales: {
                        y: { beginAtZero: true, max: 400, grid: { color: 'rgba(148, 163, 184, 0.2)' }, ticks: { color: '#94a3b8' } },
                        x: { grid: { color: 'rgba(148, 163, 184, 0.2)' }, ticks: { color: '#94a3b8' } }
                    }
                }
            });
        }
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, []);

    useEffect(() => {
        // Welcome popup timer
        const timer = setTimeout(() => {
            setShowWelcomePopup(true);
            const hideTimer = setTimeout(() => setShowWelcomePopup(false), 5000);
            return () => clearTimeout(hideTimer);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Welcome Popup */}
            <div className={`welcome-popup fixed top-5 right-5 p-5 rounded-2xl transition-transform duration-500 z-[1001] ${showWelcomePopup ? 'translate-x-0' : 'translate-x-[400px]'}`}>
                <div className="text-white font-extrabold mb-1.5 text-lg">🌟 Welcome, Eco Warrior!</div>
                <div className="text-white text-sm opacity-90">Your environmental journey begins now!</div>
            </div>

            {/* Notification Banner */}
            {showNotification && (
                <div className="notification-banner bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white p-4 rounded-2xl mb-6 flex items-center justify-between shadow-lg relative overflow-hidden">
                    <div className="notification-text flex items-center font-semibold z-10">
                        <span className="notification-icon mr-3 text-2xl animate-bounce">🎯</span>
                        WELCOME TO BEACH WARRIORS! Complete your first mission to earn points!
                    </div>
                    <button className="close-btn bg-white bg-opacity-20 text-white text-3xl rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-opacity-30" onClick={closeNotification}>×</button>
                </div>
            )}

            {/* Dashboard Header */}
            <div className="dashboard-header mb-8">
                <h1 className="dashboard-title text-[3rem] font-extrabold mb-2.5">Welcome to Your Journey!</h1>
                <p className="dashboard-subtitle text-lg text-[#94a3b8] font-medium">Every great warrior starts somewhere. Your first mission awaits!</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-9">
                 {/* Cards for Welcome, Missions, Waste, Points */}
                <div className="stat-card welcome"><div className="stat-icon welcome">🏅</div><div className="stat-value welcome">1</div><div className="stat-label">Welcome Badge</div></div>
                <div className="stat-card new-user"><div className="stat-icon inactive">🎯</div><div className="stat-value zero">0</div><div className="stat-label">Missions</div></div>
                <div className="stat-card new-user"><div className="stat-icon inactive">♻️</div><div className="stat-value zero">0</div><div className="stat-label">Waste (kg)</div></div>
                <div className="stat-card new-user"><div className="stat-icon inactive">💎</div><div className="stat-value zero">0</div><div className="stat-label">Points</div></div>
            </div>

            {/* Chart Section */}
            <div className="chart-section rounded-3xl p-9 mb-9 relative overflow-hidden">
                <h2 className="chart-title text-2xl font-extrabold text-white mb-6">📊 Your Journey Starts Here</h2>
                <div className="chart-container relative h-[350px]"><canvas ref={chartRef}></canvas></div>
            </div>
        </>
    );
};

// 2. Missions View Component
const MissionsView = () => {
    const upcomingMissions = [
        { title: "Sunrise Beach Cleanup", location: "Marina Beach", date: "July 15, 2025", points: 150, slots: "15/30" },
        { title: "Coastal Restoration Project", location: "Elliot's Beach", date: "July 22, 2025", points: 200, slots: "10/25" },
        { title: "Mangrove Planting Drive", location: "Pichavaram", date: "August 5, 2025", points: 300, slots: "5/20" },
    ];
    const completedMissions = [ { title: "Inaugural Cleanup", location: "Besant Nagar Beach", date: "June 28, 2025", points: 100, waste: 50 }];

    return (
        <div>
            <div className="dashboard-header mb-8">
                <h1 className="dashboard-title text-[3rem] font-extrabold mb-2.5">Missions Hub</h1>
                <p className="dashboard-subtitle text-lg text-[#94a3b8] font-medium">Join a cleanup event and make a difference!</p>
            </div>
            <div className="upcoming-missions mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Upcoming Missions</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {upcomingMissions.map((mission, index) => (
                        <div key={index} className="mission-card rounded-2xl p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{mission.title}</h3>
                                <p className="text-sm text-slate-400 mb-1">📍 {mission.location}</p>
                                <p className="text-sm text-slate-400 mb-4">🗓️ {mission.date}</p>
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="text-lg font-semibold text-green-400">💎 {mission.points} Points</span>
                                    <span className="text-sm text-slate-300">👥 {mission.slots} slots filled</span>
                                </div>
                            </div>
                            <button className="join-btn text-white font-bold py-2 px-4 rounded-lg w-full">Join Mission</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="completed-missions">
                <h2 className="text-2xl font-bold text-white mb-6">Completed Missions</h2>
                 <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {completedMissions.map((mission, index) => (
                        <div key={index} className="completed-card mission-card rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-slate-300 mb-2">{mission.title}</h3>
                            <div className="flex items-center justify-between text-lg">
                                <span className="font-semibold text-amber-400">💎 {mission.points} Points</span>
                                <span className="font-semibold text-cyan-400">♻️ {mission.waste}kg Collected</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 3. Leaderboard View Component
const LeaderboardView = () => {
    const leaders = [
        { rank: 1, name: "Eco Champion", score: 5250, avatar: "🏆" },
        { rank: 2, name: "Green Guardian", score: 4800, avatar: "🥈" },
        { rank: 3, name: "Aqua Protector", score: 4550, avatar: "🥉" },
        { rank: 4, name: "Terra Trooper", score: 4200, avatar: "👤" },
        { rank: 15, name: "You (New Recruit)", score: 0, avatar: "🌟", isCurrentUser: true },
    ];
    return (
        <div>
            <div className="dashboard-header mb-8">
                <h1 className="dashboard-title text-[3rem] font-extrabold mb-2.5">Leaderboard</h1>
                <p className="dashboard-subtitle text-lg text-[#94a3b8] font-medium">See who's making the biggest impact!</p>
            </div>
            <div className="leaderboard-table rounded-2xl p-6">
                {leaders.map(leader => (
                     <div key={leader.rank} className={`table-row flex items-center p-4 rounded-lg transition-all duration-300 ${leader.isCurrentUser ? 'current-user' : ''}`}>
                        <div className="rank w-16 text-center">{leader.rank}</div>
                        <div className="flex items-center flex-grow">
                            <div className="text-2xl mr-4">{leader.avatar}</div>
                            <span className="font-bold text-lg text-white">{leader.name}</span>
                        </div>
                        <div className="font-bold text-xl text-green-400">{leader.score} PTS</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 4. Profile View Component
const ProfileView = () => {
    const user = { name: "New Recruit", level: 1, points: 0, joinDate: "July 3, 2025", avatar: "🌟" };
    const achievements = [
        { name: "Welcome Badge", earned: true, icon: "🏅" },
        { name: "First Mission", earned: false, icon: "🎯" },
        { name: "Waste Collector", earned: false, icon: "♻️" },
    ];
    return (
        <div>
            <div className="dashboard-header mb-8">
                <h1 className="dashboard-title text-[3rem] font-extrabold mb-2.5">Your Profile</h1>
                <p className="dashboard-subtitle text-lg text-[#94a3b8] font-medium">Your personal warrior stats and achievements.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="profile-card p-8 rounded-2xl text-center">
                        <div className="text-7xl mb-4">{user.avatar}</div>
                        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                        <p className="text-blue-400 font-semibold">Level {user.level}</p>
                        <div className="my-6"><p className="text-slate-400">Combat Score</p><p className="text-3xl font-bold text-green-400">{user.points}</p></div>
                         <p className="text-sm text-slate-500">Joined: {user.joinDate}</p>
                    </div>
                </div>
                <div className="lg:col-span-2">
                     <div className="achievements-card p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {achievements.map((ach, i) => (
                                 <div key={i} className={`achievement ${ach.earned ? 'earned' : ''} text-center p-4 rounded-lg`}>
                                    <div className="achievement-icon w-20 h-20 text-4xl rounded-full mx-auto flex items-center justify-center mb-2">{ach.icon}</div>
                                    <p className="font-semibold text-white">{ach.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. Settings View Component
const SettingsView = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const Toggle = ({ checked, onChange }) => (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
            <div className="w-14 h-7 bg-slate-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
    );

    return (
        <div>
            <div className="dashboard-header mb-8">
                <h1 className="dashboard-title text-[3rem] font-extrabold mb-2.5">Settings</h1>
                <p className="dashboard-subtitle text-lg text-[#94a3b8] font-medium">Manage your account and preferences.</p>
            </div>
            <div className="space-y-8">
                <div className="settings-section rounded-2xl p-8">
                     <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between"><span className="text-lg text-slate-300">Email Notifications</span><Toggle checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} /></div>
                    </div>
                </div>
                 <div className="settings-section rounded-2xl p-8">
                     <h2 className="text-2xl font-bold text-white mb-6">Account</h2>
                    <div className="space-y-4">
                        <button className="w-full text-left p-4 bg-slate-700 hover:bg-slate-600 rounded-lg">Change Password</button>
                        <button className="w-full text-left p-4 bg-red-800 hover:bg-red-700 rounded-lg text-red-100 font-bold">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component (Controller) ---
const NewVolunteerDashboard = () => {
    // The activeComponent state determines which view is displayed.
    // It is initialized to 'dashboard'.
    const [activeComponent, setActiveComponent] = useState('dashboard');

    /**
     * This function handles navigation.
     * It sets the active component state, which triggers a re-render to show the correct view.
     * For this to work, the `component` argument passed from the NewSidebar component MUST match
     * one of the case values in the `renderComponent` function below 
     * (e.g., 'dashboard', 'missions', 'leaderboard', 'profile', 'settings').
     */
    const navigateTo = (component) => {
        if (component === 'logout') {
            // In a real app, you'd clear auth tokens. Here, we redirect to the homepage.
            console.log("Logging out...");
            window.location.href = '/'; // Redirect to root URL
            return;
        }
        setActiveComponent(component);
    };

    // This function returns the component to render based on the activeComponent state.
    const renderComponent = () => {
        switch (activeComponent) {
            case 'dashboard': return <DashboardView />;
            case 'missions': return <MissionsView />;
            case 'leaderboard': return <LeaderboardView />;
            case 'profile': return <ProfileView />;
            case 'settings': return <SettingsView />;
            default: return <DashboardView />; // Fallback to dashboard
        }
    };

    return (
        <>
            {/* Global and Component-Specific Styles */}
            <style>
                {`
                /* --- Global Styles --- */
                body {
                    font-family: 'Segoe UI', sans-serif;
                    background: #0a0a0a;
                    background-image:
                        radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 40%),
                        radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
                        radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 40%);
                    color: #ffffff;
                }
                .main-content { margin-left: 280px; padding: 20px; min-height: 100vh; }
                .dashboard-title {
                    background: linear-gradient(45deg, #3b82f6, #22c55e, #a855f7);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }

                /* --- Sidebar Styles (from newSidebar.jsx) --- */
                .sidebar { position: fixed; top: 0; left: 0; height: 100vh; width: 280px; background: linear-gradient(180deg, #1e293b, #0f172a); border-right: 2px solid #334155; padding: 2rem 1.5rem; display: flex; flex-direction: column; z-index: 1000; }
                .sidebar-header { display: flex; align-items: center; margin-bottom: 3rem; }
                .sidebar-logo { font-size: 2rem; margin-right: 1rem; }
                .sidebar-header h2 { font-size: 1.5rem; font-weight: 800; color: #e2e8f0; }
                .nav-item { display: flex; align-items: center; padding: 1rem; border-radius: 0.75rem; margin-bottom: 1rem; cursor: pointer; font-weight: 600; color: #94a3b8; position: relative; border-left: 4px solid transparent; transition: all 0.3s ease-in-out; }
                .nav-item:hover { background-color: rgba(71, 85, 105, 0.2); color: #e2e8f0; }
                
                /* --- NEW Active Sidebar Item Style --- */
                .nav-item.active {
                    background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(30, 64, 175, 0.1));
                    color: #ffffff;
                    font-weight: 700;
                    border-left: 4px solid #3b82f6;
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
                }
                .nav-item.active .nav-icon {
                    transform: scale(1.1);
                    color: #60a5fa;
                }

                .nav-icon { font-size: 1.5rem; margin-right: 1.5rem; transition: all 0.3s ease-in-out; }
                .logout-item { margin-top: auto; }

                /* --- DashboardView Styles --- */
                .notification-banner { border: 1px solid #60a5fa; }
                .stat-card { background: linear-gradient(135deg, #1e293b, #334155); border: 2px solid #374151; padding: 20px; border-radius: 20px; text-align: center; }
                .stat-card.new-user { opacity: 0.7; }
                .stat-card.welcome { background: linear-gradient(135deg, #22c55e, #16a34a); border-color: #34d399; opacity: 1; }
                .stat-icon { font-size: 1.8rem; margin: 0 auto 10px; width: 50px; height: 50px; border-radius: 12px; display:flex; align-items:center; justify-content:center; }
                .stat-icon.inactive { background: linear-gradient(135deg, #64748b, #475569); }
                .stat-icon.welcome { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
                .stat-value { font-size: 2.5rem; font-weight: bold; }
                .stat-value.zero { color: #94a3b8; }
                .stat-value.welcome { color: #fbbf24; }
                .stat-label { font-size: 0.9rem; color: #94a3b8; }
                .stat-card.welcome .stat-label { color: white; }
                .chart-section { background: linear-gradient(135deg, #1e293b, #334155); border: 2px solid #374151; }
                .welcome-popup { background: linear-gradient(135deg, #22c55e, #16a34a); border: 2px solid #34d399; }

                /* --- MissionsView Styles --- */
                .mission-card { background: linear-gradient(135deg, #1e293b, #334155); border: 2px solid #374151; transition: all 0.3s ease; }
                .mission-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-color: #4f46e5; }
                .join-btn { background: linear-gradient(90deg, #22c55e, #16a34a); transition: all 0.3s ease; }
                .join-btn:hover { transform: scale(1.05); }
                .completed-card { background: linear-gradient(135deg, #374151, #475569); opacity: 0.8; }
                
                /* --- LeaderboardView Styles --- */
                .leaderboard-table { background: linear-gradient(135deg, #1e293b, #334155); border: 2px solid #374151; }
                .table-row:not(:last-child) { border-bottom: 1px solid #374151; }
                .table-row.current-user { background: linear-gradient(90deg, #3b82f6, #1d4ed8); border: 2px solid #60a5fa; transform: scale(1.02); }
                .rank { font-size: 1.5rem; font-weight: bold; color: #fbbf24; }
                
                /* --- Profile & Settings Styles --- */
                .profile-card, .achievements-card, .settings-section { background: linear-gradient(135deg, #1e293b, #334155); border: 2px solid #374151; }
                .achievement { filter: grayscale(100%); opacity: 0.5; }
                .achievement.earned { filter: none; opacity: 1; }
                .achievement-icon { background-color: #334155; }
                .achievement.earned .achievement-icon { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
                
                /* --- Responsive Styles --- */
                @media (max-width: 768px) {
                    .sidebar { width: 80px; }
                    .sidebar-header h2, .nav-text { display: none; }
                    .main-content { margin-left: 80px; }
                    .dashboard-title { font-size: 2.2rem; }
                }
                `}
            </style>

            <NewSidebar activeNavItem={activeComponent} handleNavItemClick={navigateTo} />
            
            <div className="main-content">
                {renderComponent()}
            </div>
        </>
    );
};

export default NewVolunteerDashboard;
