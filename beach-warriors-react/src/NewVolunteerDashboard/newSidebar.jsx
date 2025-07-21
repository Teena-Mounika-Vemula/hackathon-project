import React from 'react';

const handleLogout = () => {
  // Use in-memory storage instead of localStorage for new users
  sessionStorage.clear();
  window.location.href = './components/homepage.jsx';
};

const NewSidebar = ({ activeNavItem, handleNavItemClick }) => {
  // Simplified menu items for new users (Level 1)
  const menuItems = [
    { key: 'welcome', icon: '🌟', label: 'Welcome Guide' },
    { key: 'getting-started', icon: '🚀', label: 'Getting Started' },
    { key: 'first-cleanup', icon: '🏖️', label: 'Your First Cleanup' },
    { key: 'learn-basics', icon: '📚', label: 'Learn the Basics' },
    { key: 'profile-setup', icon: '👤', label: 'Setup Profile' },
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
              radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%);
            min-height: 100vh;
            color: #ffffff;
          }

          .new-sidebar {
            background: linear-gradient(180deg, #1a1a1a 0%, #0f1419 100%);
            border-right: 2px solid #22c55e;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
          }

          .new-sidebar-header {
            border-bottom: 2px solid #22c55e;
          }

          .new-logo-glow {
            position: absolute;
            top: -8px;
            left: -8px;
            right: -8px;
            bottom: -8px;
            background: conic-gradient(from 0deg, #22c55e, #3b82f6, #a855f7, #22c55e);
            border-radius: 50%;
            opacity: 0.2;
            animation: gentle-rotate 6s linear infinite;
          }

          .new-sidebar-header h2 {
            text-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
          }

          .new-player-level {
            background: linear-gradient(135deg, #1e293b, #334155);
            border: 1px solid #22c55e;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.15);
          }

          .new-level-badge {
            background: linear-gradient(135deg, #10b981, #059669);
            animation: new-user-glow 3s ease-in-out infinite alternate;
          }

          .new-xp-bar {
            background: #1e293b;
            border: 1px solid #374151;
          }

          .new-xp-fill {
            background: linear-gradient(90deg, #10b981, #22c55e);
            animation: gentle-pulse 3s ease-in-out infinite alternate;
          }

          .new-nav-item {
            position: relative;
            overflow: hidden;
          }

          .new-nav-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 0;
            background: linear-gradient(90deg, rgba(16, 185, 129, 0.15), rgba(34, 197, 94, 0.1));
            transition: width 0.3s ease;
          }

          .new-nav-item:hover::before {
            width: 100%;
          }

          .new-nav-item.active {
            background: linear-gradient(90deg, rgba(16, 185, 129, 0.25), rgba(34, 197, 94, 0.1));
            border-left-color: #10b981;
            box-shadow: inset 0 0 15px rgba(16, 185, 129, 0.2);
          }

          .welcome-badge {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            font-size: 0.7rem;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            animation: welcome-bounce 2s ease-in-out infinite;
          }

          @keyframes gentle-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes new-user-glow {
            0% { box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
            100% { box-shadow: 0 0 16px rgba(16, 185, 129, 0.6); }
          }

          @keyframes gentle-pulse {
            0% { box-shadow: 0 0 3px rgba(16, 185, 129, 0.3); }
            100% { box-shadow: 0 0 12px rgba(16, 185, 129, 0.5); }
          }

          @keyframes welcome-bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-3px); }
            60% { transform: translateY(-1px); }
          }

          @keyframes beginner-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }

          @media (max-width: 768px) {
            .new-sidebar {
              width: 80px;
            }

            .new-sidebar-header h2,
            .new-sidebar-header p,
            .new-nav-text,
            .new-player-level,
            .welcome-badge {
              display: none;
            }
          }
        `}
      </style>

      <div className="new-sidebar fixed left-0 top-0 w-[280px] h-screen py-5 z-[1000] flex flex-col bg-white border-r border-gray-200">
        <div className="new-sidebar-header px-5 pb-[30px] text-center border-b-2">
          <div className="logo-container relative inline-block">
            <div className="new-logo-glow absolute top-[-8px] left-[-8px] right-[-8px] bottom-[-8px] rounded-full opacity-20" />
            <h2 className="text-[1.8rem] mb-1.5 text-[#22c55e] font-extrabold relative z-20">
              🌊 Beach Warriors
            </h2>
          </div>
          <p className="text-sm text-[#64748b] font-semibold uppercase tracking-wide">
            Beginner Hub
          </p>
          <div className="welcome-badge mt-2 inline-block">New Warrior!</div>
        </div>

        <div className="new-player-level mx-5 mt-5 p-4 rounded-xl bg-gray-100">
          <div className="level-info flex justify-between items-center mb-2.5">
            <div className="new-level-badge text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-green-500">
              Level 1 🌱
            </div>
            <div className="xp-text text-sm text-[#94a3b8]">0 / 100 XP</div>
          </div>
          <div className="new-xp-bar h-2 bg-[#1e293b] rounded-md overflow-hidden border border-[#374151]">
            <div className="new-xp-fill h-full w-[0%] bg-green-400"></div>
          </div>
          <div className="mt-2 text-xs text-[#64748b] text-center">
            Complete your first cleanup to earn XP! 🎯
          </div>
        </div>

        <nav className="nav-menu py-5 flex-1">
          {menuItems.slice(0, -1).map(item => (
            <div
              key={item.key}
              className={`new-nav-item flex items-center px-5 py-4 cursor-pointer transition-all duration-300 ease-in-out border-l-4 relative overflow-hidden ${
                activeNavItem === item.key 
                  ? 'border-l-green-500 bg-green-50 font-semibold text-green-700' 
                  : 'border-l-transparent hover:bg-gray-50'
              }`}
              onClick={() => handleNavItemClick(item.key)}
            >
              <div className="nav-icon w-6 h-6 mr-4 text-lg" style={{ animation: 'beginner-float 4s ease-in-out infinite' }}>
                {item.icon}
              </div>
              <span className="new-nav-text text-base relative z-20">{item.label}</span>
              {item.key === 'getting-started' && (
                <div className="ml-auto">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Start Here</span>
                </div>
              )}
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
          <div className={`flex items-center border-l-4 transition-all duration-300 ${
            activeNavItem === 'logout' 
              ? 'border-l-red-500 bg-red-100 text-red-600' 
              : 'border-l-transparent hover:bg-gray-50'
          }`}>
            <div className="nav-icon w-6 h-6 mr-4 text-lg">🚪</div>
            <span className="new-nav-text text-base">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSidebar;