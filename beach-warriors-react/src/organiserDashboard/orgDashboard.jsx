import React, { useState, useEffect, useRef } from 'react';
import Events from './Events.jsx'; // Import the Events component
import BeachMaps from './beachMaps.jsx'; // Import the BeachMaps component

// ChartBar sub-component for rendering individual bars
const ChartBar = ({ item, animatedHeight }) => (
    <div className="chart-bar-group flex flex-col items-center" key={item.id}>
        {/* Display percentage above the bar */}
        <div className="chart-percentage text-xs font-semibold text-cyan-800 mb-1">
            {parseInt(item.height)}% {/* Parse the height string to an integer for display */}
        </div>
        <div
            className="chart-bar"
            style={{ height: animatedHeight || '0%' }} // Use animatedHeight for transition
        ></div>
        <div className="chart-label">
            {item.month || item.year}
        </div>
    </div>
);


const OrgDashboard = ({ navigateTo, initialActiveTab = 'orgdashboard' }) => {
    // State for sidebar visibility on mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // State for active navigation item within the dashboard
    const [activeNavItem, setActiveNavItem] = useState(initialActiveTab);
    // State for chart trend (Monthly/Yearly)
    const [chartTrend, setChartTrend] = useState('Monthly');

    // Dummy data for Waste Collection Trends chart
    // 'height' values are percentage strings to directly control bar height in CSS
    const wasteCollectionData = {
        Monthly: [
            { id: 'Jan', month: 'Jan', height: '60%' },
            { id: 'Feb', month: 'Feb', height: '75%' },
            { id: 'Mar', month: 'Mar', height: '45%' },
            { id: 'Apr', month: 'Apr', height: '80%' },
            { id: 'May', month: 'May', height: '65%' },
            { id: 'Jun', month: 'Jun', height: '90%' },
            { id: 'Jul', month: 'Jul', height: '100%' },
            { id: 'Aug', month: 'Aug', height: '85%' },
            { id: 'Sep', month: 'Sep', height: '70%' },
            { id: 'Oct', month: 'Oct', height: '78%' },
            { id: 'Nov', month: 'Nov', height: '92%' },
            { id: 'Dec', month: 'Dec', height: '88%' },
        ],
        Yearly: [ // Placeholder for yearly data
            { id: '2022', year: '2022', height: '70%' },
            { id: '2023', year: '2023', height: '85%' },
            { id: '2024', year: '2024', height: '95%' },
        ]
    };

    // State to manage animated heights for the chart bars individually
    const [animatedChartHeights, setAnimatedChartHeights] = useState({});
    const [showNotifications, setShowNotifications] = useState(false);

    // Ref to reference the chart container DOM element (not strictly needed with new animation, but kept for consistency)
    const chartContainerRef = useRef(null);

    // Ref for direct DOM access (for bubbles animation)
    const bubbleContainerRef = useRef(null);

    // Dummy data for statistics (existing)
    const stats = {
        eventsAssigned: { value: 12, unit: 'this month', change: '+3 from last month', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )},
        registeredVolunteers: { value: 248, unit: 'active', change: '+24 new this month', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        )},
        wasteCollected: { value: '1,250', unit: 'kg', change: '+125 kg this month', iconBg: 'bg-teal-100', iconColor: 'text-teal-600', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        )},
        beachesCleaned: { value: 18, unit: 'locations', change: '+2 new locations', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        )},
    };

    // Dummy data for Waste Composition (existing)
    const wasteCompositionData = [
        { type: 'Plastic', percentage: 45, color: '#0EA5E9' },
        { type: 'Fishing Gear', percentage: 25, color: '#06B6D4' },
        { type: 'Glass', percentage: 15, color: '#22D3EE' },
        { type: 'Metal', percentage: 10, color: '#67E8F9' },
        { type: 'Other', percentage: 5, color: '#A5F3FC' },
    ];

    // Effect for animating chart bars when data changes or component mounts
    useEffect(() => {
        const currentData = wasteCollectionData[chartTrend];
        if (!currentData) return;
      
        const originalHeightsMap = currentData.reduce((acc, item) => {
          acc[item.id] = item.height;
          return acc;
        }, {});
      
        setAnimatedChartHeights((prev) => {
          // prevent state updates if already same (optional optimization)
          const isSame = JSON.stringify(prev) === JSON.stringify(originalHeightsMap);
          return isSame ? prev : originalHeightsMap;
        });
      
        const fallDelayMs = 1500;
        const riseDelayMs = 100;
        const fallTimeoutId = setTimeout(() => {
          const zeroHeightsMap = currentData.reduce((acc, item) => {
            acc[item.id] = '0%';
            return acc;
          }, {});
          setAnimatedChartHeights(zeroHeightsMap);
        }, fallDelayMs);
      
        const riseTimeoutId = setTimeout(() => {
          setAnimatedChartHeights(originalHeightsMap);
        }, fallDelayMs + riseDelayMs);
      
        return () => {
          clearTimeout(fallTimeoutId);
          clearTimeout(riseTimeoutId);
        };
      }, [chartTrend, JSON.stringify(wasteCollectionData)]); // ← safer to stringify if deeply nested
      
    // Effect for creating bubbles dynamically (existing)
    useEffect(() => {
        const bubbleContainer = bubbleContainerRef.current;
        const bubbleCount = 15;

        // Clear existing bubbles before creating new ones on re-render
        if (bubbleContainer) {
            bubbleContainer.innerHTML = '';
            for (let i = 0; i < bubbleCount; i++) {
                const size = Math.random() * 20 + 5;
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${Math.random() * 100}%`;
                bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
                bubble.style.animationDelay = `${Math.random() * 5}s`;

                bubbleContainer.appendChild(bubble);
            }
        }
    }, []); // Empty dependency array means this runs once on mount


    // Handle sidebar navigation clicks (modified)
    const handleDashboardNavClick = (item) => {
        setActiveNavItem(item);
        setIsSidebarOpen(false); // Close sidebar on mobile after click
        console.log(`Switched dashboard view to: ${item}`);
    };

    // Handle notification bell click (existing)
    const handleNotificationClick = () => {
        setShowNotifications((prev) => !prev); // Toggle the dropdown
      };      

    // Helper for rendering stat cards (existing)
    const renderStatCard = (key, data) => (
        <div className="ocean-card p-6 stat-card" key={key}>
            <div className="flex flex-col">
                <div className={`stat-card-icon ${data.iconBg} ${data.iconColor}`}>
                    {data.icon}
                </div>
                <h3 className="text-sm font-semibold text-cyan-900 uppercase tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <div className="flex items-end space-x-2 mb-2">
                    <div className="text-4xl font-bold text-cyan-900">{data.value}</div>
                    <div className="text-sm text-cyan-600 mb-1">{data.unit}</div>
                </div>
                <div className="flex items-center text-sm mt-auto">
                    {/* Conditional icon for change indicator */}
                    {data.change.startsWith('+') ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    )}
                    <span className={`${data.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{data.change}</span>
                </div>
            </div>
        </div>
    );

    // Function to render content based on activeNavItem
    const renderDashboardContent = () => {
        switch (activeNavItem) {
            case 'orgdashboard':
                return (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-cyan-900">Dashboard</h1>
                                <p className="text-cyan-600">Welcome back, Marina. Here's what's happening with your ocean cleanup initiatives.</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="md:hidden p-2 rounded-full hover:bg-cyan-100 transition-colors" id="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>

                                <button
                                className="relative text-cyan-600 hover:text-cyan-800 transition-colors p-2 rounded-full hover:bg-cyan-100"
                                onClick={handleNotificationClick}
                                >
                                    {showNotifications && (
  <div className="absolute right-0 mt-2 w-64 bg-white border border-cyan-100 rounded-md shadow-lg z-50">
    <div className="relative p-4 text-sm text-gray-700">
      {/* Close Button in top-right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowNotifications(false);
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg font-bold leading-none focus:outline-none"
        aria-label="Close notifications"
      >
        &times;
      </button>

      <p className="font-semibold text-cyan-800 mb-2">Notifications</p>
      <ul className="space-y-2">
        <li className="text-gray-600">🧹 Beach Cleanup scheduled for 5th July</li>
        <li className="text-gray-600">👥 12 new volunteers joined</li>
        <li className="text-gray-600">📦 Waste data submitted for review</li>
      </ul>
    </div>
  </div>
)}
                                    <span role="img" aria-label="notifications" className="text-2xl">
                                        🔔
                                    </span>
                                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                         3
                                    </div>
                                </button>

                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {Object.entries(stats).map(([key, data]) => renderStatCard(key, data))}
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column */}
                            <div className="lg:col-span-2">
                                {/* Waste Collection Chart */}
                                <div className="ocean-card p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-cyan-900">Waste Collection Trends</h2>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setChartTrend('Monthly')}
                                                className={`px-3 py-1 text-sm rounded-lg ${chartTrend === 'Monthly' ? 'bg-cyan-100 text-cyan-800' : 'text-cyan-600 hover:bg-cyan-50'}`}
                                            >
                                                Monthly
                                            </button>
                                            <button
                                                onClick={() => setChartTrend('Yearly')}
                                                className={`px-3 py-1 text-sm rounded-lg ${chartTrend === 'Yearly' ? 'bg-cyan-100 text-cyan-800' : 'text-cyan-600 hover:bg-cyan-50'}`}
                                            >
                                                Yearly
                                            </button>
                                        </div>
                                    </div>

                                    {/* Chart Container: Uses flexbox for layout, bars animate their height */}
                                    <div ref={chartContainerRef} className="chart-container flex items-end justify-around mb-8">
                                        {wasteCollectionData[chartTrend].map((item) => (
                                            <ChartBar
                                                key={item.id}
                                                item={item}
                                                animatedHeight={animatedChartHeights[item.id]}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex justify-between text-sm text-cyan-600 pt-4 border-t border-cyan-100">
                                        <div>Total this year: 8,750 kg</div>
                                        <div>+32% from last year</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div>
                                {/* Waste Composition */}
                                <div className="ocean-card p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-cyan-900">Waste Composition</h2>
                                        <div className="text-sm text-cyan-600">This Month</div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        {wasteCompositionData.map((item, index) => (
                                            <div key={item.type}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-cyan-900">{item.type}</span>
                                                    <span className="text-sm text-cyan-600">{item.percentage}%</span>
                                                </div>
                                                <div className="progress-bar">
                                                    <div className="progress-value" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-sm text-cyan-600">
                                        <p>Total waste collected: 250 kg</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'events':
                return <Events />;
            case 'beachMaps':
                return <BeachMaps />; {/* Render the BeachMaps component here */}
            case 'impactReports':
                return <div className="p-4"><h2>Impact Reports (Under Construction)</h2><p>This section will generate impact reports.</p></div>;
            case 'aiContentCopilot':
                return <div className="p-4"><h2>AI Content Copilot (Under Construction)</h2><p>This section will feature AI-powered tools.</p></div>;
            case 'settings':
                return <div className="p-4"><h2>Settings (Under Construction)</h2><p>This section will allow you to configure settings.</p></div>;
            default:
                return null;
        }
    };

    return (
        <>
            {/* Embedded styles from HTML */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');

                :root {
                    --primary: #0891B2;
                    --primary-dark: #0E7490;
                    --secondary: #0EA5E9;
                    --accent: #06B6D4;
                    --light: #ECFEFF;
                    --dark: #164E63;
                }

                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #F0FDFF;
                    color: #164E63;
                    overflow-x: hidden;
                }

                h1, h2, h3, h4, h5, h6 {
                    font-family: 'Montserrat', sans-serif;
                }

                .ocean-card {
                    background: linear-gradient(to bottom, #ffffff, #f0fdff);
                    border-radius: 12px; /* Rounded corners */
                }

                .ocean-gradient {
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                }

                .wave-bg {
                    position: relative;
                    overflow: hidden;
                }

                .wave-bg::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 50px;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%230891B2' fill-opacity='0.1' d='M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,229.3C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
                    background-size: cover;
                    opacity: 0.8;
                    z-index: 1;
                }

                .nav-item {
                    /* Essential for aligning icon and text */
                    display: flex;
                    align-items: center;
                    padding: 8px 16px; /* px-4 py-2 */
                    color: #4B5563; /* text-gray-700 */
                    border-radius: 8px; /* rounded-lg */
                    transition: all 0.2s ease-in-out; /* transition-colors duration-200 */
                }

                .nav-item:hover {
                    background-color: #F3F4F6; /* hover:bg-gray-100 */
                }

                .nav-item.active {
                    /* Enhanced highlight with shadow and rounded corners */
                    background-color: #BFDBFE; /* bg-blue-200 (light blue from screenshot) */
                    color: #0F766E; /* text-cyan-900 (stronger text for contrast) */
                    font-weight: 600; /* font-semibold */
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
                    border-radius: 8px; /* rounded-lg */
                }

                .nav-item svg {
                    /* Consistent icon size and margin */
                    height: 20px; /* h-5 */
                    width: 20px; /* w-5 */
                    margin-right: 12px; /* mr-3 */
                }

                /* Explicitly setting line-height for text within nav-item for perfect vertical alignment */
                .nav-item span {
                    line-height: 20px; /* Matches svg height for perfect vertical centering */
                }

                .stat-card {
                    @apply relative overflow-hidden;
                }

                .progress-bar {
                    @apply h-2 rounded-full bg-cyan-100 overflow-hidden;
                }

                .progress-value {
                    @apply h-full bg-cyan-500;
                }

                .badge {
                    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
                }

                .badge-primary {
                    @apply bg-cyan-100 text-cyan-800;
                }

                .badge-success {
                    @apply bg-green-100 text-green-800;
                }

                .badge-warning {
                    @apply bg-amber-100 text-amber-800;
                }

                .badge-danger {
                    @apply bg-red-100 text-red-800;
                }

                .avatar {
                    @apply rounded-full overflow-hidden flex items-center justify-center;
                }

                .avatar-sm {
                    @apply w-8 h-8;
                }

                .avatar-group {
                    @apply flex -space-x-2 overflow-hidden;
                }

                .avatar-group .avatar {
                    @apply ring-2 ring-white;
                }

                /* Ocean Animation */
                @keyframes wave {
                    0% { transform: translateX(0) translateZ(0) scaleY(1); }
                    50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
                    100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
                }

                .wave {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 200%;
                    height: 100px;
                    background-repeat: repeat-x;
                    background-position: 0 bottom;
                    transform-origin: center bottom;
                }

                .wave-1 {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%230891B2' fill-opacity='0.2' d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'%3E%3C/path%3E%3C/svg%3E");
                    opacity: 0.2;
                    animation: wave 15s linear infinite;
                    z-index: 1;
                }

                .wave-2 {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%230891B2' fill-opacity='0.3' d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'%3E%3C/path%3E%3C/svg%3E");
                    opacity: 0.3;
                    animation: wave 10s linear infinite;
                    z-index: 2;
                }

                .wave-3 {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%230891B2' fill-opacity='0.4' d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'%3E%3C/path%3E%3C/svg%3E");
                    opacity: 0.4;
                    animation: wave 7s linear infinite;
                    z-index: 3;
                }

                /* Bubble Animation */
                .bubble-container {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                .bubble {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(8, 145, 178, 0.1);
                    animation: bubble-rise linear infinite;
                }

                @keyframes bubble-rise {
                    0% {
                        transform: translateY(100%) scale(0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.5;
                    }
                    100% {
                        transform: translateY(-100vh) scale(1);
                        opacity: 0;
                    }
                }

                /* Responsive Sidebar */
                @media (max-width: 768px) {
                    .sidebar {
                        transform: translateX(-100%);
                        transition: transform 0.3s ease-in-out;
                    }

                    .sidebar.open {
                        transform: translateX(0);
                    }

                    .sidebar-overlay {
                        display: none;
                    }

                    .sidebar-overlay.open {
                        display: block;
                    }
                }

                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                    width: 6px;
                }

                ::-webkit-scrollbar-track {
                    background: #f0fdff;
                }

                ::-webkit-scrollbar-thumb {
                    background: #0891B2;
                    border-radius: 3px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #0E7490;
                }

                /* Chart Styles */
                .chart-container {
                    position: relative;
                    height: 200px; /* Fixed height for the chart area */
                    width: 100%;
                    display: flex; /* Use flexbox for distribution */
                    align-items: flex-end; /* Align bars to the bottom */
                    justify-content: space-around; /* Distribute items evenly with space around them */
                }

                .chart-bar-group {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-end; /* Keep bar at the bottom within its group */
                    height: 100%; /* Crucial: Ensures the group takes full height of the container */
                    flex-grow: 1; /* Allow groups to grow and take available space horizontally */
                    max-width: 8%; /* Max width for each bar group, keeping bars from getting too wide */
                    margin: 0 1%; /* Add some margin between bars */
                }

                .chart-bar {
                    width: 80%; /* Width of the bar within its group (e.g., 80% of 8% max-width = ~6.4% of total width) */
                    background: linear-gradient(to top, #0891B2, #22D3EE);
                    border-radius: 4px 4px 0 0;
                    transition: height 0.3s ease-in-out; /* Adjusted transition for a snappier animation */
                    transform-origin: bottom; /* Ensure it grows from the bottom */
                }

                .chart-label {
                    font-size: 10px;
                    color: #0E7490;
                    margin-top: 5px; /* Space between bar and label */
                    text-align: center;
                    width: 100%; /* Ensure label takes full width of its group */
                }

                /* Logo styles */
                .logo-container {
                    display: flex;
                    align-items: center;
                    padding: 24px 0;
                    justify-content: center;
                    border-bottom: 1px solid #e2e8f0;
                    margin-bottom: 24px;
                }
                .logo-container svg {
                    height: 32px;
                    width: 32px;
                    margin-right: 12px;
                    color: #0ea5e9; /* Added color to match the screenshot */
                }
                .logo-container span {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--primary-dark);
                }

                /* Stat card icon */
                .stat-card-icon {
                    @apply flex items-center justify-center rounded-full w-12 h-12 mb-4;
                }
                `}
            </style>

            <div className="flex min-h-screen bg-cyan-50">
                {/* Sidebar */}
                <aside className={`sidebar fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 transform md:translate-x-0 transition-transform duration-300 ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="flex flex-col h-full">
                        {/* Logo - Restored original ocean wave/star theme */}
                        <div className="logo-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <span>Beach Warriors</span>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto py-4 px-3">
                            <div className="flex flex-col space-y-1"> {/* Changed to flex-col and space-y for vertical stacking */}
                                <button onClick={() => handleDashboardNavClick('orgdashboard')} className={`nav-item ${activeNavItem === 'orgdashboard' ? 'active' : ''}`}>
                                    {/* Dashboard Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>Dashboard</span>
                                </button>

                                <button onClick={() => handleDashboardNavClick('events')} className={`nav-item ${activeNavItem === 'events' ? 'active' : ''}`}>
                                    {/* Events Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Events</span>
                                </button>

                                <button onClick={() => handleDashboardNavClick('beachMaps')} className={`nav-item ${activeNavItem === 'beachMaps' ? 'active' : ''}`}>
                                    {/* Beach Maps Icon (World/Globe icon as a placeholder) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h7m-9-6h8m-9 6a2 2 0 012-2h7a2 2 0 012 2v2a2 2 0 002 2h0a2 2 0 002-2V9a2 2 0 012-2h0a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 00-2-2z" />
                                    </svg>
                                    <span>Beach Maps</span>
                                </button>


                                <button onClick={() => handleDashboardNavClick('impactReports')} className={`nav-item ${activeNavItem === 'impactReports' ? 'active' : ''}`}>
                                    {/* Impact Reports Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 2v-6m2 9H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Impact Reports</span>
                                </button>

                                <button onClick={() => handleDashboardNavClick('aiContentCopilot')} className={`nav-item ${activeNavItem === 'aiContentCopilot' ? 'active' : ''}`}>
                                    {/* AI Content Copilot Icon (e.g., a magic wand or robot head) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    <span>AI Content Copilot</span>
                                </button>

                                <button onClick={() => handleDashboardNavClick('settings')} className={`nav-item ${activeNavItem === 'settings' ? 'active' : ''}`}>
                                    {/* Settings Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.564.342 1.258.164 1.724-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Settings</span>
                                </button>
                            </div>
                        </nav>

                        {/* Profile Section */}
                        <div className="p-4 border-t border-cyan-100 mt-auto">
                            <div className="flex items-center space-x-3">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://placehold.co/40x40/0EA5E9/FFFFFF?text=MC"
                                    alt="Marina Costa Profile"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/000000?text=User" }}
                                />
                                <div>
                                    <p className="text-sm font-medium text-cyan-900">Anjali Verma</p>
                                    <p className="text-xs text-gray-600">Beach Cleanup Organizer</p>
                                </div>
                            </div>
                        </div> 

                        <div className="mt-auto mb-3">
                            <button
                            onClick={() => {
                                const confirmLogout = window.confirm("Are you sure you want to log out?");
                                if (confirmLogout) {
                                  navigateTo('home');
                                }
                              }}                              
                            className="w-full flex items-center justify-center px-3 py-1.5 text-xs font-medium text-cyan-600 bg-white border border-cyan-500 rounded-[10px] hover:bg-cyan-50 transition-all duration-200"
                            >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.0 mr-1.5 text-cyan-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a1 1 0 01-1 1H6a2 2 0 01-2-2V7a2 2 0 012-2h6a1 1 0 011 1v1"
                            />
                            </svg>
                            Logout
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Sidebar Overlay */}
                <div onClick={() => setIsSidebarOpen(false)} className={`sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isSidebarOpen ? 'open' : ''}`}></div>

                {/* Main Content */}
                <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 relative overflow-hidden">
                    {/* Ocean Animation Background */}
                    <div className="bubble-container" ref={bubbleContainerRef}>
                        {/* Bubbles will be injected by useEffect */}
                    </div>

                    {renderDashboardContent()} {/* Render the active sub-page content */}

                    {/* Ocean Waves Animation */}
                    <div className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none z-0">
                        <div className="wave wave-1"></div>
                        <div className="wave wave-2"></div>
                        <div className="wave wave-3"></div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default OrgDashboard;
