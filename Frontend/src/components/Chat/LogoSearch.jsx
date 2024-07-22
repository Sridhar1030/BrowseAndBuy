import React from "react";
import { UilSearch } from "@iconscout/react-unicons";

const LogoSearch = () => {
    return (
        <div className="flex gap-3">
            <img src="" alt="" />
            <div className="flex bg-inputColor rounded-lg p-1.5">
                <input
                    type="text"
                    placeholder="search User name"
                    className="bg-transparent border-none outline-none"
                />
                <div className="flex items-center justify-center bg-gradient-to-r from-[#f99827] to-[#f95f35] rounded-md p-1 text-white">
                    <UilSearch />
                </div>
            </div>
        </div>
    );
};

export default LogoSearch;
