import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar'; // adjust the path if Sidebar is located elsewhere
import { Camera, Download, Share2, Sparkles, MapPin, Calendar, RefreshCw, Check, X, Heart, Leaf, Waves, Sun, Target, Zap, Trophy, Star } from 'lucide-react';

const ImpactCam = ({ navigateTo }) => {  // ✅ Accept navigateTo as prop
  const [activeNavItem, setActiveNavItem] = useState('impactcam'); // ✅ Keep consistent naming
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [isCapturing, setIsCapturing] = useState(false);
  const [aiCaption, setAiCaption] = useState('');
  const [location, setLocation] = useState('Marina Beach, Chennai');
  const [event, setEvent] = useState('Weekend Beach Cleanup');
  const [showSuccess, setShowSuccess] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
    if (navigateTo) {  // ✅ Check if navigateTo exists before calling
      navigateTo(item);
    }
  };

  const filters = [
    { id: 'none', name: 'Original', icon: '📷', badge: 'Classic' },
    { id: 'before-after', name: 'Before/After', icon: '🔄', badge: 'Epic' },
    { id: 'cleanup-badge', name: 'Cleanup Hero', icon: '🦸', badge: 'Legendary' },
    { id: 'eco-warrior', name: 'Eco Warrior', icon: '🌱', badge: 'Master' },
    { id: 'ocean-guardian', name: 'Ocean Guardian', icon: '🌊', badge: 'Elite' },
    { id: 'earth-protector', name: 'Earth Protector', icon: '🌍', badge: 'Mythic' }
  ];

  const sampleCaptions = [
    "🌊 MISSION COMPLETE! Another successful cleanup at Marina Beach! Level up your environmental warrior status! #EcoWarrior #BeachCleanup +50 XP",
    "🦸‍♀️ LEGENDARY ACHIEVEMENT UNLOCKED! Proud cleanup crew member reporting for duty! Every piece counts in our battle for cleaner oceans! #CleanupHero #OceanDefender",
    "🌱 TRANSFORMATION POWER ACTIVATED! From polluted to pristine - witness the magic when warriors unite! #EnvironmentalBattle #EcoTransformation",
    "🌍 COMBAT POINTS EARNED! Small actions create MASSIVE impact! Today's mission reminded me that change starts with warriors like us! #PlanetDefender #EcoMission"
  ];

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageData);
    generateAICaption();
    
    setTimeout(() => setIsCapturing(false), 500);
  };

  const generateAICaption = () => {
    const randomCaption = sampleCaptions[Math.floor(Math.random() * sampleCaptions.length)];
    setTimeout(() => {
      setAiCaption(randomCaption);
    }, 1000);
  };

  const sharePhoto = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAiCaption('');
    setSelectedFilter('none');
  };

  const renderContent = () => {
    // ✅ Fixed: Check for 'impactcam' instead of 'impact-cam'
    if (activeNavItem === 'impactcam') {
      return (
        <div className="space-y-6">
          {/* Mission Alert */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">📸 IMPACT CAM MISSION: Share your cleanup moments! +100 XP bonus available!</div>
              </div>
            </div>
            <button className="text-white hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Camera Section */}
            <div className="xl:col-span-2">
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Impact Cam Studio</h2>
                        <p className="text-gray-400 text-sm">Capture your environmental victories</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={startCamera}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center space-x-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>ACTIVATE CAM</span>
                      </button>
                      {capturedImage && (
                        <button
                          onClick={retakePhoto}
                          className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center space-x-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>RETRY</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Camera View */}
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-6 border-2 border-slate-600">
                    {!capturedImage ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Capture Effect */}
                    {isCapturing && (
                      <div className="absolute inset-0 bg-green-400 opacity-60 animate-pulse" />
                    )}

                    {/* Gaming UI Overlay */}
                    <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500">
                      <Target className="w-4 h-4 inline mr-1" />
                      MISSION ACTIVE
                    </div>

                    {/* Watermark */}
                    <div className="absolute bottom-4 right-4 bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold border border-white border-opacity-30">
                      <Leaf className="w-4 h-4 inline mr-1" />
                      EcoWarrior
                    </div>
                  </div>

                  {/* Capture Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={capturePhoto}
                      disabled={!stream || isCapturing}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-110 border-4 border-white border-opacity-20"
                    >
                      <Camera className="w-10 h-10" />
                    </button>
                  </div>

                  <canvas ref={canvasRef} className="hidden" />
                </div>
              </div>
            </div>

            {/* Filters & AI Caption Section */}
            <div className="space-y-6">
              
              {/* Filters */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
                  Battle Filters
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`p-3 rounded-lg border-2 transition-all relative ${
                        selectedFilter === filter.id
                          ? 'border-green-400 bg-green-400 bg-opacity-10'
                          : 'border-slate-600 hover:border-slate-500 bg-slate-700'
                      }`}
                    >
                      <div className="text-2xl mb-1">{filter.icon}</div>
                      <div className="text-xs font-bold text-white">{filter.name}</div>
                      <div className={`absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        filter.badge === 'Legendary' ? 'bg-yellow-500 text-black' :
                        filter.badge === 'Epic' ? 'bg-purple-500 text-white' :
                        filter.badge === 'Master' ? 'bg-red-500 text-white' :
                        filter.badge === 'Elite' ? 'bg-blue-500 text-white' :
                        filter.badge === 'Mythic' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {filter.badge}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Caption */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-purple-400" />
                  AI Caption Generator
                </h3>
                
                {aiCaption ? (
                  <div className="space-y-4">
                    <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-purple-400">
                      <p className="text-gray-100 text-sm leading-relaxed">{aiCaption}</p>
                    </div>
                    <button
                      onClick={generateAICaption}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>GENERATE NEW</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                    <p className="text-sm">Capture a photo to unlock AI-powered captions</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {capturedImage && (
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                    Share Your Victory
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={sharePhoto}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center space-x-2"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>SHARE VICTORY (+25 XP)</span>
                    </button>
                    <button className="w-full bg-slate-600 hover:bg-slate-500 text-white py-3 px-4 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>DOWNLOAD IMAGE</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Battle Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-blue-500 bg-opacity-20 rounded-full p-3">
                  <Camera className="w-6 h-6 text-blue-400" />
                </div>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">Hero</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">2,847</div>
              <div className="text-gray-400 text-sm">Battle Shots Captured</div>
              <div className="text-green-400 text-xs mt-1">+127 this week</div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-500 bg-opacity-20 rounded-full p-3">
                  <Share2 className="w-6 h-6 text-green-400" />
                </div>
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">Elite</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">1,523</div>
              <div className="text-gray-400 text-sm">Victory Shares</div>
              <div className="text-green-400 text-xs mt-1">+89 this week</div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-purple-500 bg-opacity-20 rounded-full p-3">
                  <Heart className="w-6 h-6 text-purple-400" />
                </div>
                <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">Epic</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">45.8K</div>
              <div className="text-gray-400 text-sm">Social Engagements</div>
              <div className="text-green-400 text-xs mt-1">+2.3K this week</div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-yellow-500 bg-opacity-20 rounded-full p-3">
                  <Waves className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-bold">Legendary</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">89%</div>
              <div className="text-gray-400 text-sm">Impact Amplification</div>
              <div className="text-green-400 text-xs mt-1">+5% this month</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-white mb-2">Feature Under Development</h2>
        <p className="text-gray-400">This section will be available soon!</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />
      <div className="pl-[280px] p-8">
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            { activeNavItem === 'impactcam' && (  /* ✅ Fixed: Check for 'impactcam' */
              <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  Impact Cam & AI Caption Studio
                </h1>
                <p className="text-gray-400">Transform your cleanup moments into viral environmental stories!</p>
              </div>
            )}
            
            {renderContent()}
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-slate-800 border border-slate-600 rounded-xl p-8 max-w-md mx-4 text-center">
              <div className="bg-green-500 bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">VICTORY SHARED! 🎉</h3>
              <p className="text-gray-300 mb-4">Your environmental battle story is now inspiring warriors across the digital realm!</p>
              <div className="bg-slate-700 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <span className="flex items-center text-red-400">
                    <Heart className="w-4 h-4 mr-1 fill-current" />
                    +127 likes
                  </span>
                  <span className="flex items-center text-blue-400">
                    <Share2 className="w-4 h-4 mr-1" />
                    +23 shares
                  </span>
                  <span className="flex items-center text-green-400">
                    <Zap className="w-4 h-4 mr-1" />
                    +25 XP
                  </span>
                </div>
              </div>
              <div className="text-yellow-400 font-bold">🏆 Achievement Unlocked: Social Impact Master!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpactCam;