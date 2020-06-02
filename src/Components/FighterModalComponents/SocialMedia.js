import React, { useRef, useEffect, useState, useContext } from 'react'
import { addMargin, shrinkMargin } from '../../utils/Animations'
import '../css/SocialMedia.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { darkmodeContext } from '../../utils/Context'



const SocialMedia = (props) => {
    const socialMedia = props.socialMedia
    const [hover, setHover] = useState(false)

    let logoContainer1 = useRef(null)
    let logoContainer2 = useRef(null)
    let logoContainer3 = useRef(null)

    const logo1 = useRef()
    const logo2 = useRef()
    const logo3 = useRef()

    const {dark} = useContext(darkmodeContext)

    const removeSocial = () => {
        if (socialMedia.instagram === '') logo1.current.style.display = 'none'
        if (socialMedia.twitter === '') logo2.current.style.display = 'none'
        if (socialMedia.facebook === '') logo3.current.style.display = 'none'
    }

    const hoverAnimation = () => {
        hover ? addMargin(logoContainer1, logoContainer2, logoContainer3): shrinkMargin(logoContainer1, logoContainer2, logoContainer3)
    }

    let logoColor = dark ? 'white' : '#000000'

    useEffect(() => {
        hoverAnimation()
        removeSocial()
    })

    return (
        <div
            className='logoWrapper'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <div ref={e => { logoContainer1 = e }} className='logoContainer'>
                <a href={socialMedia.instagram} target="_blank">
                    <div ref={logo1}>
                        <FontAwesomeIcon icon={['fab', 'instagram']} size='2x' textDecoration='none' color={logoColor} className='logo'/>
                    </div>
                </a>
            </div>

            <div ref={e => { logoContainer2 = e }} className='logoContainer'>
                <a href={socialMedia.twitter} target="_blank">
                    <div ref={logo2}>
                        <FontAwesomeIcon icon={['fab', 'twitter']} size='2x' textDecoration='none' color={logoColor} className='logo'/>
                    </div>
                </a>
            </div>

            <div ref={e => { logoContainer3 = e }} className='logoContainer'>
                <a href={socialMedia.facebook} target="_blank">
                    <div ref={logo3}>
                        <FontAwesomeIcon icon={['fab', 'facebook']} size='2x' textDecoration='none' color={logoColor} className='logo'/>
                    </div>
                </a>
            </div>
        </div>

    )
}

export default SocialMedia