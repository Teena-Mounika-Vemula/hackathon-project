import React, { useState, useEffect, useMemo } from 'react';

// Main App component that renders the Feedback component
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-cyan-700 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  // Get data for the current page
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Effect to reset page to 1 when filters or sort order change
  useEffect(() => {
    setCurrentPage(1);
  }, [userTypeFilter, ratingFilter, sortBy, searchTerm]);

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
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Main content area */}
      <div className="main-content flex-1">
        {/* Header section for Feedback Management */}
        <div className="bg-white bg-opacity-95 backdrop-blur-md p-6 sm:p-8 rounded-2xl mb-6 shadow-xl flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Feedback Management</h2>
          {/* Notification Icon (retained from original design) */}
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-lg cursor-pointer">
            🔔
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">5</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white bg-opacity-95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transition-transform duration-300 hover:translate-y-[-5px]">
            <div className="text-4xl font-bold text-cyan-600 mb-2">{overallRating}</div>
            <div className="text-gray-600 text-base font-medium">Overall Rating from Volunteers</div>
          </div>
          <div className="bg-white bg-opacity-95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transition-transform duration-300 hover:translate-y-[-5px]">
            <div className="text-4xl font-bold text-cyan-600 mb-2">{totalFeedbackReceived}</div>
            <div className="text-gray-600 text-base font-medium">Total Feedback Received</div>
          </div>
          <div className="bg-white bg-opacity-95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transition-transform duration-300 hover:translate-y-[-5px]">
            <div className="text-4xl font-bold text-cyan-600 mb-2">{pendingResponses}</div>
            <div className="text-gray-600 text-base font-medium">Pending Responses</div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">All Feedback</h3>
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
              {/* User Type Filter */}
              <select
                className="p-2 sm:p-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 font-medium cursor-pointer focus:outline-none focus:border-cyan-500 transition-all duration-300"
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="volunteer">Volunteers Only</option>
                <option value="organizer">Organizers Only</option>
              </select>
              {/* Rating Filter */}
              <select
                className="p-2 sm:p-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 font-medium cursor-pointer focus:outline-none focus:border-cyan-500 transition-all duration-300"
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
                className="p-2 sm:p-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 font-medium cursor-pointer focus:outline-none focus:border-cyan-500 transition-all duration-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
              {/* Search Box */}
              <input
                type="text"
                className="p-2 sm:p-3 border-2 border-gray-200 rounded-lg bg-white w-full sm:w-60 text-sm focus:outline-none focus:border-cyan-500 transition-all duration-300"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Feedback List */}
          <div className="flex flex-col gap-5">
            {paginatedData.length > 0 ? (
              paginatedData.map(feedback => (
                <div key={feedback.id} className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 transition-all duration-300 hover:bg-cyan-100 hover:border-cyan-300 hover:translate-y-[-2px]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white font-bold text-lg">
                        {feedback.avatar}
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg text-gray-800 font-semibold">{feedback.name}</h4>
                        <span className="text-xs text-cyan-600 bg-cyan-100 px-2.5 py-1 rounded-full font-medium">
                          {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-yellow-500 text-xl">{generateStars(feedback.rating)}</div>
                      <div className="text-xs text-gray-500">{formatDate(feedback.date)}</div>
                    </div>
                  </div>
                  <div className="text-gray-700 leading-relaxed italic">"{feedback.text}"</div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 py-10">No feedback found matching your criteria.</div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8">
            <button
              className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 bg-white rounded-md cursor-pointer transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 rounded-md cursor-pointer transition-all duration-300 ${currentPage === i + 1 ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white text-gray-800 hover:bg-cyan-100'}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 bg-white rounded-md cursor-pointer transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
