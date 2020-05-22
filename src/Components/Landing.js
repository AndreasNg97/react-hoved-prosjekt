import React, { useRef, useContext, useEffect } from 'react'
import "./css/Landing.css"
import { landingContext } from '../utils/Context'
const Landing = () => {

    const landingRef = useRef()
    const btnRef = useRef()
    const {landing, setLanding} = useContext(landingContext)




    useEffect(() => {
        if(landing){
            document.body.style.overflow = 'hidden'
            landingRef.current.style.left = 0
        }
        if(!landing){
            document.body.style.overflow= 'auto'
            landingRef.current.style.top = '-115%'
            landingRef.current.style.visibility = 'hidden'
        }
    },[landing])

    return (
        <>
            <div ref={landingRef} className="posterBackground">
                <div className='bodyText'>
                    <div className='ufcContainer flex-center'>
                        <p>UFC249</p>
                    </div>
                    <div className='landingNameContainer'>
                        <div className='landingName flex-center'>
                            <p>FERGUSON</p>
                        </div>
                        <div className='landingVs flex-center'>
                            <div className='landingline'></div>
                            <p>VS</p>
                            <div className='landingline'></div>
                        </div>
                        <div className='landingName flex-center'>
                            <p>GAETHJE</p>
                        </div>
                    </div>
                    <div className='landingNameContainer2'>
                        <div className='landingName flex-center'>
                            <p>CEJUDO</p>
                        </div>
                        <div className='landingVs2 flex-center'>
                            <div className='landingline' style={{width:'10%'}}></div>
                            <p style={{fontSize:'1rem'}}>VS</p>
                            <div className='landingline' style={{width:'10%'}}></div>
                        </div>
                        <div className='landingName flex-center'>
                            <p>CRUZ</p>
                        </div>
                    </div>
                    <div className='locationContainer flex-center'>
                            <p>VyStar Veterans Memorial Arena, Jacksonville United States</p>
                        </div>
                        <div className='dateContainer flex-center'>
                            <p>Sun, May 10 / 4:00 AM CEST</p>
                        </div>
                        <div ref={btnRef} className='flex-center moreBtnContainer'>
                            <div className='seeMoreBtn' onClick={() => {setLanding(false)}}>   
                                <p>FIND OUT MORE</p>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Landing