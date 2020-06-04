import React, { useEffect, useState, useRef } from 'react'
import { auth, db } from '../FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import FighterContainer2 from './FighterContainer2'
import FighterCard from './FighterCard'
import { NavColors } from '../utils/functions'
import './css/FighterCard.css'


// Hook that shows snapshot of fightcollection in firebase
const useFights2watch = () => {
    const [user] = useAuthState(auth)
    const [fights2watch, setFights2watch] = useState([])
    useEffect(() => {
        if (user) {
            const unsubscribe = db
                .collection(`FightCollection${user.email}`)
                .onSnapshot((snapshot) => {
                    const newFights2watch = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setFights2watch(newFights2watch)
                })
            return () => unsubscribe()
        }
    }, [])
    return fights2watch
}
// Hook that shows snapshot of fightercollection in firebase
const useFighters2watch = () => {
    const [user] = useAuthState(auth)
    const [fighters2watch, setFighters2watch] = useState([])
    useEffect(() => {
        if (user) {
            const unsubscribe = db
                .collection(`FighterCollection${user.email}`)
                .onSnapshot((snapshot) => {
                    const newFighters2watch = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setFighters2watch(newFighters2watch)
                })
            return () => unsubscribe()
        }
    }, [])
    return fighters2watch
}


const Favorites = () => {
    const fights2watch = useFights2watch()
    const fighters2watch = useFighters2watch()
    const [favorite, setFavorite] = useState(true)
    const fightRef = useRef()
    const fighterRef = useRef()
    const [navColor] = NavColors()
    const [title, setTitle] = useState('Fighter List')

    useEffect(() => {
        if (favorite) {
            fightRef.current.style.color = navColor
            fighterRef.current.style.color = 'red'
            setTitle('Fighter List')
        } else {
            fightRef.current.style.color = 'red'
            fighterRef.current.style.color = navColor
            setTitle('Fight List')
        }
    }, [favorite, title])

    return (
        <div >
            <div>
                <div style={{ display: 'flex', marginLeft: '7rem' }}>
                    <p ref={fighterRef} style={{ fontWeight: '500' }} className='navbarBtn pointer' onClick={() => setFavorite(true)}>FIGHTERS</p>
                    <p style={{ fontWeight: '500' }}>|</p>
                    <p ref={fightRef} style={{ fontWeight: '500' }} className='navbarBtn pointer' onClick={() => setFavorite(false)}>FIGHTS</p>
                </div>
                {favorite === false &&
                    fights2watch.map(fight =>
                        <FighterContainer2
                            key={fight.fight.fightId}
                            fight={fight.fight} />
                    )
                }
                {favorite &&
                    <div className='flex-center favoriteFighterBox'>
                        {fighters2watch.map(fighter =>
                            <FighterCard
                                fighter={fighter.fighter} />
                        )}
                    </div>
                }

            </div>
        </div>
    )
}

export default Favorites

