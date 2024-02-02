import React from 'react'
import Menu from '../../Menu/Menu'
import Navbar from '../../Navbar/Navbar'
import Sem from './Sem'
import Card from './Card'
function Book() {
    return (
        <>
            <Navbar />
            <div className='flex'>
                <Menu />
                <div className='pl-72'>
                <Sem/>
                <div className=' flex flex-wrap gap-x-10'>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/> 
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/> 
                </div>
                </div>
            </div>


        </>
    )
}

export default Book