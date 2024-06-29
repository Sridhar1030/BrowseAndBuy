import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

function Sell() {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState('');

  const handleAcceptClick = () => setAccepted(true);

  const handleImage = (e) => {
    console.log("hi");
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (!accepted) {
      alert("Please accept the rules");
    } else {
      const formData = new FormData();
      formData.append('image', image);

      axios.post('http://localhost:3000/api/users/upload', formData)
        .then((res) => {
          console.log(res);
          // navigate('/sell/form'); // Uncomment if you want to navigate after upload
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <div><Navbar /></div>
      {accepted ? null : (
        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3">
          <p>Press accept before uploading</p>
        </div>
      )}
      <div className="flex flex-col m-8 overflow-hidden items-center justify-center ">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" name="file" onChange={handleImage} />
        </label>
        <button onClick={handleUploadClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3 self-end">Upload</button>
      </div>

      <div className="pl-10 mt-10">
        <h1 className="underline">Rules for Selling on Our Platform:</h1>
        <ol className="list-decimal">
          <li><strong>Accurate Descriptions:</strong> Provide honest and detailed descriptions of your items.</li>
          <li><strong>Clear Images:</strong> Upload clear, high-quality images of the items you're selling.</li>
          <li><strong>Categorize Items:</strong> Choose the appropriate category for your items.</li>
          <li><strong>Fair Pricing:</strong> Set reasonable and fair prices for your items.</li>
          <li><strong>Responsive Communication:</strong> Respond promptly to inquiries and maintain clear communication.</li>
          <li><strong>No Prohibited Items:</strong> Check and adhere to the list of prohibited items.</li>
          <li><strong>Transaction Method:</strong> Agree on meet-up or shipping and specify payment methods.</li>
          <li><strong>Honesty Policy:</strong> Be truthful about the condition of your items.</li>
          <li><strong>No Spam or Duplicates:</strong> Avoid spamming the platform with duplicate listings.</li>
          <li><strong>Privacy and Safety:</strong> Prioritize safety during in-person transactions and avoid sharing personal information publicly.</li>
          <li><strong>Moderation and Reporting:</strong> Report inappropriate content and adhere to community guidelines.</li>
          <button onClick={handleAcceptClick} className="mt-4 bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            I Accept
          </button>
        </ol>
      </div>
    </>
  );
}

export default Sell;
