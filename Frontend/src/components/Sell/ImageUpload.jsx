import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import Rule from './Rule';

function ImageUpload() {
  const [accepted, setAccepted] = useState(false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(null); // State to hold form data

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.formData) {
      console.log('Form Data on ImageUpload:', location.state.formData);
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleAdmin = () => {
    console.log("Navigating to Admin Images with formData:", formData);
    navigate('/AdminImages', { state: { formData: formData } });
  }

  const handleAcceptClick = () => {
    setAccepted(true);
  };

  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file =>
      ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)
    );

    if (validFiles.length + images.length > 3) {
      alert("You can upload up to 2 images only");
      return;
    }

    setImages((prevImages) => [...prevImages, ...validFiles]);
  };

  const sellToBackend = async () => {
    try {
      // Check if formData is available
      if (!formData) {
        alert("Form data is not available. Please upload images first.");
        return;
      }

      // Check if formData.Image_ID is defined and is an array
      if (!formData.Image_ID || !Array.isArray(formData.Image_ID)) {
        console.error("Image_ID is not defined or is not an array:", formData.Image_ID);
        alert("Error: Image data is missing or not properly formatted.");
        return;
      }

      const url = "http://localhost:3000/sell";

      // Create data object for form fields
      const data = {
        Item_Name: formData.Item_Name || '',
        category: formData.category || '',
        semester: formData.semester || '',
        price: formData.price || '',
        phone: formData.phone || '',
        F_Name: formData.F_Name || '',
        L_Name: formData.L_Name || '',
        Image_ID: formData.Image_ID.join(',') || '123'
      };

      // Example of sending formData to /sell endpoint
      const response = await axios.post(url, data);

      console.log('Response from backend:', response.data);
      alert("Form data has been successfully uploaded to /sell endpoint");

      // Handle success logic here if needed

    } catch (error) {
      console.error('Error uploading data:', error);
      alert("An error occurred while uploading the formData to /sell endpoint. Please try again.");
      // Handle error logic
    }
  };

  const handleUploadClick = async () => {
    if (!accepted) {
      alert("Please accept the rules before uploading");
      return;
    }

    if (images.length === 0) {
      alert("Please select images to upload");
      return;
    }

    setUploading(true);

    const formDataToUpdate = { ...formData }; // Make a copy of existing formData

    const formDataForUpload = new FormData();
    images.forEach((image, index) => {
      formDataForUpload.append(`image`, image); // Ensure backend expects this field name
    });

    try {
      console.log("Sending images to the backend...");
      const response = await axios.post('http://localhost:3000/api/users/upload', formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Check if response data is received and has 'data' property
      if (response.data && response.data.data) {
        const uploadResults = response.data.data;
        console.log("Files uploaded successfully to Cloudinary", uploadResults);

        // Update formDataToUpdate with Image_ID
        formDataToUpdate.Image_ID = uploadResults.map(result => result.public_id);

        setFormData(formDataToUpdate); // Update state with updated form data

        // Logging updated form data
        console.log("Updated FormData:", formDataToUpdate);

        alert("Files have been uploaded successfully");
      } else {
        console.error("Unexpected response format:", response);
        alert("An error occurred while uploading the files. Please try again later.");
      }

    } catch (err) {
      console.error("Error uploading files:", err);
      alert("An error occurred while uploading the files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className='bg-gray-400 flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex flex-col items-center justify-center'>
        {!accepted && (
          <div className="bg-red-500 text-white text-sm font-bold px-4 py-3">
            <p>Please accept the rules before uploading</p>
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full h-96 m-8">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {images.length === 0 ? (
                <>
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  {images.map((image, index) => (
                    <div key={index} className="mb-2 text-center">
                      <p className="text-lg text-gray-500 capitalize font-bold">{image.name}</p>
                      <p className="text-xs text-gray-500">{(image.size / 1024).toFixed(2)} KB</p>
                      <button onClick={() => removeImage(index)} className="mt-1 text-red-500">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input id="dropzone-file" type="file" multiple name="file" className="hidden" onChange={handleImage} />
          </label>
          <button
            onClick={handleUploadClick}
            className={`text-white font-bold py-2 px-4 rounded-full m-3 self-end ${uploading ? 'bg-red-500' : 'bg-blue-500 hover:bg-blue-700'}`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        <div className='pl-10 mt-10'>
          <Rule />
          <div className='gap-10 flex'>
            <button onClick={handleAcceptClick} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              I Accept
            </button>
            <button className='mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={handleAdmin}>
              ADMIN
            </button>
            <button className='mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={sellToBackend}>
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;