import React, { useEffect, useState, useRef, useContext } from 'react'
import Modal from 'react-modal'
import { googleProvider, auth } from '../FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLocalState } from '../utils/functions'
import './css/Navbar.css'
import Switch from 'react-switch'
import darkLogo from '../img/dark.png'
import lightLogo from '../img/light.png'
import { darkmodeContext, metricContext, newPageContext} from '../utils/Context'

let globalDropdown

const Navbar = () => {
    
    const [user, loading, error] = useAuthState(auth)
    const [dropdown, setDropdown] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {metric, setMetric} = useContext(metricContext)
    const {dark, setDark} = useContext(darkmodeContext)
    const {newPage, setNewPage} = useContext(newPageContext)
    const [saveDarkmode, setSaveDarkmode] = useLocalState('darkmode')
    const [saveMetric, setSaveMetric] = useLocalState('metric')
    const menuRef = useRef()
    const profileMenu = useRef()

    const logIn = () => auth.signInWithPopup(googleProvider)
    const logOut = () => auth.signOut()


    const profileMenuRender = () => {
        if (user) {
            if (dropdown) {
                menuRef.current.style.opacity = '1'
                profileMenu.current.style.backgroundColor = '#353946'
            }
            if (dropdown === false) {
                menuRef.current.style.opacity = '0'
                profileMenu.current.style.backgroundColor = 'transparent'
            }
        }
    }

    globalDropdown = () => {
        if (dropdown) setDropdown(false)
        else return
    }

    let modalBackgroundColor = dark ? '#353946' : 'white'

    const modalStyle = {
        content: {
            height: 'auto',
            width: '20%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflowX: 'hidden',
            backgroundColor: modalBackgroundColor,
            border: '1px solid black'
        },
        overlay: {
            backgroundColor: 'rgba(75, 74, 76, 0.5)'
        }
    }

    const applySavedSettings = () => {
        if(saveDarkmode === 'true') setDark(true)
        if(saveDarkmode === 'false') setDark(false)
        if(saveMetric === 'true') setMetric(true)
        if(saveMetric === 'false') setMetric(false)
    }

    useEffect(() => {
        profileMenuRender()
        applySavedSettings()
    },[dropdown])

    if (user) {
        return (
            <div className='navbar'>
                <Modal
                    isOpen={modalIsOpen}
                    style={modalStyle}
                    onRequestClose={() => setModalIsOpen(false)}>
                    <div>
                        <label htmlFor='normal-switch'>
                            <div className='switchContainer'>
                                <Switch
                                    id='normal-switch'
                                    onChange={() => {
                                        setMetric(!metric)
                                        setSaveMetric(!metric)
                                    }}
                                    checked={!metric}
                                    className='switch'
                                    onColor='#888'
                                    uncheckedIcon={
                                        <div className='switchContainer'>
                                            <p style={{ color: 'orange' }}>CM</p>
                                        </div>}
                                    checkedIcon={
                                        <div className='switchContainer'>
                                            <p>IN</p>
                                        </div>} />
                            </div>
                        </label>
                        <label>
                            <div className='switchContainer'>
                                <Switch
                                    id='normal-switch'
                                    onChange={() => {
                                        setDark(!dark)
                                        setSaveDarkmode(!dark)
                                    }}
                                    checked={!dark}
                                    className='switch'
                                    onColor='#eee'
                                    offColor='#555'
                                    uncheckedIcon={
                                        <div className='switchIconContainer'>
                                            <img style={{ width: '20px' }} src={darkLogo} />
                                        </div>
                                    }
                                    checkedIcon={
                                        <div className='switchIconContainer'>
                                            <img style={{ width: '20px' }} src={lightLogo} />
                                        </div>} />
                            </div>

                        </label>
                    </div>
                </Modal>
                <div>
                    <p style={{cursor:'pointer'}} onClick={() => setNewPage(false)}>HOME</p>
                    <p style={{cursor:'pointer'}} onClick={() => setNewPage(true)}>STATS</p>
                </div>
                <div>
                    <div ref={profileMenu} onClick={() => setDropdown(!dropdown)} className='profileMenu'>
                        <img className='profilePicture' src={user.photoURL} alt='profile picture' />
                        <p className='displayName'>{user.displayName}</p>
                        <h1 className='arrowDown'>&#9662;</h1>
                    </div>
                    <div ref={menuRef} className='dropdown'>
                        <p onClick={() => setModalIsOpen(true)}>Settings</p>
                        <p onClick={() => logOut()} >Log Out</p>
                    </div>
                </div>
            </div>


        )
    } if (user === null) {
        return (
            <div className='navbar'>
                <div>
                    <p style={{cursor:'pointer'}} onClick={() => setNewPage(false)}>HOME</p>
                    <p style={{cursor:'pointer'}} onClick={() => setNewPage(true)}>STATS</p>
                </div>
                <div>
                    <p style={{cursor:'pointer'}} onClick={() => logIn()}>Log In or Sign In </p>
                </div>
            </div>
        )
    }
}

export default Navbar

export { globalDropdown}