import React, { useState } from 'react';
import Sidebar from './Sidebar';

const WasteClassifier = ({ navigateTo }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('waste-classifier');

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
    navigateTo(item);
  };

  /*const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setIsLoading(true);
    setResult('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Replace this with your real backend API
      const response = await fetch('http://localhost:5000/classify', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(`♻️ This is classified as: ${data.category}`);
    } catch (err) {
      setResult('❌ Error classifying image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };*/
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResult('🔍 Identifying waste category...');
      setTimeout(() => {
        // Mock result
        setResult('♻️ This is classified as: *Plastic Waste*');
      }, 1500);
    }
  };

  const handleReupload = () => {
    setSelectedImage(null);
    setResult('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white font-sans flex">
      <Sidebar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />

      <main className="ml-[280px] w-full p-8 space-y-10">
        <div className="p-8 overflow-y-auto">
          <h1 className="text-3xl font-extrabold text-green-400 mb-6 drop-shadow">🗑️ Waste Classifier</h1>

          <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-blue-700">
            <p className="mb-4 text-gray-300">
              Upload a photo of the waste item and our system will identify its type for proper disposal.
            </p>

            {!selectedImage && (
              <label className="block w-full border-2 border-dashed border-green-500 p-10 text-center rounded-xl cursor-pointer hover:border-green-400 transition">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <span className="text-green-300 text-lg font-semibold">📤 Click or Drag & Drop to Upload Image</span>
              </label>
            )}

            {selectedImage && (
              <div className="mt-6 flex flex-col items-center space-y-4">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-64 h-64 object-contain border-4 border-blue-500 rounded-xl shadow"
                />

                {isLoading ? (
                  <div className="text-blue-200 animate-pulse text-lg font-medium">🔄 Identifying waste category...</div>
                ) : (
                  <div className="text-blue-300 text-lg font-medium">{result}</div>
                )}

                <button
                  onClick={handleReupload}
                  className="mt-4 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl transition"
                >
                  🔁 Try Another Image
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WasteClassifier;
