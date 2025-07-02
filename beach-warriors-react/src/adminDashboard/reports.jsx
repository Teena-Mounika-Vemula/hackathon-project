import React, { useState, useEffect, useMemo } from 'react';

// --- Initial Data ---
const initialReportsData = [
    { id: 1, title: 'Q2 2025 Cleanup Impact', date: '2025-06-25', type: 'quarterly', status: 'published' },
    { id: 2, title: 'Marina Beach Project', date: '2025-06-20', type: 'project', status: 'published' },
    { id: 3, title: 'Monthly Volunteer Stats', date: '2025-06-28', type: 'monthly', status: 'draft' },
    { id: 4, title: 'Earth Day Beach Cleanup Event', date: '2025-06-15', type: 'event', status: 'published' },
    { id: 5, title: 'World Ocean Day Campaign', date: '2025-06-10', type: 'event', status: 'published' },
    { id: 6, title: 'Coastal Restoration Initiative', date: '2025-06-05', type: 'project', status: 'draft' },
    { id: 7, title: 'Community Awareness Drive', date: '2025-06-01', type: 'event', status: 'published' },
];

// --- Reusable Icon Components ---
const BellIcon = () => (
    <div className="relative">
        <svg className="w-6 h-6 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white border-2 border-white">5</span>
    </div>
);

// --- Badge Components ---
const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
    if (status === 'published') {
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Published</span>;
    }
    return <span className={`${baseClasses} bg-amber-100 text-amber-800`}>Draft</span>;
};

const TypeBadge = ({ type }) => {
    const baseClasses = "px-2 py-1 rounded-md text-xs font-medium";
    const typeStyles = {
        quarterly: 'bg-violet-100 text-violet-800',
        project: 'bg-blue-100 text-blue-800',
        monthly: 'bg-red-100 text-red-800',
        event: 'bg-green-100 text-green-800',
    };
    return <span className={`${baseClasses} ${typeStyles[type] || ''}`}>{type}</span>;
};

