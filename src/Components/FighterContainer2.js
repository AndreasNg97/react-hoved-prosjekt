import React,{ useEffect, useRef, useState, useContext } from 'react'
import Modal from 'react-modal'
import FighterModal from './FighterModal.js'
import ComparisonModal from './ComparisonModal.js'
import { darkmodeContext } from '../utils/Context.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const FighterContainer2 = (props) => {
    const exitArrow = <FontAwesomeIcon icon={faArrowLeft} size='2x' />
    const fight = props.fight
    const redFighter = props.fight.redCorner
    const blueFighter = props.fight.blueCorner
    const redRank = useRef()
    const blueRank = useRef()
    const redFighterRef = useRef()
    const blueFighterRef = useRef()
    const TypeOfBout = useRef()
    
    let [fighter, setFighter] = useState()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false)

    const { dark } = useContext(darkmodeContext)
    let modalBackgroundColor = dark ? '#1c1f24' : 'white'
    let modalColor = dark ? 'rgba(201, 201, 201)' : 'black'

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
    };

    const getToModal = (e) => {
        const cn = e.currentTarget.className
        if (cn === 'redCorner') {
            setFighter(redFighter)
        }
        if (cn === 'blueCorner') {
            setFighter(blueFighter)
        }
        setModalIsOpen(true)
    }
    Modal.setAppElement('#root')


    useEffect(() => {
        conditionalRendering()
    })
    return(
        <div className={dark ? 'fightContainer2 darkColor1 darkmodeHover' : 'fightContainer2 lightmodeHover'}>
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
                    <img src={redFighter.img1} alt={redFighter.name} className='listImg'/>
                </div>
                <div className='rankContainer2 flex-center'>
                    <div ref={redRank} className='flex-center rankSquare'>
                        <h3>{redFighter.rank}</h3>
                    </div>
                </div>
                <div className='nameContainer2 flex-center' onClick={(e) => getToModal(e)}>
                    <p style={{textAlign:"start"}}>{redFighter.name} {redFighter.surname}</p>
                </div>
            </div>

            <div className='boutContainer2'>
                <p ref={TypeOfBout} style={{textAlign:'center'}} onClick={() => setIsComparisonModalOpen(true)}>{fight.weightclass}bout</p>
                <div className='vsBox flex-center' onClick={() => setIsComparisonModalOpen(true)}>
                    <div className='vsLine2 vsLine2red' />
                    <h3>VS</h3>
                    <div className='vsLine2 vsLine2blue' />
                </div>
            </div>

            <div ref={blueFighterRef} className='blueCorner' onClick={(e) => getToModal(e)}>
                <div className='listImgContainer' >
                    <img src={blueFighter.img1} alt={blueFighter.name} className='listImg'/>
                </div>
                <div className='rankContainer2 flex-center' style={{justifyContent: 'flex-end'}}>
                    <div ref={blueRank} className='flex-center rankSquare'>
                        <h3>{blueFighter.rank}</h3>
                    </div>
                </div>
                <div className='nameContainer2 flex-center' onClick={(e) => getToModal(e)} style={{justifyContent: 'flex-end'}}>
                    <p style={{textAlign:"end"}}>{blueFighter.name} {blueFighter.surname}</p>
                </div>
            </div>
        </div>
    )
}

export default FighterContainer2