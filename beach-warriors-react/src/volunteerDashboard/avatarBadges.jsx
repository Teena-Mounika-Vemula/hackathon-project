import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AvatarRewards = ({ navigateTo }) => {
  const [activeNavItem, setActiveNavItem] = useState('avatar-badges');
  const [selectedIcon, setSelectedIcon] = useState('🌍');
  const [isEquipped, setIsEquipped] = useState({});

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
    navigateTo(item);
  };

  const avatarIcons = ['🌍', '♻️', '🌿', '🦋', '🌊'];

  const rewards = [
    {
      icon: '🏆',
      bg: 'from-yellow-400 to-orange-400',
      name: 'Waste Warrior Title',
      desc: 'For collecting 150kg of waste',
      status: 'earned'
    },
    {
      icon: '⚡',
      bg: 'from-teal-400 to-cyan-500',
      name: 'Power Boost',
      desc: '+50 Combat Points bonus',
      status: 'earned'
    },
    {
      icon: '🌟',
      bg: 'from-green-400 to-emerald-500',
      name: 'Epic Avatar Frame',
      desc: 'Golden eco-warrior border',
      status: 'locked'
    },
    {
      icon: '💎',
      bg: 'from-indigo-600 to-purple-400',
      name: 'Premium Themes',
      desc: 'Unlock exclusive color schemes',
      status: 'locked',
      requirement: '200kg needed'
    }
  ];

  const badges = [
    {
      icon: '🥇',
      bg: 'from-yellow-400 to-orange-400',
      name: 'First Cleanup',
      desc: 'Completed your first community cleanup event'
    },
    {
      icon: '🌱',
      bg: 'from-green-400 to-emerald-500',
      name: 'Green Thumb',
      desc: 'Planted 10 trees during restoration events'
    },
    {
      icon: '♻️',
      bg: 'from-teal-400 to-cyan-500',
      name: 'Recycle Master',
      desc: 'Correctly sorted 100kg of recyclable materials'
    },
    {
      icon: '🔥',
      bg: 'from-red-400 to-orange-500',
      name: 'Streak Champion',
      desc: 'Maintained 30-day activity streak'
    },
    {
      icon: '👑',
      bg: 'from-indigo-600 to-purple-400',
      name: 'Team Leader',
      desc: 'Led 5 community cleanup missions'
    },
    {
      icon: '🦋',
      bg: 'from-pink-300 to-pink-500',
      name: 'Wildlife Protector',
      desc: 'Cleaned habitats saving 50+ animals'
    },
    {
      icon: '❓',
      bg: '',
      name: 'Ocean Guardian',
      desc: 'Clean 25 beaches to unlock this badge'
    },
    {
      icon: '❓',
      bg: '',
      name: 'Legendary Warrior',
      desc: 'Reach 1000 combat points to unlock'
    }
  ];

  const toggleEquip = (index) => {
    setIsEquipped((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
    <style>
        {`/* Avatar & Rewards Dark Theme Styles */

body {
  background: linear-gradient(135deg, #0a0f1c 0%, #1a2332 50%, #0f1419 100%);
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-content {
  padding: 30px;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #00ff88, #40e0d0, #6a5acd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.mission-alert {
  background: linear-gradient(135deg, #00ff88, #00cc6a);
  color: #0a0f1c;
  padding: 15px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-section,
.rewards-section,
.badges-showcase {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 16px;
  padding: 25px;
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
}

.avatar-frame {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #40e0d0, #00ced1);
  padding: 4px;
  position: relative;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a2332, #0a0f1c);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
}

.avatar-rank {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #0a0f1c;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  border: 2px solid #1a2332;
}

.reward-item {
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.reward-item:hover {
  background: rgba(64, 224, 208, 0.15);
  border-color: #40e0d0;
}

.reward-status.status-earned {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
}

.reward-status.status-locked {
  background: rgba(255, 255, 255, 0.1);
  color: #8892b0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
}

.badge-card {
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.badge-card:hover {
  background: rgba(64, 224, 208, 0.15);
  border-color: #40e0d0;
  transform: translateY(-3px);
}

.achievement-notification {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #0a0f1c;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

        `}
    </style>
   <div className="flex min-h-screen bg-[#0f1419] text-white">
      <Sidebar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />

      <main className="ml-[280px] w-full p-8 space-y-10">
        {/* Avatar */}
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-full bg-green-700 text-6xl flex items-center justify-center shadow-2xl relative animate-pulse">
            {selectedIcon}
            <div className="absolute bottom-0 right-0 text-xs bg-black px-2 py-0.5 rounded-full">LV 12</div>
          </div>
          <p className="mt-4 text-xl font-bold text-green-300">Customize Your Avatar</p>
        </div>

        {/* Avatar Options */}
        <div className="flex justify-center gap-6 flex-wrap">
          {avatarIcons.map((icon, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIcon(icon)}
              className={`cursor-pointer flex flex-col items-center border-2 p-4 rounded-xl w-24 transition-all duration-300 ${
                selectedIcon === icon ? 'border-green-500 bg-green-900 text-green-200' : 'border-gray-600 bg-gray-800'
              }`}
            >
              <div className="text-3xl">{icon}</div>
              <div className="text-sm mt-1 text-white">{icon === '🌍' ? 'Earth' : icon === '♻️' ? 'Recycle' : icon === '🌿' ? 'Leaf' : icon === '🦋' ? 'Nature' : 'Ocean'}</div>
            </div>
          ))}
        </div>

        {/* Rewards */}
        <section>
          <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">🎁 Recent Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rewards.map((reward, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition cursor-pointer"
                onClick={() => reward.status === 'earned' && toggleEquip(idx)}
              >
                <div className={`w-14 h-14 flex items-center justify-center rounded-full text-2xl text-white bg-gradient-to-br ${reward.bg}`}>{reward.icon}</div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold">{reward.name}</div>
                  <div className="text-sm text-gray-300">{reward.desc}</div>
                </div>
                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  reward.status === 'earned'
                    ? isEquipped[idx]
                      ? 'bg-green-300 text-green-900'
                      : 'bg-green-100 text-green-800'
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {reward.status === 'earned'
                    ? isEquipped[idx]
                      ? 'Equipped'
                      : 'Earned'
                    : reward.requirement || 'Locked'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">🏅 Badge Collection</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl text-center bg-gray-800 hover:bg-gray-700 transition shadow-md"
              >
                <div className={`w-14 h-14 mx-auto rounded-full text-2xl flex items-center justify-center mb-3 ${
                  badge.bg ? `bg-gradient-to-br ${badge.bg} text-white` : 'border-2 border-dashed border-gray-500 text-gray-400'
                }`}>
                  {badge.icon}
                </div>
                <div className="font-bold text-white">{badge.name}</div>
                <div className="text-sm text-gray-300 mt-1">{badge.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
    </>
  );
};

export default AvatarRewards;
