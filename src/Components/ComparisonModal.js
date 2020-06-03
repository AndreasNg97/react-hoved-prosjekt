import React, { useEffect, useRef } from 'react'
import './css/ComparisonModal.css'
import { rightToLeftReveal, leftToRightReveal } from '../utils/Animations'
import NameAndInfo from './ComparisonModalComponents/NameAndInfo'
import WinByComparison from './ComparisonModalComponents/WinByComparison'
import StrikesComparison from './ComparisonModalComponents/StrikesComparison'
import StrikesByTargetComparison from './ComparisonModalComponents/StrikesByTargetComparison'
import GrapplingComparison from './ComparisonModalComponents/GrapplingComparison'

const ComparisonModal = (props) => {
    const redFighter = props.redFighter
    const blueFighter = props.blueFighter
    let redBox = useRef(null)
    let blueBox = useRef(null)

    useEffect(() => {
        leftToRightReveal(redBox, 50, 1)
        rightToLeftReveal(blueBox, 50, 1)
    })

    return(
        <div className='comparisonContainer'>
            <div ref={e => {redBox = e}} className='fighterBox redFighterBox opacityNull' >
                <div className='cornerStats comparisonNameRedContainer'>
                    <p className='comparisonName' style={{fontSize:'1.5rem'}}>{redFighter.name} {redFighter.surname}</p>
                    <p className='comparisonName' >"{redFighter.nickname}"</p>
                </div>   
                <div className='img3Container' style={{backgroundImage:`url(${redFighter.img3})`}}></div>
            </div>
            <div className='statBox'>
                <NameAndInfo 
                    redFighter={redFighter}
                    blueFighter={blueFighter}/>
                <WinByComparison 
                    redRecord={redFighter.record}
                    blueRecord={blueFighter.record}
                    redKnockdownRate = {redFighter.striking.knockdown_ratio}
                    blueKnockdownRate = {blueFighter.striking.knockdown_ratio}
                    redFightTime = {redFighter.avg_fight_time}
                    blueFightTime = {blueFighter.avg_fight_time}/>

                <StrikesComparison 
                    redStriking={redFighter.striking}
                    blueStriking={blueFighter.striking}/>
                <StrikesByTargetComparison 
                    redStriking={redFighter.striking}
                    blueStriking={blueFighter.striking}/>
                <GrapplingComparison 
                    redGrappling={redFighter.grappling}
                    blueGrappling={blueFighter.grappling}/>

            </div>
            <div ref={e => {blueBox = e}} className='fighterBox blueFighterBox opacityNull'>
                <div className='cornerStats comparisonNameBlueContainer'>
                    <p className='comparisonName' style={{fontSize:'1.5rem'}}>{blueFighter.name} {blueFighter.surname}</p>
                    <p className='comparisonName'>"{blueFighter.nickname}"</p>
                </div>  
                <div className='img3Container' style={{backgroundImage:`url(${blueFighter.img3})`}}></div>
            </div>
        </div>
    )
}

export default ComparisonModal