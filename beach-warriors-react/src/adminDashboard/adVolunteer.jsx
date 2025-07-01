/*
 * File: adVolunteer.jsx
 * Description: The main React component for the volunteers and organizers dashboard.
 * It now uses Tailwind CSS for styling, consistent with analytics.jsx.
 */
import React, { useState, useMemo } from 'react';

// Data for the volunteers and organizers
const initialVolunteerData = [
    { id: 1, name: 'Sarah Johnson', role: 'Volunteer', email: 'sarah@email.com', phone: '+91 98765 43210', joinDate: '2025-06-15', experience: '6 months', events: 15, status: 'Active' },
    { id: 2, name: 'Mike Chen', role: 'Organizer', email: 'mike@email.com', phone: '+91 98765 43211', joinDate: '2025-05-20', experience: '2 years', events: 28, status: 'Active' },
    { id: 3, name: 'Emma Davis', role: 'Volunteer', email: 'emma@email.com', phone: '+91 98765 43212', joinDate: '2025-06-01', experience: '3 months', events: 8, status: 'Inactive' },
    { id: 4, name: 'Raj Patel', role: 'Volunteer', email: 'raj@email.com', phone: '+91 98765 43213', joinDate: '2025-06-10', experience: '4 months', events: 12, status: 'Active' },
    { id: 5, name: 'Anita Sharma', role: 'Organizer', email: 'anita@email.com', phone: '+91 98765 43214', joinDate: '2025-04-15', experience: '1.5 years', events: 35, status: 'Active' },
    { id: 6, name: 'David Kumar', role: 'Volunteer', email: 'david@email.com', phone: '+91 98765 43215', joinDate: '2025-06-25', experience: '2 months', events: 5, status: 'Pending' },
];

