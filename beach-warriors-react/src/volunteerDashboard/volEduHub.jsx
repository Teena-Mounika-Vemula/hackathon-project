import React, { useState } from 'react';
import Sidebar from './Sidebar';

const EducationHub = ({ navigateTo }) => {
    const [activeNavItem, setActiveNavItem] = useState('eduhub');

    const handleNavItemClick = (item) => {
    setActiveNavItem(item);
    navigateTo(item);
  };

  const playVideo = () => {
    window.open('https://www.youtube.com/watch?v=1JvTP0z1kCY', '_blank');
  };

  const startCourse = () => {
    window.open('https://www.oceanconservancy.org/trash-free-seas/international-coastal-cleanup/', '_blank');
  };

  const playContent = (title, link) => {
    window.open(link, '_blank');
  };

  const readArticle = (title, link) => {
    window.open(link, '_blank');
  };

  const enrollCourse = (title) => {
    alert(`Enrolling in: ${title}`);
  };

  const joinSeminar = (title) => {
    alert(`Joining seminar: ${title}`);
  };

  const cardSections = [
    {
      title: 'Video Lectures',
      icon: '🎥',
      bg: 'bg-gradient-to-tr from-red-500 to-red-700',
      content: [
        { title: 'Ocean Pollution: Causes & Solutions', meta: ['⏱️ 45 min', '👥 12.5K views', '⭐ 4.8/5'], link: 'https://www.youtube.com/watch?v=1JvTP0z1kCY' },
        { title: 'Microplastics: The Hidden Threat', meta: ['⏱️ 32 min', '👥 8.3K views', '⭐ 4.9/5'], link: 'https://www.youtube.com/watch?v=YJzEJp-T3r4' },
        { title: 'Coastal Ecosystem Protection', meta: ['⏱️ 38 min', '👥 9.7K views', '⭐ 4.7/5'], link: 'https://www.youtube.com/watch?v=FK3dav4bA4s' },
        { title: 'Wildlife Rescue Techniques', meta: ['⏱️ 52 min', '👥 15.2K views', '⭐ 4.9/5'], link: 'https://www.youtube.com/watch?v=F1Wi_GJ5g1g' },
      ],
      handler: (title, link) => playContent(title, link),
    },
    {
      title: 'Research Articles',
      icon: '📚',
      bg: 'bg-gradient-to-tr from-blue-500 to-blue-700',
      content: [
        { title: 'Impact of Beach Cleanups on Marine Life', meta: ['📖 12 min read', '🔬 Peer-reviewed', '📅 2024'], link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6345840/' },
        { title: 'Sustainable Waste Management Strategies', meta: ['📖 18 min read', '🔬 Peer-reviewed', '📅 2024'], link: 'https://www.sciencedirect.com/science/article/abs/pii/S0959652620356169' },
        { title: 'Community Engagement in Environmental Conservation', meta: ['📖 15 min read', '🔬 Peer-reviewed', '📅 2023'], link: 'https://www.mdpi.com/2071-1050/12/14/5763' },
        { title: 'Climate Change and Coastal Erosion', meta: ['📖 22 min read', '🔬 Peer-reviewed', '📅 2024'], link: 'https://www.nature.com/articles/s41467-019-12808-z' },
      ],
      handler: (title, link) => readArticle(title, link),
    },
    {
      title: 'Certification Courses',
      icon: '🎯',
      bg: 'bg-gradient-to-tr from-yellow-500 to-yellow-700',
      content: [
        { title: 'Certified Beach Cleanup Leader', meta: ['🏆 Certificate', '⏱️ 8 hours', '👥 2.1K enrolled'] },
        { title: 'Marine Conservation Specialist', meta: ['🏆 Certificate', '⏱️ 12 hours', '👥 1.8K enrolled'] },
        { title: 'Environmental Safety Coordinator', meta: ['🏆 Certificate', '⏱️ 6 hours', '👥 3.2K enrolled'] },
        { title: 'Waste Reduction Advocate', meta: ['🏆 Certificate', '⏱️ 10 hours', '👥 2.7K enrolled'] },
      ],
      handler: enrollCourse,
    },
    {
      title: 'Live Seminars',
      icon: '🎙️',
      bg: 'bg-gradient-to-tr from-violet-500 to-violet-700',
      content: [
        { title: 'Advanced Debris Sorting Techniques', meta: ['📅 July 5, 2025', '🕐 2:00 PM IST', '👤 Dr. Sarah Chen'] },
        { title: 'Community Mobilization Strategies', meta: ['📅 July 8, 2025', '🕐 4:00 PM IST', '👤 Prof. Michael Rodriguez'] },
        { title: 'Technology in Environmental Monitoring', meta: ['📅 July 12, 2025', '🕐 11:00 AM IST', '👤 Dr. Priya Sharma'] },
        { title: 'Policy and Legislation Update', meta: ['📅 July 15, 2025', '🕐 3:30 PM IST', '👤 Adv. Rakesh Patel'] },
      ],
      handler: joinSeminar,
    },
  ];

  return (
    <div className="flex min-h-screen text-slate-100 font-sans bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* Sidebar */}
      <Sidebar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />
      {/* <div className="w-72 bg-[#1e293b] border-r border-[#334155] p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center font-bold">
            🌊
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-500">EcoWarrior</div>
            <div className="text-xs text-slate-500">COMMAND CENTER</div>
          </div>
        </div>

        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-[#334155] hover:text-white">
              <div className="w-5 h-5 bg-blue-500 text-xs rounded flex items-center justify-center">📊</div>
              Impact Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-[#334155] hover:text-white">
              <div className="w-5 h-5 bg-purple-600 text-xs rounded flex items-center justify-center">🏆</div>
              Avatar & Badges
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-[#334155] hover:text-white">
              <div className="w-5 h-5 bg-emerald-600 text-xs rounded flex items-center justify-center">🧹</div>
              Cleanup Events
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-[#334155] hover:text-white">
              <div className="w-5 h-5 bg-amber-500 text-xs rounded flex items-center justify-center">♻️</div>
              Waste Classification
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-[#334155] hover:text-white">
              <div className="w-5 h-5 bg-red-500 text-xs rounded flex items-center justify-center">📈</div>
              Points & Stats
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-400 text-white">
              <div className="w-5 h-5 rounded text-xs flex items-center justify-center">🎓</div>
              Education Hub
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-[#334155] hover:text-white">
              <div className="w-5 h-5 bg-slate-500 text-xs rounded flex items-center justify-center">💬</div>
              Feedback
            </a>
          </li>
        </ul>

        <div className="mt-10 p-4 text-center bg-[#334155] rounded-lg">
          <div className="text-emerald-500 font-semibold">Level 15</div>
          <div className="text-xs text-slate-400">1,650 / 2,500 XP</div>
        </div>
      </div> */}
        <div className="pl-[280px] p-8">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-emerald-400 mb-1">🎓 Education Hub</h1>
          <p className="text-slate-400">Enhance your environmental knowledge and cleanup skills with our comprehensive learning resources</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-xl text-white font-medium mb-8">
          🌟 <strong>KNOWLEDGE MISSION:</strong> Complete 3 educational modules this week to unlock the "Eco-Scholar" badge!
        </div>

        <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-2xl p-6 mb-8 border border-[#334155]">
          <div className="text-emerald-500 font-semibold text-lg mb-4">🎬 Featured Video Course</div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 h-52 bg-slate-700 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-600">
              <div className="text-center">
                <div className="text-4xl mb-2">▶️</div>
                <div>Beach Cleanup Masterclass</div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-white font-semibold text-lg mb-2">Marine Debris Identification & Safe Removal</h3>
              <p className="text-slate-400 mb-4">Learn to identify different types of marine debris, understand their environmental impact, and master safe removal techniques. This comprehensive course covers everything from microplastics to large debris items.</p>
              <button className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md">
                Start Course ▶️
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cardSections.map(({ title, icon, bg, content, handler }) => (
            <div
              key={title}
              className="bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white ${bg}`}>
                  {icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
              </div>
              <ul>
                {content.map(({ title, meta, link }) => (
                  <li
                    key={title}
                    onClick={() => handler(title, link)}
                    className="border-b border-slate-600 py-3 px-2 cursor-pointer hover:bg-emerald-900/10 rounded-md"
                  >
                    <div className="text-slate-200 font-medium mb-1">{title}</div>
                    <div className="text-xs text-slate-400 flex gap-4 flex-wrap">
                      {meta.map((m, i) => (
                        <span key={i}>{m}</span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-tr from-yellow-300 to-yellow-500 text-slate-900 p-6 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold mb-3">🛡️ Essential Safety Guidelines for Beach Cleanup</h3>
          <ul className="list-none space-y-2 text-sm">
            {[
              'Wear protective gear: Gloves, closed-toe shoes, and sun protection are mandatory',
              'Stay hydrated: Bring plenty of water and take regular breaks',
              'Handle sharp objects carefully: Use grabbers for glass, metal, and needles',
              'Work in pairs: Never clean alone, especially in remote areas',
              "Report hazardous materials: Don't touch chemicals, oil, or medical waste",
              'Check tide schedules: Be aware of changing water levels and weather conditions',
            ].map((tip, i) => (
              <li key={i} className="pl-5 relative">
                <span className="absolute left-0 top-0">⚠️</span> {tip}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EducationHub;
