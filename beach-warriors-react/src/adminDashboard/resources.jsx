import React, { useState, useCallback } from 'react';

// --- Reusable Icon Components ---
const BellIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-slate-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5-5-5h5v-5a3 3 0 10-6 0v5" />
    </svg>
);

const PlusIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
    </svg>
);

const ResetIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
    </svg>
);

const LoadingSpinner = () => (
     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
);

// --- Form Components ---
const FormSection = ({ title, icon, children }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center text-lg">{icon}</span>
            {title}
        </h3>
        {children}
    </div>
);

const FormGroup = ({ label, htmlFor, children }) => (
    <div className="mb-6">
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
        {children}
    </div>
);

const FileUpload = ({ selectedFile, onFileSelect, onFileRemove }) => {
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-cyan-600', 'bg-cyan-50');
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-cyan-600', 'bg-cyan-50');
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-cyan-600', 'bg-cyan-50');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    }, [onFileSelect]);
    
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    if (selectedFile) {
        return (
            <div className="bg-green-100 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-md flex items-center justify-center text-xl">📄</div>
                    <div>
                        <h4 className="text-sm font-semibold text-green-800">{selectedFile.name}</h4>
                        <p className="text-xs text-green-700">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                </div>
                <button type="button" onClick={onFileRemove} className="text-red-600 hover:bg-red-100 p-1 rounded-full text-2xl">×</button>
            </div>
        );
    }

    return (
        <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-white cursor-pointer transition-all duration-200"
            onClick={() => document.getElementById('fileInput').click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="w-12 h-12 bg-slate-200 text-slate-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">📁</div>
            <p className="font-semibold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-sm text-slate-500">PDF, DOC, JPG, PNG, MP4 (Max 50MB)</p>
            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov" />
        </div>
    );
};

const CATEGORIES = [
    { id: 'beach-cleanup', name: 'Beach Cleanup' },
    { id: 'waste-sorting', name: 'Waste Sorting' },
    { id: 'safety', name: 'Safety Guidelines' },
    { id: 'marine-life', name: 'Marine Life Protection' },
    { id: 'recycling', name: 'Recycling' },
    { id: 'community', name: 'Community Engagement' },
];

// --- Main Page Component ---
const AddResourcesPage = () => {
    const [resources, setResources] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        description: '',
        audience: ''
    });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const toggleCategory = (categoryId) => {
        setSelectedCategories(prev => 
            prev.includes(categoryId) 
            ? prev.filter(id => id !== categoryId) 
            : [...prev, categoryId]
        );
    };
    
    const handleFileSelect = (file) => setSelectedFile(file);
    const handleFileRemove = () => setSelectedFile(null);

    const resetForm = () => {
        setFormData({ title: '', type: '', description: '', audience: '' });
        setSelectedCategories([]);
        setSelectedFile(null);
        setShowSuccess(false);
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);

    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);

        // Add the new resource to the list
        setResources(prev => [
            ...prev,
            {
                ...formData,
                categories: selectedCategories,
                file: selectedFile,
                id: Date.now()
            }
        ]);

        // Auto-hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);

        // Optional: scroll to top to see message
        document.querySelector('.main-content-area')?.scrollTo({ top: 0, behavior: 'smooth' });

        // Reset form fields
        setFormData({ title: '', type: '', description: '', audience: '' });
        setSelectedCategories([]);
        setSelectedFile(null);
    }, 2000);
};


    return (
        <div className="flex-1 bg-slate-100 overflow-y-auto main-content-area">

            {/* Main content area */}
            <main className="p-4 md:p-5">
                <div className="bg-white p-6 md:p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Add Learning Resources</h2>
                    <p className="text-slate-500 mb-8">Create educational content to help volunteers learn about environmental conservation.</p>

                    {showSuccess && (
                        <div className="bg-green-100 border border-green-200 text-green-800 rounded-xl p-4 mb-6 flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                            <strong>Success!</strong> Learning resource has been added.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                        <FormSection title="Basic Information" icon="📚">
                            <FormGroup label="Resource Title" htmlFor="title">
                                <input type="text" id="title" value={formData.title} onChange={handleInputChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" placeholder="e.g., Guide to Safe Beach Cleaning" required />
                            </FormGroup>
                            <FormGroup label="Resource Type" htmlFor="type">
                                <select id="type" value={formData.type} onChange={handleInputChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white" required>
                                    <option value="">Select a type...</option>
                                    <option value="video">Video Tutorial</option>
                                    <option value="article">Article</option>
                                    <option value="infographic">Infographic</option>
                                    <option value="document">Document/PDF</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="Resource Categories">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {CATEGORIES.map(cat => (
                                        <button type="button" key={cat.id} onClick={() => toggleCategory(cat.id)} className={`p-3 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategories.includes(cat.id) ? 'bg-cyan-600 text-white' : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'}`}>
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </FormGroup>
                        </FormSection>

                        <FormSection title="Content Details" icon="📝">
                            <FormGroup label="Description" htmlFor="description">
                                <textarea id="description" value={formData.description} onChange={handleInputChange} rows="5" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" placeholder="What will volunteers learn from this resource?" required></textarea>
                            </FormGroup>
                            <FormGroup label="Target Audience" htmlFor="audience">
                                <select id="audience" value={formData.audience} onChange={handleInputChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white" required>
                                    <option value="">Select an audience...</option>
                                    <option value="beginners">New Volunteers</option>
                                    <option value="experienced">Experienced Volunteers</option>
                                    <option value="organizers">Event Organizers</option>
                                    <option value="all">All Audiences</option>
                                </select>
                            </FormGroup>
                        </FormSection>

                        <FormSection title="Upload File" icon="📎">
                            <FileUpload selectedFile={selectedFile} onFileSelect={handleFileSelect} onFileRemove={handleFileRemove} />
                        </FormSection>

                        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
                            <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-all duration-200 disabled:bg-cyan-400 disabled:cursor-not-allowed transform hover:scale-105">
                                {isSubmitting ? <LoadingSpinner /> : <PlusIcon />}
                                {isSubmitting ? 'Adding Resource...' : 'Add Resource'}
                            </button>
                            <button type="button" onClick={resetForm} disabled={isSubmitting} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-300 transition-all duration-200">
                                <ResetIcon />
                                Reset Form
                            </button>
                        </div>
                    </form>
                    {resources.length > 0 && (
  <div className="mt-10">
    <h3 className="text-xl font-bold mb-4">Added Resources</h3>
    <ul className="space-y-4">
      {resources.map(resource => (
        <li key={resource.id} className="bg-white rounded-xl p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-lg">{resource.title}</div>
            <div className="text-slate-500 text-sm">{resource.type} &middot; {resource.audience}</div>
            <div className="text-slate-600 mt-1">{resource.description}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {resource.categories.map(cat => (
                <span key={cat} className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs">{cat}</span>
              ))}
            </div>
          </div>
          {resource.file && (
            <div className="mt-4 md:mt-0 md:ml-6 text-slate-500 text-sm">
              <span className="font-medium">File:</span> {resource.file.name}
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
)}

                </div>
            </main>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    return (
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 min-h-screen font-sans text-slate-800">
            <div className="flex flex-col lg:flex-row w-full">
                <AddResourcesPage />
            </div>
        </div>
    );
}
