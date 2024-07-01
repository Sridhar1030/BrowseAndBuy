import React from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries()); // Convert FormData to plain object
        console.log('Form Data:', formDataObject);
        alert('Uploaded');

        // Navigate to ImageUpload and pass formDataObject as state
        navigate('/form/ImageUpload', { state: { formData: formDataObject } });
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-400 ">
            <form className="max-w-md mx-auto p-4 bg-white rounded shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="ItemName" className="block text-gray-700">Item Name</label>
                    <input
                        type="text"
                        name="ItemName"
                        id="ItemName"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="ItemType" className="block text-gray-700">Item Type</label>
                    <select
                        name="ItemType"
                        id="ItemType"
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="" disabled defaultValue hidden>Select Item Type</option>
                        <option value="Engineering Books">Engineering Books</option>
                        <option value="Labcoats">Labcoats</option>
                        <option value="PYQS">PYQS</option>
                        <option value="Graphics Instruments">Graphics Instruments</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="SemName" className="block text-gray-700">Semester</label>
                    <input
                        type="text"
                        name="SemName"
                        id="SemName"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Price" className="block text-gray-700">Price in ₹</label>
                    <input
                        type="number"
                        name="Price"
                        id="Price"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="PhoneNumber" className="block text-gray-700">Phone number</label>
                    <input
                        type="tel"
                        name="PhoneNumber"
                        id="PhoneNumber"
                        className="w-full px-3 py-2 border rounded"
                        pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="FirstName" className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="FirstName"
                        id="FirstName"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="LastName" className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="LastName"
                        id="LastName"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;
