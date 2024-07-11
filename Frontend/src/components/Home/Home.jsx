import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Home.css'


const Home = () => {
    return (
        <>
        <div><Navbar/></div>
        <div className='heading'>
        <h1> online with <br /> <span> Browse and Buy </span></h1>
        <p>Trusted by over 10,000 students worldwide</p>
        </div>
        <div className="middle">
            <div className="left">
                <h1>Introducing the new <br /> Era of Second hand market.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur facilis ea voluptas quibusdam nulla, animi quod nesciunt cupiditate  odit?</p>
                <button class="btn" role="button"><span class="text">Learn more</span></button>
            </div>
            <div className="right"><img src="https://img.freepik.com/free-vector/it-specialist-set-flat-isolated-icons-characters-programmers-technicians-servers-with-personal-computers-vector-illustration_1284-68703.jpg" alt="" /></div>
        </div>

        <div class="feature">
        <div class="f-box">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-order-2750347-2294212.png" alt="" />
            <h6>Online order</h6>
        </div>

        <div class="f-box">
            <img src="https://i.pinimg.com/736x/27/a3/19/27a319081c1987c70cdf014833880a5a.jpg" alt="" />
            <h6>save money</h6>
        </div>

        <div class="f-box">
            <img src="https://thumbs.dreamstime.com/z/woman-shopping-happy-girl-carrying-bags-gifts-vector-cartoon-illustration-isolated-white-background-promotion-sale-template-196812722.jpg" alt="" />
            <h6>promotions</h6>
        </div>

        <div class="f-box">
            <img src="https://c8.alamy.com/comp/2B1G4KC/happy-jumping-caucasian-woman-with-shopping-bagsbig-sale-conceptisolated-on-white-backgroundcartoon-vector-illustration-2B1G4KC.jpg" alt="" />
            <h6>Sell</h6>
        </div>

        <div class="f-box">
            <img src="https://img.freepik.com/premium-vector/service-24-7-concept-call-center-support-vector-illustration-flat_186332-1024.jpg" alt="" />
            <h6>24/7 support</h6>
        </div>

    </div>
        </>

    )
}

export default Home