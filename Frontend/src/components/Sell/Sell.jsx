import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from './Form/Form';
import Rule from './Rule';

function Sell() {
  const [accepted, setAccepted] = useState(false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleAcceptClick = () => {
    setAccepted(true);
  };

  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + images.length > 2) {
      alert("You can upload up to 2 images only");
      return;
    }
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleUploadClick = () => {
    if (!accepted) {
      alert("Please accept the rules before uploading");
      return;
    }

    setUploading(true);
    
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    axios.post('http://localhost:3000/api/users/upload', formData)
      .then((res) => {
        console.log(res);
        alert("Files have been uploaded successfully");
      })
      .catch((err) => {
        console.error("Error uploading files:", err);
        alert("An error occurred while uploading the files. Please try again.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className='bg-gray-400 flex flex-col'>
      <div><Navbar /></div>
      <div className='flex justify-center items-center flex-col'>
        <Form />

        {!accepted && (
          <div className="bg-red-500 text-white text-sm font-bold px-4 py-3 ">
            <p>Please accept the rules before uploading</p>
          </div>
        )}
        <div className="flex flex-col m-8 items-center justify-center w-[1000px] h-96">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
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
            className={`text-white font-bold py-2 px-4 rounded-full m-3 self-end ${uploading ? 'bg-red-500' : 'bg-blue-500 hover:bg-blue-700'}`}>
            Upload
          </button>
        </div>
        {/* //RULES */}
        <div className='pl-10 mt-10'>
          <Rule/>
          <button onClick={handleAcceptClick} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sell;
