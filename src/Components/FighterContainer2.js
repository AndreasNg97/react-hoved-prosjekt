import React, { useEffect, useRef, useState, useContext } from 'react'
import Modal from 'react-modal'
import FighterModal from './FighterModal.js'
import ComparisonModal from './ComparisonModal.js'
import { reveal, unreveal } from '../utils/Animations'
import { auth, db } from '../FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { darkmodeContext } from '../utils/Context.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons'

const FighterContainer2 = (props) => {
    //imports Authstate to check if user is logged in
    const [user] = useAuthState(auth)
    //Fontawesome variables to shorten tag
    const exitArrow = <FontAwesomeIcon icon={faArrowLeft} size='2x' />
    const notFilledStar = <FontAwesomeIcon icon={faStar} />
    const filledStar = <FontAwesomeIcon icon={['fas', 'star']} />
    const notFilledHeart = <FontAwesomeIcon icon={faHeart} />
    const filledHeart = <FontAwesomeIcon icon={['fas', 'heart']} />

    const fight = props.fight
    const redFighter = props.fight.redCorner
    const blueFighter = props.fight.blueCorner
    //useRefs
    const redRank = useRef()
    const blueRank = useRef()
    const redFighterRef = useRef()
    const blueFighterRef = useRef()
    const TypeOfBout = useRef()
    let redHeart = useRef(null)
    let blueHeart = useRef(null)
    //useStates
    let [fighter, setFighter] = useState()
    const [fill, setFill] = useState()
    const [redHeartFill, setRedHeartFill] = useState()
    const [blueHeartFill, setBlueHeartFill] = useState()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false)
    const [hover, setHover] = useState(false)

    //Utils import
    const { dark } = useContext(darkmodeContext)

    //global variabels to shorten firestore name
    let fightsDb
    let fightersDb

    // modal colors for darkmode and lightmode
    let modalBackgroundColor = dark ? '#1c1f24' : 'white'
    let modalColor = dark ? 'rgba(201, 201, 201)' : 'black'

    //renders different styles and colors for rank and boutInfo( such as Champions, titlebouts and interimTitlebouts )
    const conditionalRendering = () => {
        if (redRank.current.innerText === "")
            redRank.current.style.visibility = "hidden"
        if (blueRank.current.innerText === "")
            blueRank.current.style.visibility = "hidden"
        if (redRank.current.innerText === "C")
            redRank.current.style.border = "1px solid yellow"
        if (fight.titlebout)
            TypeOfBout.current.innerText = `${fight.weightclass} title bout`
        if (fight.interm)
            TypeOfBout.current.innerText = `${fight.weightclass} interim title bout`
    }
    //Add fight to users own firestore collection and fills star
    //Deletes if document exists and unfills star
    const addFight = () => {
        fightsDb = db.collection(`FightCollection${user.email}`).doc(`fightID${fight.fightId}`)

        fightsDb.get().then(function (doc) {
            if (doc.exists) {
                fightsDb.delete()
                setFill(false)
            } else {
                fightsDb.set({
                    fight: fight
                })
                setFill(true)
            }
        })
    }
    //Add red&blue fighters to users own firestore collection and fills heart
    //Deletes if document exists and unfills heart
    const addRedFighter = (e) => {
        e.stopPropagation()
        fightersDb = db.collection(`FighterCollection${user.email}`).doc(`fighterID${redFighter.fighterId}`)
        fightersDb.get().then(function (doc) {
            if (doc.exists) {
                fightersDb.delete()
                setRedHeartFill(false)
            } else {
                fightersDb.set({
                    fighter: redFighter
                })
                setRedHeartFill(true)
            }
        })
    }
    const addBlueFighter = (e) => {
        e.stopPropagation()
        fightersDb = db.collection(`FighterCollection${user.email}`).doc(`fighterID${blueFighter.fighterId}`)
        fightersDb.get().then(function (doc) {
            if (doc.exists) {
                fightersDb.delete()
                setBlueHeartFill(false)
            } else {
                fightersDb.set({
                    fighter: blueFighter
                })
                setBlueHeartFill(true)
            }
        })
    }
    //Options for modal style
    const modalStyle = {
        content: {
            height: '100%',
            width: 'auto',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
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
    //Opens modal and sends either redFighter or blueFighter as props
    const getToModal = (e) => {
        const cn = e.currentTarget.className
        if (cn === 'redCorner') setFighter(redFighter)
        if (cn === 'blueCorner') setFighter(blueFighter)
        setModalIsOpen(true)
    }
    Modal.setAppElement('#root')

    const starFill = () => {
        fightsDb = db.collection(`FightCollection${user.email}`).doc(`fightID${fight.fightId}`)
        fightsDb.get().then(function (doc) {
            if (doc.exists) {
                setFill(true)
            } else {
                setFill(false)
            }
        })
    }

    const redFill = () => {
        fightersDb = db.collection(`FighterCollection${user.email}`).doc(`fighterID${redFighter.fighterId}`)
        fightersDb.get().then(function (doc) {
            if (doc.exists) {
                setRedHeartFill(true)
            } else {
                setRedHeartFill(false)
            }
        })
    }
    
    const blueFill = () => {
        fightersDb = db.collection(`FighterCollection${user.email}`).doc(`fighterID${blueFighter.fighterId}`)
        fightersDb.get().then(function (doc) {
            if (doc.exists) {
                setBlueHeartFill(true)
            } else {
                setBlueHeartFill(false)
            }
        })
    }
    //Function that makes filled heart not dissapear
    const hearts = () => {
        if(hover && !redHeartFill && !blueHeartFill) reveal(redHeart, blueHeart)
        if(!hover && !redHeartFill && !blueHeartFill) unreveal(redHeart, blueHeart)
        if(!hover && redHeartFill && blueHeartFill) return
        if(hover && redHeartFill) reveal(blueHeart)
        if(hover && blueHeartFill) reveal(redHeart)
        if(!hover && redHeartFill) unreveal(blueHeart)
        if(!hover && blueHeartFill) unreveal(redHeart)
        
    }
    useEffect(() => {
        conditionalRendering()
        if (user) {
            hearts()
            starFill()
            redFill()
            blueFill()
        }
    })
    return (
        <div
            className={dark ? 'fightContainer2 darkColor1 darkmodeHover' : 'fightContainer2 lightColor1 lightmodeHover'}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={() => setModalIsOpen(false)}>
                <div className='exitArrow' onClick={() => setModalIsOpen(false)}>
                    {exitArrow}
                </div>
                <FighterModal fighter={fighter} />
            </Modal>

            <Modal
                isOpen={isComparisonModalOpen}
                style={modalStyle}
                onRequestClose={() => setIsComparisonModalOpen(false)}>
                <div style={{ margin: '1rem', cursor: 'pointer' }} onClick={() => setIsComparisonModalOpen(false)}>
                    {exitArrow}
                </div>
                <ComparisonModal
                    redFighter={redFighter}
                    blueFighter={blueFighter} />
            </Modal>

            <div ref={redFighterRef} className='redCorner' onClick={(e) => getToModal(e)}>
                <div className='listImgContainer' >
                    <img src={redFighter.img1} alt={redFighter.name} className='listImg' />
                </div>
                <div className='rankContainer2 flex-center'>
                    {redHeartFill && <div className='redHeartFilled' ref={e => { redHeart = e }} onClick={(e) => addRedFighter(e)}>
                        {filledHeart}
                    </div>}
                    {!redHeartFill && <div className='redHeart' ref={e => { redHeart = e }} onClick={(e) => addRedFighter(e)}>
                        {notFilledHeart}
                    </div>}
                    <div ref={redRank} className='flex-center rankSquare'>
                        <h3>{redFighter.rank}</h3>
                    </div>
                </div>
                <div className='nameContainer2 flex-center' onClick={(e) => getToModal(e)}>
                    <p style={{ textAlign: "start" }}>{redFighter.name} {redFighter.surname}</p>
                </div>
            </div>

            <div className='boutContainer2'>
                <p ref={TypeOfBout} style={{ textAlign: 'center' }} onClick={() => setIsComparisonModalOpen(true)}>{fight.weightclass}bout</p>
                <div className='vsBox flex-center' onClick={() => setIsComparisonModalOpen(true)}>
                    <div className='vsLine2 vsLine2red' />
                    <h3>VS</h3>
                    <div className='vsLine2 vsLine2blue' />
                </div>
                {user &&
                    <div>
                        {fill && <div style={{marginBottom:'0.5rem'}} onClick={() => addFight()}>{filledStar}</div>}
                        {!fill && <div style={{marginBottom:'0.5rem'}} onClick={() => addFight()}>{notFilledStar}</div>}
                    </div>
                }
            </div>
 
            <div ref={blueFighterRef} className='blueCorner' onClick={(e) => getToModal(e)}>
                <div className='listImgContainer' >
                    <img src={blueFighter.img1} alt={blueFighter.name} className='listImg' />
                </div>
                <div className='rankContainer2 flex-end'>
                    <div ref={blueRank} className='flex-center rankSquare'>
                        <h3>{blueFighter.rank}</h3>
                    </div>
                    {blueHeartFill && 
                    <div className='blueHeartFilled' ref={e => { blueHeart = e }} onClick={(e) => addBlueFighter(e)}>
                        {filledHeart}
                    </div>}

                    {!blueHeartFill && 
                    <div className='blueHeart' ref={e => { blueHeart = e }} onClick={(e) => addBlueFighter(e)}>
                        {notFilledHeart}
                    </div>}
                </div>
                <div className='nameContainer2 flex-end' onClick={(e) => getToModal(e)}>
                    <p style={{ textAlign: "end" }}>{blueFighter.name} {blueFighter.surname}</p>
                </div>
            </div>
        </div>
    )
}

export default FighterContainer2