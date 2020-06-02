import React, { useEffect, useState, useRef, useContext } from 'react'
import './css/TopNavBar.css'
import { googleProvider, auth, db } from '../FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cogAni } from '../utils/Animations'
import Switches from './Switches'
import { newPageContext } from '../utils/Context'

const TopNavBar = () => {

    const [user, loading, error] = useAuthState(auth)
    let cogRef = useRef(null)
    let profilePicRef = useRef(null)
    const settingsPopupRef = useRef()
    const userMenuRef = useRef()
    const homeBtn = useRef()
    const statsBtn = useRef()
    const [settingsPopup, setSettingsPopup] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const { newPage, setNewPage } = useContext(newPageContext)

    const logIn = () => auth.signInWithPopup(googleProvider)
    const logOut = () => auth.signOut()

    const btnColor = () => {
        if (newPage === 'stats') {
            statsBtn.current.style.color = 'red'
            homeBtn.current.style.color = 'white'
        } if (newPage === 'home') {
            statsBtn.current.style.color = 'white'
            homeBtn.current.style.color = 'red'
        }
    }

    const popups = () => {
        settingsPopup ? settingsPopupRef.current.style.display = 'block' : settingsPopupRef.current.style.display = 'none'
        if (user) {
            userMenu ? userMenuRef.current.style.display = 'block' : userMenuRef.current.style.display = 'none'
        }
    }

    const animations = () => {
        settingsPopup ? cogAni(cogRef, 90, 1.3) : cogAni(cogRef, -90, 1)
        if(user) userMenu ? cogAni(profilePicRef, 1, 1.3) : cogAni(profilePicRef, 1 , 1)

    }

    useEffect(() => {
        btnColor()
        popups()
        animations()
    }, [newPage, settingsPopup, userMenu, user])

    if (user === null) {
        return (
            <div className='Navbar'>
                <div className='navbarLeft'>
                    <FontAwesomeIcon icon={['fab', 'old-republic']} size='3x' />
                    <div style={{ alignSelf: 'flex-end', marginLeft: '0.5rem' }}><h1>UFC STATS</h1></div>
                </div>
                <div className='navbarRight'>
                    <p ref={homeBtn} style={{ margin: '0 0.2rem', cursor: 'pointer' }} onClick={() => setNewPage('home')}>HOME</p>
                    <p>|</p>
                    <p ref={statsBtn} style={{ margin: '0 0.2rem', cursor: 'pointer' }} onClick={() => setNewPage('stats')}>STATS</p>
                    <p className='btnP' style={{ margin: '0 0.1rem 0 0.3rem', cursor: 'pointer' }} onClick={() => logIn()}>Login</p>
                    <p className='btnP'>|</p>
                    <p className='btnP' style={{ margin: '0 0.1rem', cursor: 'pointer' }} onClick={() => logIn()}>Signup</p>
                    
                    <div style={{ marginLeft: '0.5rem' }}>
                        <div ref={e => {cogRef = e}} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={['fas', 'cog']} size='2x' onClick={() => setSettingsPopup(!settingsPopup)} />
                        </div>
                        <div className='popupSettings' ref={settingsPopupRef}>
                            <Switches />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (user) {
        return (
            <div className='Navbar'>
                <div className='navbarLeft'>
                    <FontAwesomeIcon icon={['fab', 'old-republic']} size='3x' />
                    <div style={{ alignSelf: 'flex-end', marginLeft: '0.5rem' }}><h1>UFC STATS</h1></div>
                </div>

                <div className='navbarRight'>
                    <p ref={homeBtn} style={{ margin: '0 0.2rem', cursor: 'pointer' }} onClick={() => setNewPage('home')}>HOME</p>
                    <p>|</p>
                    <p ref={statsBtn} style={{ margin: '0 1rem 0 0.2rem', cursor: 'pointer' }} onClick={() => setNewPage('stats')}>STATS</p>

                    <div className='flex-center'>
                        <div
                            onMouseEnter={() => setUserMenu(true)}
                            onMouseLeave={() => setUserMenu(false)}>
                            <div ref={e => {profilePicRef = e}}>
                                <img className='profilePicture' src={user.photoURL} alt='profile picture' />
                            </div>
                            <div className='userMenu' ref={userMenuRef}>
                                <ul style={{ cursor: 'pointer' }}>
                                    <div onClick={() => setNewPage('favorites')}><li>Favorites</li></div>
                                    <div onClick={() => logOut()}><li>Log Out</li></div>
                                </ul>
                            </div>
                        </div>

                        <div style={{ marginLeft: '0.5rem' }}
                            onMouseEnter={() => setSettingsPopup(true)}
                            onMouseLeave={() => setSettingsPopup(false)}>
                            <div ref={e => {cogRef = e}} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={['fas', 'cog']} size='2x' />
                            </div>
                            <div className='popupSettings' ref={settingsPopupRef}>
                                <Switches />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopNavBar

/*

login?
*/