// --- Main Page Component ---
const ReportsPage = () => {
    const [activeReport, setActiveReport] = useState(null);
const [isEditMode, setIsEditMode] = useState(false);
const [showModal, setShowModal] = useState(false);


    const [reports, setReports] = useState(initialReportsData);
    const [selectedReportIds, setSelectedReportIds] = useState([]);
    const [filters, setFilters] = useState({ type: '', status: '' });
    const [sortBy, setSortBy] = useState('date-desc');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState('view'); // 'view' or 'edit'
    const [currentReport, setCurrentReport] = useState(null);

    const [formData, setFormData] = useState({
  title: '',
  date: '',
  type: '',
  status: '',
  content: '',
});

const handleView = (report) => {
    setActiveReport(report);
    setFormData({
      title: report.title,
      date: report.date,
      content: report.content,
    });
    setIsEditMode(false);
    setShowModal(true);
  };

    const handleFilterChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const filteredAndSortedReports = useMemo(() => {
        return reports
            .filter(report => {
                const typeMatch = !filters.type || report.type === filters.type;
                const statusMatch = !filters.status || report.status === filters.status;
                return typeMatch && statusMatch;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'date-desc': return new Date(b.date) - new Date(a.date);
                    case 'date-asc': return new Date(a.date) - new Date(b.date);
                    case 'name-asc': return a.title.localeCompare(b.title);
                    case 'name-desc': return b.title.localeCompare(a.title);
                    default: return 0;
                }
            });
    }, [reports, filters, sortBy]);

    const handleSave = (status) => {
  const updatedReport = {
    ...activeReport,
    ...formData,
    status,
  };

  const updatedReports = reports.map((report) =>
    report.id === updatedReport.id ? updatedReport : report
  );

  setReports(updatedReports);
  setShowModal(false);
  setActiveReport(null);
};


    const handleSelect = (reportId) => {
        setSelectedReportIds(prev =>
            prev.includes(reportId)
                ? prev.filter(id => id !== reportId)
                : [...prev, reportId]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedReportIds(filteredAndSortedReports.map(r => r.id));
        } else {
            setSelectedReportIds([]);
        }
    };

    const handleExport = () => {
        if (selectedReportIds.length === 0) return;
        const selectedTitles = reports
            .filter(r => selectedReportIds.includes(r.id))
            .map(r => r.title);
        alert(`Exporting ${selectedReportIds.length} reports:\n${selectedTitles.join('\n')}`);
    };

    return (
        <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-y-auto">

            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4">
                    <button className="bg-sky-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:bg-sky-600 transition-all transform hover:-translate-y-0.5">
                        Generate New Report
                    </button>
                    <button onClick={handleExport} disabled={selectedReportIds.length === 0} className="bg-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        Export Selected
                    </button>
                </div>
                <div className="flex gap-2">
                    <select name="type" onChange={handleFilterChange} className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm">
                        <option value="">All Types</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="monthly">Monthly</option>
                        <option value="project">Project</option>
                        <option value="event">Event</option>
                    </select>
                    <select name="status" onChange={handleFilterChange} className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm">
                        <option value="">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm">
                        <option value="date-desc">Latest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="name-asc">Name A-Z</option>
                        <option value="name-desc">Name Z-A</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`transition-all duration-300 ${selectedReportIds.length > 0 ? 'h-auto opacity-100 visible' : 'h-0 opacity-0 invisible'} overflow-hidden`}>
                <div className="bg-sky-50 border-b border-sky-200 p-4 flex items-center gap-4">
                    <span className="font-semibold text-sky-800">{selectedReportIds.length} reports selected</span>
                    <button onClick={handleExport} className="bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-sky-600">Export</button>
                    <button className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-md hover:bg-slate-300">Delete</button>
                </div>
            </div>

                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-4 w-12 text-left">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                    onChange={handleSelectAll}
                                    checked={selectedReportIds.length > 0 && selectedReportIds.length === filteredAndSortedReports.length}
                                    indeterminate={selectedReportIds.length > 0 && selectedReportIds.length < filteredAndSortedReports.length}
                                />
                            </th>
                            <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Report Title</th>
                            <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Created</th>
                            <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredAndSortedReports.map(report => (
                            <tr key={report.id} className={`hover:bg-slate-50 ${selectedReportIds.includes(report.id) ? 'bg-sky-50' : ''}`}>
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                        checked={selectedReportIds.includes(report.id)}
                                        onChange={() => handleSelect(report.id)}
                                    />
                                </td>
                                <td className="p-4 font-medium text-slate-800">{report.title}</td>
                                <td className="p-4 text-slate-600">{report.date}</td>
                                <td className="p-4"><TypeBadge type={report.type} /></td>
                                <td className="p-4"><StatusBadge status={report.status} /></td>
                                <td className="p-4">
    <td className="py-2 px-4 border-b">
  {report.status === 'published' ? (
    <button
      className="bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-sky-600"
      onClick={() => handleView(report)}
    >
      View
    </button>
  ) : (
    <button
      className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-amber-600"
       onClick={() => {
    setActiveReport(report);
    setIsEditMode(true);
    setShowModal(true);
    setFormData({
      title: report.title,
      date: report.date,
      type: report.type,
      status: report.status,
      content: report.content,
    });
  }}
  variant="outline"
>
      Edit
    </button>
  )}
</td>

</td>

                            </tr>
                        ))}
                       

                    </tbody>
                </table>


            </div>
            {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-lg relative">
      <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Report' : 'Report Details'}</h2>
      
      <div className="mb-4">
        <label className="block font-medium">Title:</label>
        {isEditMode ? (
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-slate-300 rounded-lg p-2"
          />
        ) : (
          <p>{formData.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Date:</label>
        {isEditMode ? (
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border border-slate-300 rounded-lg p-2"
          />
        ) : (
          <p>{formData.date}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Content:</label>
        {isEditMode ? (
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full border border-slate-300 rounded-lg p-2"
          />
        ) : (
          <p>{formData.content || 'No content available.'}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Close
        </button>
        {isEditMode ? (
          <>
            <button
              onClick={() => handleSave('draft')}
              className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave('published')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Publish
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  </div>
)}

        </div>
    );
};

// --- Main App Component ---
export default function App() {
    return (
        <div className="bg-gradient-to-br from-sky-400 to-indigo-500 min-h-screen font-sans text-slate-800">
            <div className="flex flex-col lg:flex-row h-screen">
                <ReportsPage />
            </div>
        </div>
    );
}
