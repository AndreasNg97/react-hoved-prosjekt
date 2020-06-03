import React, { useEffect, useState, useRef, useContext } from 'react'
import './css/TopNavBar.css'
import { googleProvider, auth } from '../FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cogAni } from '../utils/Animations'
import { NavColors } from '../utils/functions'
import Switches from './Switches'
import { newPageContext, darkmodeContext } from '../utils/Context'

const TopNavBar = () => {

    //HOOK TO CHECK IF USER IS LOGGED IN OR NOT
    const [user] = useAuthState(auth)
    //LOG IN & LOG OUT FUNCTION
    const logIn = () => auth.signInWithPopup(googleProvider)
    const logOut = async () => auth.signOut()
    //USEREF
    let cogRef = useRef(null)
    let profilePicRef = useRef(null)
    const settingsPopupRef = useRef()
    const userMenuRef = useRef()
    const homeBtn = useRef()
    const statsBtn = useRef()
    //USESTATE
    const [settingsPopup, setSettingsPopup] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    //UTILS IMPORTS
    const { dark } = useContext(darkmodeContext)
    const { newPage, setNewPage } = useContext(newPageContext)
    const [navColor] = NavColors()
    
    // HIGHLIGHTS THE PAGE THAT IS RENDERING
    const btnColor = () => {
        if (newPage === 'stats') {
            statsBtn.current.style.color = 'red'
            homeBtn.current.style.color = navColor
        } if (newPage === 'home') {
            statsBtn.current.style.color = navColor
            homeBtn.current.style.color = 'red'
        } if (newPage === 'favorites') {
            statsBtn.current.style.color = navColor
            homeBtn.current.style.color = navColor
        }
    }

    //POPUP SETTINGS MENU AND USER MENU
    const popups = () => {
        settingsPopup ? settingsPopupRef.current.style.display = 'block' : settingsPopupRef.current.style.display = 'none'
        if (user) {
            userMenu ? userMenuRef.current.style.display = 'block' : userMenuRef.current.style.display = 'none'
        }
    }
    
    //ANIMATION IMPORTED FROM UTILS
    const animations = () => {
        settingsPopup ? cogAni(cogRef, 90, 1.3) : cogAni(cogRef, -90, 1)
        if (user) userMenu ? cogAni(profilePicRef, 1, 1.3) : cogAni(profilePicRef, 1, 1)

    }

    if (user === null && newPage === 'favorites') {
        setNewPage('home')
    }

    useEffect(() => {
        btnColor()
        popups()
        animations()
    })

        return (
            <div className={dark ? 'Navbar darkborderColor ' : 'Navbar lightborderColor'}>
                <div className='navbarLeft noUserSelect'>
                    <FontAwesomeIcon icon={['fab', 'old-republic']} size='3x' onClick={() => setNewPage('home')} style={{ cursor: 'pointer' }} />
                    <div onClick={() => setNewPage('home')} style={{ alignSelf: 'flex-end', marginLeft: '0.5rem', cursor: 'pointer' }}><h1>UFC STATS</h1></div>
                </div>
                <div className='navbarRight'>
                    <p ref={homeBtn} className='navbarBtn' onClick={() => setNewPage('home')}>HOME</p>
                    <p className='noUserSelect'>|</p>
                    <p ref={statsBtn} className='navbarBtn' onClick={() => setNewPage('stats')}>STATS</p>
                    {user === null &&
                        <div style={{display:'flex', marginLeft:'0.3rem'}}>
                            <p className='btnP noUserSelect navbarBtn' onClick={() => logIn()}>Login</p>
                            <p className='btnP noUserSelect navbarBtn'>|</p>
                            <p className='btnP noUserSelect navbarBtn' onClick={() => logIn()}>Signup</p>
                        </div>
                    }
                    {user &&
                        <div
                            onMouseEnter={() => setUserMenu(true)}
                            onMouseLeave={() => setUserMenu(false)}>
                            <div ref={e => { profilePicRef = e }}>
                                <img className='profilePicture' src={user.photoURL} alt='profile picture' />
                            </div>
                            <div
                                className={dark ? 'userMenu darkColor1 darkborderColor' : 'userMenu lightColor1 lightborderColor'}
                                ref={userMenuRef}>
                                <ul className='pointer'>
                                    <div onClick={() => setNewPage('favorites')}><li>Favorites</li></div>
                                    <div onClick={() => logOut()}><li>Log Out</li></div>
                                </ul>
                            </div>
                        </div>
                    }

                    <div style={{ marginLeft: '0.5rem' }}
                        onMouseEnter={() => setSettingsPopup(true)}
                        onMouseLeave={() => setSettingsPopup(false)}>
                        <div ref={e => { cogRef = e }} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={['fas', 'cog']} size='2x' onClick={() => setSettingsPopup(!settingsPopup)} />
                        </div>
                        <div className={dark ? 'popupSettings darkColor1 darkborderColor' : 'popupSettings lightColor1 lightborderColor'} ref={settingsPopupRef}>
                            <Switches />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
export default TopNavBar