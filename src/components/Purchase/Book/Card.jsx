import React from 'react';

function Card() {
    return (
        <div className='border-2 rounded-lg  border-black w-64 mt-20 h-96 flex flex-col items-center overflow-y-auto'>
            <div className='mt-4 text-xl'>
                Book Name
            </div>
            <div className='size-52 mx-auto'>
                <img src="https://img.freepik.com/free-vector/red-text-book-closed-icon_18591-82397.jpg" alt="" />
            </div>
            <div className=' mt-5 h-fit'>
                Engineering Mathematics - 1 
            </div>
        </div>
    );
}

export default Card;
