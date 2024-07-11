import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

function Form() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries()); // Convert FormData to plain object
        console.log('Form Data:', formDataObject);

        // Navigate to ImageUpload and pass formDataObject as state
        navigate('/form/ImageUpload', { state: { formData: formDataObject } });
    };

    return (
        <>
        <Navbar/>
        <div className="h-full flex items-center justify-center bg-gray-400 ">
            <form className="max-w-md mx-auto p-4 bg-white rounded shadow-md mb-10" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="Item_Name" className="block text-gray-700">Item Name</label>
                    <input
                        type="text"
                        name="Item_Name"  
                        id="Item_Name"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700">Category</label>
                    <select
                        name="category"
                        id="category"
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="" disabled defaultValue hidden>Select Item Type</option>
                        <option value="EngineeringBooks">Engineering Books</option>
                        <option value="Labcoats">Labcoats</option>
                        <option value="PYQS">PYQS</option>
                        <option value="Graphics Instruments">Graphics Instruments</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="semester" className="block text-gray-700">Semester</label>
                    <input
                        type="number"
                        name="semester"
                        id="semester"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700">Price in ₹</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Phone number</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="w-full px-3 py-2 border rounded"
                        pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="F_Name" className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="F_Name"
                        id="F_Name"
                        className="w-full px-3 py-2 border rounded"
                        required
                        />
                </div>
                <div className="mb-4">
                    <label htmlFor="L_Name" className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="L_Name"
                        id="L_Name"
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
                    </>
    );
}

export default Form;
