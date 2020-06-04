import React, { useEffect, useRef, useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { darkmodeContext } from '../utils/Context.js'
import { auth, db } from '../FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import './css/FighterCard.css'

const FighterCard = (props) => {
    //imports Authstate to check if user is logged in
    const [user] = useAuthState(auth)
    const fighter = props.fighter
    const rankRef = useRef()
    const { dark } = useContext(darkmodeContext)
    const [heartFill, setHeartFill] = useState()
    const notFilledHeart = <FontAwesomeIcon icon={faHeart} />
    const filledHeart = <FontAwesomeIcon icon={['fas', 'heart']} />
    let fightersDb

    // Changes rank innerText if Champion or unranked
    const conditionalRenderRank = () => {
        if(fighter.rank === ""){
            rankRef.current.innerText = '-'
        }
        if(fighter.rank === "C"){
            rankRef.current.innerText = 'C'
            rankRef.current.style.color = 'yellow'
        }
    }
    // Deletes favorite fighter from firestore
    const addDeleteFavorite = () => {
        fightersDb = db.collection(`FighterCollection${user.email}`).doc(`fighterID${fighter.fighterId}`)
        fightersDb.get().then(function (doc) {
            if (doc.exists) {
                fightersDb.delete()
                setHeartFill(false)
            } else {
                fightersDb.set({
                    fighter:fighter
                })
                setHeartFill(true)
            }
        })
    }

    const fillOutHeart = () => {
        fightersDb = db.collection(`FighterCollection${user.email}`).doc(`fighterID${fighter.fighterId}`)
        fightersDb.get().then(function (doc) {
            if (doc.exists) {
                setHeartFill(true)
            } else {
                setHeartFill(false)
            }
        })
    }
    useEffect(() => {
        conditionalRenderRank()

        if(user)fillOutHeart()
    })

    return(
        <div className={dark ? 'card darkColor1' : 'card lightColor1'}>
           {!heartFill && <div onClick={() => addDeleteFavorite()} className='flex-end pointer'>{notFilledHeart}</div> } 
           {heartFill && <div onClick={() => addDeleteFavorite()} className='flex-end pointer'>{filledHeart}</div> }
            <div style={{width:'100%'}}><img style={{width:'100%'}} src={fighter.img1} alt={"Picture of " + fighter.name} /></div>
            <div className='namerankContainerCard'>
                <div className='rankContainerCard'>
                    <p ref={rankRef}>#{fighter.rank}</p>
                    <p style={{fontSize:'1rem'}}>{fighter.weightclassAbb}</p>
                </div>
                <div className='nameContainerCard'>
                    <p>{fighter.name} {fighter.surname}</p>
                </div>
            </div>
        </div>
    )
}

export default FighterCard