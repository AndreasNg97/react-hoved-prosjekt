import React, { useEffect, useRef } from 'react'
import './css/GeneralInfo.css'
import './css/fighterModal.css'
import { useOnScreen } from '../utils/functions'
import { leftToRightReveal } from '../utils/Animations'
import NameContainer from './FighterModalComponents/NameContainer'
import AllGrappling from './FighterModalComponents/AllGrappling'
import AllStriking from './FighterModalComponents/AllStriking'
import WinByWay from './charts/WinByWay'
import GeneralInfo from './FighterModalComponents/GeneralInfo'
import SocialMedia from './FighterModalComponents/SocialMedia'

const FighterModal = (props) => {
    const [setRef, visible] = useOnScreen({ threshold: 1 })
    const fighter = props.fighter
    const record = fighter.record
    let socialMediaBox = useRef(null)


    const socialReveal = () => {
        if (visible) {
            leftToRightReveal(socialMediaBox, 50, 1)
        }
    }

    useEffect(() => {
        socialReveal()
    }, [visible])

    return (
        <div className="modalCompMain">

            <NameContainer
                name={fighter.name}
                surname={fighter.surname}
                nickname={fighter.nickname}
                rank={fighter.rank}
                weightclass={fighter.weightclass}
                record={record} />

            <div ref={e => { socialMediaBox = e }} className='socialMediaContainer opacityNull '>
                <SocialMedia socialMedia={fighter.socialmedia} />
            </div>

            <GeneralInfo fighter={fighter} />

            <div ref={setRef}></div>


            <WinByWay
                ko={record.ko}
                sub={record.sub}
                dec={record.dec}
                wins={record.wins} />

            <AllStriking fighterStriking={props.fighter.striking} />

            <AllGrappling
                avgFightTime={fighter.avg_fight_time}
                fighterGrappling={props.fighter.grappling} />

        </div>
    )
}

export default FighterModal