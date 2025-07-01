import React, { useState, useEffect, useMemo } from 'react';

// Main App component that renders the Feedback component
export default function App() {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-2 sm:p-4 font-sans">
      <Feedback />
    </div>
  );
}

function Feedback() {
  // Sample feedback data - this would typically come from an API or database
  const initialFeedbackData = [
    {
      id: 1,
      name: "Sarah Johnson",
      type: "volunteer",
      rating: 5,
      text: "Great organization and impact! The cleanup events are well-organized and make a real difference in our community.",
      date: "2025-06-25",
      avatar: "S"
    },
    {
      id: 2,
      name: "Mike Chen",
      type: "organizer",
      rating: 4,
      text: "Excellent platform for coordinating environmental activities. The volunteer management system works smoothly.",
      date: "2025-06-23",
      avatar: "M"
    },
    {
      id: 3,
      name: "Emma Davis",
      type: "volunteer",
      rating: 5,
      text: "Love participating in beach cleanups! The team is passionate and the events are always well-planned.",
      date: "2025-06-20",
      avatar: "E"
    },
    {
      id: 4,
      name: "Raj Patel",
      type: "organizer",
      rating: 4,
      text: "Good coordination between organizers and volunteers. The impact reporting features are very helpful.",
      date: "2025-06-18",
      avatar: "R"
    },
    {
      id: 5,
      name: "Anita Sharma",
      type: "volunteer",
      rating: 5,
      text: "Amazing experience volunteering with EcoAction. Every cleanup feels meaningful and impactful.",
      date: "2025-06-15",
      avatar: "A"
    },
    {
      id: 6,
      name: "David Wilson",
      type: "organizer",
      rating: 3,
      text: "The platform is functional but could use some improvements in the equipment tracking system.",
      date: "2025-06-12",
      avatar: "D"
    },
    {
      id: 7,
      name: "Lisa Martinez",
      type: "volunteer",
      rating: 5,
      text: "Outstanding environmental work! The community impact is visible and inspiring.",
      date: "2025-06-10",
      avatar: "L"
    },
    {
      id: 8,
      name: "James Thompson",
      type: "organizer",
      rating: 4,
      text: "Efficient organization and great volunteer engagement. The weather forecast integration is particularly useful.",
      date: "2025-06-08",
      avatar: "J"
    },
    {
      id: 9,
      name: "Olivia Green",
      type: "volunteer",
      rating: 4,
      text: "A very fulfilling experience. The staff is supportive and the mission is clear.",
      date: "2025-06-05",
      avatar: "O"
    },
    {
      id: 10,
      name: "Daniel Lee",
      type: "organizer",
      rating: 5,
      text: "Seamless event creation and management. Highly recommend for environmental initiatives.",
      date: "2025-06-01",
      avatar: "D"
    }
  ];

  // State variables for filters, sorting, pagination, and data
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  // Removed pagination - showing all items in one scrollable list

  // Function to generate star icons based on rating
  const generateStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Function to format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Memoized filtered and sorted data to prevent unnecessary re-calculations
  const filteredAndSortedData = useMemo(() => {
    let tempFilteredData = [...initialFeedbackData];

    // Apply user type filter
    if (userTypeFilter !== 'all') {
      tempFilteredData = tempFilteredData.filter(feedback => feedback.type === userTypeFilter);
    }

    // Apply rating filter
    if (ratingFilter !== 'all') {
      tempFilteredData = tempFilteredData.filter(feedback => feedback.rating === parseInt(ratingFilter));
    }

    // Apply search term filter
    if (searchTerm) {
      tempFilteredData = tempFilteredData.filter(feedback =>
        feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    tempFilteredData.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return tempFilteredData;
  }, [initialFeedbackData, userTypeFilter, ratingFilter, sortBy, searchTerm]);

  // No pagination needed - show all filtered data

  // Calculate overall rating, total feedback, and pending responses for stats
  const overallRating = useMemo(() => {
    if (initialFeedbackData.length === 0) return "N/A";
    const totalStars = initialFeedbackData.reduce((sum, feedback) => sum + feedback.rating, 0);
    return (totalStars / initialFeedbackData.length).toFixed(1) + "/5";
  }, [initialFeedbackData]);

  const totalFeedbackReceived = initialFeedbackData.length;
  // Placeholder for pending responses, as this data isn't in initialFeedbackData
  const pendingResponses = 12;

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-white bg-opacity-95 backdrop-blur-md p-3 rounded-xl shadow-lg text-center transition-transform duration-300 hover:translate-y-[-2px]">
          <div className="text-2xl font-bold text-cyan-600 mb-1">{overallRating}</div>
          <div className="text-gray-600 text-sm font-medium">Overall Rating</div>
        </div>
        <div className="bg-white bg-opacity-95 backdrop-blur-md p-3 rounded-xl shadow-lg text-center transition-transform duration-300 hover:translate-y-[-2px]">
          <div className="text-2xl font-bold text-cyan-600 mb-1">{totalFeedbackReceived}</div>
          <div className="text-gray-600 text-sm font-medium">Total Feedback</div>
        </div>
        <div className="bg-white bg-opacity-95 backdrop-blur-md p-3 rounded-xl shadow-lg text-center transition-transform duration-300 hover:translate-y-[-2px]">
          <div className="text-2xl font-bold text-cyan-600 mb-1">{pendingResponses}</div>
          <div className="text-gray-600 text-sm font-medium">Pending Responses</div>
        </div>
      </div>

      {/* Feedback Section - Flexible height */}
      <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl p-4 shadow-lg flex-1 flex flex-col min-h-0">
        {/* Header with filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h3 className="text-lg font-semibold text-gray-800">All Feedback</h3>
          <div className="flex flex-wrap gap-2 items-center text-sm">
            {/* User Type Filter */}
            <select
              className="p-2 border border-gray-200 rounded-md bg-white text-gray-800 font-medium cursor-pointer focus:outline-none focus:border-cyan-500 transition-all duration-300"
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
            >
              <option value="all">All Users</option>
              <option value="volunteer">Volunteers</option>
              <option value="organizer">Organizers</option>
            </select>
            {/* Rating Filter */}
            <select
              className="p-2 border border-gray-200 rounded-md bg-white text-gray-800 font-medium cursor-pointer focus:outline-none focus:border-cyan-500 transition-all duration-300"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            {/* Sort By Filter */}
            <select
              className="p-2 border border-gray-200 rounded-md bg-white text-gray-800 font-medium cursor-pointer focus:outline-none focus:border-cyan-500 transition-all duration-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </select>
            {/* Search Box */}
            <input
              type="text"
              className="p-2 border border-gray-200 rounded-md bg-white w-full sm:w-40 text-sm focus:outline-none focus:border-cyan-500 transition-all duration-300"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Feedback List - All items in scrollable area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredAndSortedData.length > 0 ? (
            <div className="space-y-3 pr-2">
              {filteredAndSortedData.map(feedback => (
                <div key={feedback.id} className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 transition-all duration-300 hover:bg-cyan-100 hover:border-cyan-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white font-bold text-sm">
                        {feedback.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{feedback.name}</h4>
                        <span className="text-xs text-cyan-600 bg-cyan-100 px-2 py-0.5 rounded-full font-medium">
                          {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-yellow-500 text-sm">{generateStars(feedback.rating)}</div>
                      <div className="text-xs text-gray-500">{formatDate(feedback.date)}</div>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed italic">"{feedback.text}"</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-8">No feedback found matching your criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
}