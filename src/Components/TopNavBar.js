import React, { useEffect, useState, useRef, useContext } from 'react'
import './css/TopNavBar.css'
import Modal from 'react-modal'
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
    const [settingsModal, setSettingsModal] = useState(false)
    //UTILS IMPORTS
    const { dark } = useContext(darkmodeContext)
    const { newPage, setNewPage } = useContext(newPageContext)
    const [navColor] = NavColors()
    // modal colors for darkmode and lightmode
    let modalBackgroundColor = dark ? '#1c1f24' : 'white'
    let modalColor = dark ? 'rgba(201, 201, 201)' : 'black'

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
    //Options for modal style
    const modalStyle = {
        content: {
            height: 'auto',
            width: 'auto',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: '5rem',
            transform: 'translate(-50%, -50%)',
            overflowX: 'hidden',
            border: 'none',
            color: modalColor,
            backgroundColor: modalBackgroundColor,
            padding: '0'
        },
        overlay: {
            backgroundColor: 'rgba(75, 74, 76, 0.5)'
        }
    }

    //ANIMATION IMPORTED FROM UTILS
    const animations = () => {
        if(user === null) settingsPopup ? cogAni(cogRef, 90, 1.3) : cogAni(cogRef, -90, 1)
        if (user) userMenu ? cogAni(profilePicRef, 1, 1.3) : cogAni(profilePicRef, 1, 1)
    }

    if (user === null && newPage === 'favorites') {
        setNewPage('home')
    }

    const closeModalToFavorites = () => {
        setNewPage('favorites')
        setSettingsModal(false)
    }

    useEffect(() => {
        btnColor()
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
                    <div style={{ display: 'flex', marginLeft: '0.3rem' }}>
                        <p className='btnP noUserSelect navbarBtn' onClick={() => logIn()}>Login</p>
                        <p className='btnP noUserSelect navbarBtn'>|</p>
                        <p className='btnP noUserSelect navbarBtn' onClick={() => logIn()}>Signup</p>
                        <div style={{ marginLeft: '0.5rem' }}>
                            <div className='pointer' ref={e => { cogRef = e }} style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setSettingsModal(true)}>
                                <FontAwesomeIcon icon={['fas', 'cog']} size='2x' onClick={() => setSettingsPopup(!settingsPopup)} style={{ marginBottom: '0.3rem' }} />
                            </div>
                            <Modal isOpen={settingsModal} style={modalStyle} onRequestClose={() => setSettingsModal(false)}>
                                <div className='menuModal'>
                                    <Switches />
                                </div>
                            </Modal>
                        </div>
                    </div>
                }
                {user &&
                    <div>
                        <div ref={e => { profilePicRef = e }} onClick={() => setSettingsModal(true)}>
                            <img className='profilePicture' src={user.photoURL} alt='profile' />
                        </div>
                        <div
                            className={dark ? 'userMenu darkColor1 darkborderColor' : 'userMenu lightColor1 lightborderColor'}
                            ref={userMenuRef}>
                            <Modal isOpen={settingsModal} style={modalStyle} onRequestClose={() => setSettingsModal(false)}>
                                <div className='menuModal'>
                                    <Switches />
                                    <ul className='pointer userMenuDrop'>
                                        <div onClick={() => closeModalToFavorites()}><li>Favorites</li></div>
                                        <div onClick={() => logOut()}><li>Log Out</li></div>
                                    </ul>
                                </div>
                            </Modal>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default TopNavBar