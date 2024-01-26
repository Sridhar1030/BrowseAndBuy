import React from 'react'

function Gcard() {
    return (
        <div className=' cursor-pointer border-2 rounded-lg  border-black w-64 mt-20 h-96 flex flex-col items-center overflow-y-auto'>
            <div className='mt-4 text-xl'>
                Instrument Name
            </div>
            <div className='size-52 mx-auto'>
                <img src="https://rukminim2.flixcart.com/image/850/1000/kqb8pzk0/ruler/h/u/6/roller-scale-30-cm-best-fiber-quality-book-birds-original-imag4cupdszgskes.jpeg?q=90&crop=false" alt="" />
            </div>
            <div className=' mt-5 h-fit'>
                Roller scale
            </div>
        </div>
    )
}

export default Gcard