const AdVolunteer = () => {
    const [volunteerData, setVolunteerData] = useState(initialVolunteerData); // State to manage volunteer data
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [newOrganizer, setNewOrganizer] = useState({ // State for new organizer form data
        name: '',
        email: '',
        phone: '',
        experience: '',
    });
    const [formError, setFormError] = useState(''); // State for form error messages

    // Memoize the filtered data to avoid re-calculation on every render
    const filteredVolunteers = useMemo(() => {
        return volunteerData.filter(person => {
            const roleMatch = roleFilter === 'all' || person.role.toLowerCase() === roleFilter;
            const statusMatch = statusFilter === 'all' || person.status.toLowerCase() === statusFilter;
            return roleMatch && statusMatch;
        });
    }, [roleFilter, statusFilter, volunteerData]); // Add volunteerData to dependency array

    // Function to open the modal
    const openModal = () => {
        setShowModal(true);
        setFormError(''); // Clear any previous errors
        setNewOrganizer({ // Reset form fields
            name: '',
            email: '',
            phone: '',
            experience: '',
        });
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Handle input changes for the new organizer form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrganizer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle adding a new organizer
    const handleAddOrganizer = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Basic validation
        if (!newOrganizer.name || !newOrganizer.email || !newOrganizer.phone || !newOrganizer.experience) {
            setFormError('All fields are required.');
            return;
        }

        // Phone number validation: digits only, 10-15 characters
        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(newOrganizer.phone)) {
            setFormError('Phone number must be 10-15 digits long and contain only numbers.');
            return;
        }

        // Experience validation: e.g., "1 year", "6 months"
        const experienceRegex = /^\d+\s(years?|months?)$/i;
        if (!experienceRegex.test(newOrganizer.experience)) {
            setFormError('Experience must be in format "X years" or "X months" (e.g., "1 year", "6 months").');
            return;
        }


        const newId = Math.max(...volunteerData.map(p => p.id)) + 1; // Generate a new ID
        const today = new Date().toISOString().slice(0, 10); // Get current date in ISO-MM-DD format

        const organizerToAdd = {
            id: newId,
            name: newOrganizer.name,
            role: 'Organizer', // Fixed role for this modal
            email: newOrganizer.email,
            phone: newOrganizer.phone,
            joinDate: today,
            experience: newOrganizer.experience,
            events: 0, // New organizers start with 0 events
            status: 'Active', // New organizers are active by default
        };

        setVolunteerData(prevData => [...prevData, organizerToAdd]); // Add new organizer to data
        closeModal(); // Close the modal after adding
    };

    // Helper to get the right Tailwind CSS classes for the status
    const getStatusClass = (status) => {
        const baseClass = "py-1 px-3 rounded-full text-xs font-semibold inline-block";
        switch (status.toLowerCase()) {
            case 'active': return `${baseClass} bg-green-100 text-green-800`;
            case 'inactive': return `${baseClass} bg-red-100 text-red-800`;
            case 'pending': return `${baseClass} bg-yellow-100 text-yellow-800`;
            default: return `${baseClass} bg-gray-100 text-gray-800`;
        }
    };

    // Helper to get the right Tailwind CSS classes for the role
    const getRoleClass = (role) => {
        const baseClass = "font-semibold";
        switch (role.toLowerCase()) {
            case 'volunteer': return `${baseClass} text-cyan-600`;
            case 'organizer': return `${baseClass} text-amber-600`;
            default: return baseClass;
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col font-sans bg-cyan-500">

            {/* Main Content */}
            <main className="flex-1 bg-white">
                
            <div className="mx-auto px-6 py-4 max-w-screen-xl"> {/* Changed py-6 to py-4 */}
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="py-2 px-4 border-2 border-cyan-500 rounded-lg bg-white text-cyan-500 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:bg-cyan-500 hover:text-white transition">
                                <option value="all">All Roles</option>
                                <option value="volunteer">Volunteers</option>
                                <option value="organizer">Organizers</option>
                            </select>
                            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="py-2 px-4 border-2 border-cyan-500 rounded-lg bg-white text-cyan-500 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:bg-cyan-500 hover:text-white transition">
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <button onClick={openModal} className="bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-600 transition-transform transform hover:-translate-y-0.5 shadow-md">
                            Add Organizer
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full table-auto text-left">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="py-2 px-6 font-semibold text-gray-700">Name</th> {/* Changed py-3 to py-2 */}
                                    <th className="py-2 px-6 font-semibold text-gray-700">Role</th> {/* Changed py-3 to py-2 */}
                                    <th className="py-2 px-6 font-semibold text-gray-700">Email</th> {/* Changed py-3 to py-2 */}
                                    <th className="py-2 px-6 font-semibold text-gray-700">Phone</th> {/* Changed py-3 to py-2 */}
                                    <th className="py-2 px-6 font-semibold text-gray-700">Join Date</th> {/* Changed py-3 to py-2 */}
                                    <th className="py-2 px-6 font-semibold text-gray-700">Experience</th> {/* Changed py-3 to py-2 */}
                                    <th className="py-2 px-6 font-semibold text-gray-700">Events</th> {/* Changed py-3 to py-2 */}
                                    <th className="py-2 px-6 font-semibold text-gray-700">Status</th> {/* Changed py-3 to py-2 */}
                                    <th className="py-2 px-6 font-semibold text-gray-700">Actions</th> {/* Changed py-3 to py-2 */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVolunteers.map(person => (
                                    <tr key={person.id} className="hover:bg-gray-50 border-b border-gray-200 last:border-b-0">
                                        <td className="py-2 px-6 text-gray-800">{person.name}</td> {/* Changed py-4 to py-2 */}
                                        <td className="py-2 px-6"><span className={getRoleClass(person.role)}>{person.role}</span></td> {/* Changed py-4 to py-2 */}
                                        <td className="py-2 px-6 text-gray-600">{person.email}</td> {/* Changed py-4 to py-2 */}
                                        <td className="py-2 px-6 text-gray-600">{person.phone}</td> {/* Changed py-4 to py-2 */}
                                        <td className="py-2 px-6 text-gray-600">{person.joinDate}</td> {/* Changed py-4 to py-2 */}
                                        <td className="py-2 px-6"><span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-md text-xs font-semibold">{person.experience}</span></td> {/* Changed py-4 to py-2 */}
                                        <td className="py-2 px-6 text-gray-600 text-center">{person.events}</td> {/* Changed py-4 to py-2 */}
                                        <td className="py-2 px-6"><span className={getStatusClass(person.status)}>{person.status}</span></td> {/* Changed py-4 to py-2 */}
                                        <td className="py-2 px-6 flex gap-2"> {/* Changed py-4 to py-2 */}
                                            <button className="bg-cyan-500 text-white py-1 px-3 rounded-md text-sm hover:bg-cyan-600 transition">Edit</button>
                                            <button className="bg-green-500 text-white py-1 px-3 rounded-md text-sm hover:bg-green-600 transition">Contact</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Add Organizer Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Organizer</h2>
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
                        >
                            &times;
                        </button>
                        <form onSubmit={handleAddOrganizer}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newOrganizer.name}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500"
                                    placeholder="Organizer's Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={newOrganizer.email}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500"
                                    placeholder="organizer@example.com"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                                    Phone:
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={newOrganizer.phone}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500"
                                    placeholder="+91 12345 67890"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
                                    Experience (e.g., "1 year", "6 months"):
                                </label>
                                <input
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    value={newOrganizer.experience}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500"
                                    placeholder="e.g., 1 year"
                                />
                            </div>
                            {formError && (
                                <p className="text-red-500 text-xs italic mb-4 text-center">{formError}</p>
                            )}
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition"
                                >
                                    Add Organizer
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdVolunteer;
