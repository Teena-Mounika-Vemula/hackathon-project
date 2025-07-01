import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Using 'chart.js/auto' for automatic registeration of controllers, elements, scales, and plugins.
import Sidebar from './Sidebar';

const VolDashboard = ({ navigateTo }) => {  // ✅ accept navigateTo as a prop
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const [showNotification, setShowNotification] = useState(true);
    const [showAchievementPopup, setShowAchievementPopup] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('voldashboard');

    const closeNotification = () => {
        setShowNotification(false);
    };

    const handleNavItemClick = (itemName) => {
        setActiveNavItem(itemName);
        navigateTo(itemName); // ✅ trigger page change in App.jsx
    };

    // Effect for Chart.js initialization
    useEffect(() => {
        if (chartRef.current) {
            // Destroy existing chart instance if it exists before creating a new one
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mission 1', 'Mission 2', 'Mission 3', 'Mission 4', 'Mission 5', 'Mission 6'],
                    datasets: [{
                        label: 'Combat Score',
                        data: [120, 180, 150, 280, 220, 350],
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        borderWidth: 4,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#22c55e',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 3,
                        pointRadius: 8,
                        pointHoverRadius: 12,
                        pointStyle: 'circle'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: '#ffffff',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 400,
                            grid: {
                                color: 'rgba(34, 197, 94, 0.2)',
                                lineWidth: 2
                            },
                            ticks: {
                                color: '#94a3b8',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(59, 130, 246, 0.2)',
                                lineWidth: 1
                            },
                            ticks: {
                                color: '#94a3b8',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }
                    },
                    elements: {
                        point: {
                            backgroundColor: '#22c55e',
                            borderColor: '#ffffff',
                            borderWidth: 3,
                            hoverBackgroundColor: '#16a34a',
                            hoverBorderColor: '#22c55e',
                            hoverBorderWidth: 4
                        }
                    }
                }
            });
        }

        // Cleanup function for Chart.js
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []); // Empty dependency array ensures it runs once on mount and cleans up on unmount

    // Effect for achievement popup
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAchievementPopup(true);
            const hideTimer = setTimeout(() => {
                setShowAchievementPopup(false);
            }, 4000); // Popup visible for 4 seconds
            return () => clearTimeout(hideTimer);
        }, 2000); // Popup appears after 2 seconds

        return () => clearTimeout(timer);
    }, []); // Runs once on component mount

    // Effect for progress bar animation (simple direct DOM manipulation for this case)
    useEffect(() => {
        // This effect runs on mount
        const animateProgressBars = () => {
            document.querySelectorAll('.progress-fill').forEach(bar => {
                // Trigger animation by re-applying style or using a class
                // For this example, the CSS animation 'pulse-glow' is already defined on the fill itself.
                // We just need to ensure the width is applied and then the animation takes over.
                bar.style.transition = 'width 2s ease'; // Ensure transition property is set
            });
        };

        // Delay animation to ensure elements are rendered
        const timeoutId = setTimeout(animateProgressBars, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {/* Embedded styles for complex gradients and animations */}
            <style>
                {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: #0a0a0a;
                    background-image:
                        radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
                    min-height: 100vh;
                    color: #ffffff;
                }


                

                
                .notification-banner {
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.4);
                    border: 1px solid #34d399;
                }

                .notification-banner::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: shine 3s infinite;
                }

                .dashboard-title {
                    background: linear-gradient(45deg, #22c55e, #3b82f6, #a855f7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-shadow: 0 0 30px rgba(34, 197, 94, 0.3);
                    animation: text-glow 3s ease-in-out infinite alternate;
                }

                .stat-card {
                    background: linear-gradient(135deg, #1e293b, #334155);
                    border: 2px solid transparent;
                    background-clip: padding-box;
                }

                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, var(--glow-color), transparent, var(--glow-color));
                    opacity: 0;
                    transition: opacity 0.4s;
                    z-index: -1;
                }

                .stat-card:hover::before {
                    opacity: 0.3;
                }

                .stat-card.events {
                    --glow-color: #3b82f6;
                }

                .stat-card.waste {
                    --glow-color: #22c55e;
                }

                .stat-card.badges {
                    --glow-color: #f59e0b;
                }

                .stat-card.points {
                    --glow-color: #a855f7;
                }

                .stat-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    border-color: var(--glow-color);
                }

                .stat-icon {
                    animation: float 3s ease-in-out infinite;
                }

                .events .stat-icon {
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
                }

                .waste .stat-icon {
                    background: linear-gradient(135deg, #22c55e, #059669);
                    box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
                }

                .badges .stat-icon {
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
                }

                .points .stat-icon {
                    background: linear-gradient(135deg, #a855f7, #7c3aed);
                    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
                }

                .level-indicator {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid var(--glow-color);
                    color: var(--glow-color);
                }

                .stat-value {
                    color: var(--glow-color);
                    text-shadow: 0 0 20px currentColor;
                }

                .progress-bar {
                    background: rgba(255,255,255,0.1);
                }

                .progress-fill {
                    transition: width 2s ease;
                }

                .events .progress-fill {
                    background: linear-gradient(90deg, #3b82f6, #60a5fa);
                    width: 80%;
                }

                .waste .progress-fill {
                    background: linear-gradient(90deg, #22c55e, #34d399);
                    width: 92%;
                }

                .badges .progress-fill {
                    background: linear-gradient(90deg, #f59e0b, #fbbf24);
                    width: 67%;
                }

                .points .progress-fill {
                    background: linear-gradient(90deg, #a855f7, #c084fc);
                    width: 75%;
                }

                .chart-section {
                    background: linear-gradient(135deg, #1e293b, #334155);
                    border: 2px solid #374151;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                }

                .chart-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #22c55e, #3b82f6, #a855f7);
                }

                .milestone-section {
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    box-shadow: 0 20px 60px rgba(34, 197, 94, 0.4);
                    border: 2px solid #34d399;
                }

                .milestone-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent);
                    animation: rotate 6s linear infinite;
                    pointer-events: none;
                }

                .milestone-text {
                    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes pulse-glow {
                    0% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
                    100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }

                @keyframes shine {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }

                @keyframes text-glow {
                    0% { filter: brightness(1); }
                    100% { filter: brightness(1.2); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }

                @media (max-width: 768px) {
                    .sidebar {
                        width: 80px;
                    }

                    .sidebar-header h2,
                    .sidebar-header p,
                    .nav-text,
                    .player-level {
                        display: none;
                    }

                    .main-content {
                        margin-left: 80px;
                    }

                    .dashboard-title {
                        font-size: 2.2rem;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 640px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .main-content {
                        padding: 15px;
                    }
                }

                .hidden {
                    display: none;
                }

                .achievement-popup {
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4);
                    border: 2px solid #fbbf24;
                }
                .achievement-popup.show {
                    transform: translateX(0);
                }
                `}
            </style>

            {/* Achievement Popup */}
            <div
                id="achievementPopup"
                className={`achievement-popup fixed top-5 right-5 p-5 rounded-2xl transition-transform duration-500 z-[1001] ${
                    showAchievementPopup ? 'translate-x-0' : 'translate-x-[400px]'
                }`}
            >
                <div className="achievement-title text-white font-extrabold mb-1.5 text-lg">🏆 Achievement Unlocked!</div>
                <div className="achievement-desc text-white text-sm opacity-90">Eco Guardian Level Reached</div>
            </div>

             {/* Sidebar */}
            <Sidebar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />


            {/*Sidebar*/}
            {/* <div className="sidebar fixed left-0 top-0 w-[280px] h-screen py-5 z-[1000] flex flex-col">
                <div className="sidebar-header px-5 pb-[30px] text-center relative border-b-2">
                    <div className="logo-container relative inline-block">
                        <div className="logo-glow absolute top-[-10px] left-[-10px] right-[-10px] bottom-[-10px] rounded-full opacity-30"></div>
                        <h2 className="text-[1.8rem] mb-1.5 text-[#22c55e] font-extrabold relative z-20">✨ Beach Warriors</h2>
                    </div>
                    <p className="text-sm text-[#64748b] font-semibold uppercase tracking-wide">Command Center</p>
                </div>

                <div className="player-level mx-5 mt-5 p-4 rounded-xl">
                    <div className="level-info flex justify-between items-center mb-2.5">
                        <div className="level-badge text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase">Level 12</div>
                        <div className="xp-text text-sm text-[#94a3b8]">1,850 / 2,500 XP</div>
                    </div>
                    <div className="xp-bar h-2 bg-[#1e293b] rounded-md overflow-hidden border border-[#374151]">
                        <div className="xp-fill h-full w-[75%]"></div>
                    </div>
                </div>

                <nav className="nav-menu py-5 flex-1">
                    <div
                        className={`nav-item flex items-center px-5 py-4 cursor-pointer transition-all duration-300 ease-in-out border-l-4 border-l-transparent relative overflow-hidden ${
                            activeNavItem === 'impact-dashboard' ? 'active' : ''
                        }`}
                        onClick={() => handleNavItemClick('voldashboard')}
                    >
                        <div className="nav-icon w-6 h-6 mr-4 text-lg">🏠</div>
                        <span className="nav-text text-base font-semibold relative z-20">Impact Dashboard</span>
                    </div>

                    <div
                        className={`nav-item flex items-center px-5 py-4 cursor-pointer transition-all duration-300 ease-in-out border-l-4 border-l-transparent relative overflow-hidden ${
                            activeNavItem === 'avatar-badges' ? 'active' : ''
                        }`}
                        onClick={() => handleNavItemClick('avatar-badges')}
                    >
                        <div className="nav-icon w-6 h-6 mr-4 text-lg">👤</div>
                        <span className="nav-text text-base font-semibold relative z-20">Avatar & Badges</span>
                    </div>

                    <div
                        className={`nav-item flex items-center px-5 py-4 cursor-pointer transition-all duration-300 ease-in-out border-l-4 border-l-transparent relative overflow-hidden ${
                            activeNavItem === 'cleanup-events' ? 'active' : ''
                        }`}
                        onClick={() => handleNavItemClick('cleanup-events')}
                    >
                        <div className="nav-icon w-6 h-6 mr-4 text-lg">📅</div>
                        <span className="nav-text text-base font-semibold relative z-20">Cleanup Events</span>
                    </div>

                    <div
                        className={`nav-item flex items-center px-5 py-4 cursor-pointer transition-all duration-300 ease-in-out border-l-4 border-l-transparent relative overflow-hidden ${
                            activeNavItem === 'waste-classification' ? 'active' : ''
                        }`}
                        onClick={() => handleNavItemClick('waste-classification')}
                    >
                        <div className="nav-icon w-6 h-6 mr-4 text-lg">♻️</div>
                        <span className="nav-text text-base font-semibold relative z-20">Waste Classification</span>
                    </div>

                    <div
                        className={`nav-item flex items-center px-5 py-4 cursor-pointer transition-all duration-300 ease-in-out border-l-4 border-l-transparent relative overflow-hidden ${
                            activeNavItem === 'points-stats' ? 'active' : ''
                        }`}
                        onClick={() => handleNavItemClick('points-stats')}
                    >
                        <div className="nav-icon w-6 h-6 mr-4 text-lg">📈</div>
                        <span className="nav-text text-base font-semibold relative z-20">Points & Stats</span>
                    </div>

                    <div
                        className={`nav-item flex items-center px-5 py-4 cursor-pointer transition-all duration-300 ease-in-out border-l-4 border-l-transparent relative overflow-hidden ${
                            activeNavItem === 'feedback' ? 'active' : ''
                        }`}
                        onClick={() => handleNavItemClick('feedback')}
                    >
                        <div className="nav-icon w-6 h-6 mr-4 text-lg">💬</div>
                        <span className="nav-text text-base font-semibold relative z-20">Feedback</span>
                    </div>
                </nav>

                <div className="logout-item absolute bottom-5 left-0 right-0">
                    <div
                        className={`nav-item flex items-center px-5 py-4 cursor-pointer transition-all duration-300 ease-in-out border-l-4 border-l-transparent relative overflow-hidden ${
                            activeNavItem === 'logout' ? 'active' : ''
                        }`}
                        onClick={() => handleNavItemClick('logout')}
                    >
                        <div className="nav-icon w-6 h-6 mr-4 text-lg">🚪</div>
                        <span className="nav-text text-base font-semibold relative z-20">Logout</span>
                    </div>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="main-content ml-[280px] p-5 min-h-screen">
                {/* Notification Banner */}
                {showNotification && (
                    <div id="notificationBanner" className="notification-banner bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white p-4 md:px-6 md:py-4 rounded-2xl mb-6 flex items-center justify-between shadow-lg relative overflow-hidden">
                        <div className="notification-text flex items-center font-semibold z-10">
                            <span className="notification-icon mr-3 text-2xl animate-bounce">🎮</span>
                            MISSION ALERT: New community cleanup event this weekend! +500 XP bonus available!
                        </div>
                        <button className="close-btn bg-white bg-opacity-20 border-none text-white text-3xl cursor-pointer rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 z-10 hover:bg-opacity-30 hover:scale-110" onClick={closeNotification}>×</button>
                    </div>
                )}

                {/* Dashboard Header */}
                <div className="dashboard-header mb-8">
                    <h1 className="dashboard-title text-[3rem] font-extrabold mb-2.5">Your Environmental Impact Dashboard</h1>
                    <p className="dashboard-subtitle text-lg text-[#94a3b8] font-medium">Every cleanup makes a difference. Track your journey as an environmental warrior!</p>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-9">
                    <div className="stat-card events rounded-[20px] p-[30px] relative transition-all duration-400 ease-in-out overflow-hidden">
                        <div className="stat-header flex items-center justify-between mb-5">
                            <div className="stat-icon-container flex items-center">
                                <div className="stat-icon w-[50px] h-[50px] rounded-xl flex items-center justify-center mr-[15px] text-[1.8rem] text-white">🎯</div>
                                <div className="stat-title text-sm font-bold text-[#64748b] uppercase tracking-wider">Missions Completed</div>
                            </div>
                            <div className="level-indicator text-xs font-bold px-2 py-1 rounded-xl">Rank: Hero</div>
                        </div>
                        <div className="stat-value text-5xl font-extrabold mb-2 text-[#3b82f6]">12</div>
                        <div className="stat-label text-base text-[#94a3b8] font-semibold mb-[15px]">Community Cleanups</div>
                        <div className="progress-bar h-1.5 rounded-sm overflow-hidden mb-2">
                            <div className="progress-fill h-full"></div>
                        </div>
                        <div className="progress-text text-sm text-[#64748b] text-right">Next milestone: 15 events</div>
                    </div>

                    <div className="stat-card waste rounded-[20px] p-[30px] relative transition-all duration-400 ease-in-out overflow-hidden">
                        <div className="stat-header flex items-center justify-between mb-5">
                            <div className="stat-icon-container flex items-center">
                                <div className="stat-icon w-[50px] h-[50px] rounded-xl flex items-center justify-center mr-[15px] text-[1.8rem] text-white">⚡</div>
                                <div className="stat-title text-sm font-bold text-[#64748b] uppercase tracking-wider">Power Level</div>
                            </div>
                            <div className="level-indicator text-xs font-bold px-2 py-1 rounded-xl">Boss Tier</div>
                        </div>
                        <div className="stat-value text-5xl font-extrabold mb-2 text-[#22c55e]">150</div>
                        <div className="stat-label text-base text-[#94a3b8] font-semibold mb-[15px]">Kilograms Collected</div>
                        <div className="progress-bar h-1.5 rounded-sm overflow-hidden mb-2">
                            <div className="progress-fill h-full"></div>
                        </div>
                        <div className="progress-text text-sm text-[#64748b] text-right">Achievement: 200kg target</div>
                    </div>

                    <div className="stat-card badges rounded-[20px] p-[30px] relative transition-all duration-400 ease-in-out overflow-hidden">
                        <div className="stat-header flex items-center justify-between mb-5">
                            <div className="stat-icon-container flex items-center">
                                <div className="stat-icon w-[50px] h-[50px] rounded-xl flex items-center justify-center mr-[15px] text-[1.8rem] text-white">🏆</div>
                                <div className="stat-title text-sm font-bold text-[#64748b] uppercase tracking-wider">Trophies Earned</div>
                            </div>
                            <div className="level-indicator text-xs font-bold px-2 py-1 rounded-xl">Epic</div>
                        </div>
                        <div className="stat-value text-5xl font-extrabold mb-2 text-[#f59e0b]">8</div>
                        <div className="stat-label text-base text-[#94a3b8] font-semibold mb-[15px]">Achievements Unlocked</div>
                        <div className="progress-bar h-1.5 rounded-sm overflow-hidden mb-2">
                            <div className="progress-fill h-full"></div>
                        </div>
                        <div className="progress-text text-sm text-[#64748b] text-right">Legendary at 12 badges</div>
                    </div>

                    <div className="stat-card points rounded-[20px] p-[30px] relative transition-all duration-400 ease-in-out overflow-hidden">
                        <div className="stat-header flex items-center justify-between mb-5">
                            <div className="stat-icon-container flex items-center">
                                <div className="stat-icon w-[50px] h-[50px] rounded-xl flex items-center justify-center mr-[15px] text-[1.8rem] text-white">💎</div>
                                <div className="stat-title text-sm font-bold text-[#64748b] uppercase tracking-wider">Combat Points</div>
                            </div>
                            <div className="level-indicator text-xs font-bold px-2 py-1 rounded-xl">Master</div>
                        </div>
                        <div className="stat-value text-5xl font-extrabold mb-2 text-[#a855f7]">750</div>
                        <div className="stat-label text-base text-[#94a3b8] font-semibold mb-[15px]">Total Score</div>
                        <div className="progress-bar h-1.5 rounded-sm overflow-hidden mb-2">
                            <div className="progress-fill h-full"></div>
                        </div>
                        <div className="progress-text text-sm text-[#64748b] text-right">Grandmaster: 1000pts</div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="chart-section rounded-3xl p-9 mb-9 relative overflow-hidden">
                    <h2 className="chart-title text-2xl font-extrabold text-white mb-6 flex items-center">📊 Battle Performance Analytics</h2>
                    <div className="chart-container relative h-[350px]">
                        <canvas ref={chartRef} id="weeklyChart"></canvas>
                    </div>
                </div>

                {/* Milestone Section */}
                <div className="milestone-section bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-3xl p-9 text-center shadow-lg relative overflow-hidden">
                    <div className="milestone-content relative z-10">
                        <div className="milestone-text text-2xl font-extrabold mb-3 text-white text-shadow-lg">
                            🎉 LEGENDARY ACHIEVEMENT UNLOCKED! 🎉
                            <span className="milestone-emoji text-5xl mx-2 animate-bounce">🌱</span>
                        </div>
                        <div className="milestone-subtitle text-lg opacity-90 text-white font-semibold">
                            You've conquered 150kg of waste this month! Your planet-saving powers are growing stronger!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VolDashboard;
