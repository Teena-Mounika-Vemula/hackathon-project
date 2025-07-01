import React from 'react';

 const handleLogout = () => {
    localStorage.clear();               // Clear user data
    window.location.href = './components/homepage.jsx';         // Redirect to home page
  };

const Sidebar = ({ activeNavItem, handleNavItemClick }) => {
  const menuItems = [
    { key: 'voldashboard', icon: '🏠', label: 'Impact Dashboard' },
    { key: 'avatar-badges', icon: '👤', label: 'Avatar & Badges' },
    { key: 'cleanup-events', icon: '📅', label: 'Cleanup Events' },
    { key: 'waste-classifier', icon: '♻️', label: 'Waste Classification' },
    { key: 'eduhub', icon: '👨‍🎓', label: 'Education Hub' },
    { key: 'impactcam', icon: '📸', label: 'Impact Cam' },
    { key: 'logout', icon: '🚪', label: 'Logout' },
  ];

  return (
    <>
    <style>
        {`
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

        .sidebar {
                    background: linear-gradient(180deg, #1a1a1a 0%, #0f1419 100%);
                    border-right: 2px solid #22c55e;
                    box-shadow: 0 0 30px rgba(34, 197, 94, 0.3);
                }
        
        .sidebar-header {
                    border-bottom: 2px solid #22c55e;
                }
        .logo-glow {
                    position: absolute;
                    top: -10px;
                    left: -10px;
                    right: -10px;
                    bottom: -10px;
                    background: conic-gradient(from 0deg, #22c55e, #3b82f6, #a855f7, #22c55e);
                    border-radius: 50%;
                    opacity: 0.3;
                    animation: rotate 4s linear infinite;
                }
        .sidebar-header h2 {
                    text-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
                }

                .player-level {
                    background: linear-gradient(135deg, #1e293b, #334155);
                    border: 1px solid #22c55e;
                    box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
                }

                .level-badge {
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                }

                .xp-bar {
                    background: #1e293b;
                    border: 1px solid #374151;
                }

                .xp-fill {
                    background: linear-gradient(90deg, #22c55e, #3b82f6);
                    animation: pulse-glow 2s ease-in-out infinite alternate;
                }

                .nav-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 0;
                    background: linear-gradient(90deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
                    transition: width 0.3s ease;
                }

                .nav-item:hover::before {
                    width: 100%;
                }

                .nav-item.active {
                    background: linear-gradient(90deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.1));
                    border-left-color: #22c55e;
                    box-shadow: inset 0 0 20px rgba(34, 197, 94, 0.2);
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

        `}
    </style>
    <div className="sidebar fixed left-0 top-0 w-[280px] h-screen py-5 z-[1000] flex flex-col bg-white border-r border-gray-200">
      <div className="sidebar-header px-5 pb-[30px] text-center border-b-2">
        <div className="logo-container relative inline-block">
          <div className="logo-glow absolute top-[-10px] left-[-10px] right-[-10px] bottom-[-10px] rounded-full opacity-30" />
          <h2 className="text-[1.8rem] mb-1.5 text-[#22c55e] font-extrabold relative z-20">✨ Beach Warriors</h2>
        </div>
        <p className="text-sm text-[#64748b] font-semibold uppercase tracking-wide">Command Center</p>
      </div>

      <div className="player-level mx-5 mt-5 p-4 rounded-xl bg-gray-100">
        <div className="level-info flex justify-between items-center mb-2.5">
          <div className="level-badge text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-green-500">Level 12</div>
          <div className="xp-text text-sm text-[#94a3b8]">1,850 / 2,500 XP</div>
        </div>
        <div className="xp-bar h-2 bg-[#1e293b] rounded-md overflow-hidden border border-[#374151]">
          <div className="xp-fill h-full w-[75%] bg-green-400"></div>
        </div>
      </div>

      <nav className="nav-menu py-5 flex-1">
        {menuItems.slice(0, -1).map(item => (
          <div
            key={item.key}
            className={`nav-item flex items-center px-5 py-4 cursor-pointer transition-all duration-300 ease-in-out border-l-4 relative overflow-hidden ${
              activeNavItem === item.key ? 'border-l-green-500 bg-green-50 font-semibold text-green-700' : 'border-l-transparent'
            }`}
            onClick={() => handleNavItemClick(item.key)}
          >
            <div className="nav-icon w-6 h-6 mr-4 text-lg">{item.icon}</div>
            <span className="nav-text text-base relative z-20">{item.label}</span>
          </div>
        ))}
      </nav>
<div
  className="logout-item px-5 py-4 cursor-pointer"
  onClick={() => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      handleLogout();
    }
  }}
>
  <div className={`flex items-center border-l-4 ${activeNavItem === 'logout' ? 'border-l-green-500 bg-red-100 text-red-600' : 'border-l-transparent'}`}>
    <div className="nav-icon w-6 h-6 mr-4 text-lg">🚪</div>
    <span className="nav-text text-base">Logout</span>
  </div>
</div>

    </div>
    </>
  );
};

export default Sidebar;
