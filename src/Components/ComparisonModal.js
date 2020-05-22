import React, { useEffect, useRef } from 'react'
import './css/ComparisonModal.css'
import { useOnScreen } from '../utils/functions'
import { modalReveal } from '../utils/Animations'
import NameAndInfo from './ComparisonModalComponents/NameAndInfo'
import WinByComparison from './ComparisonModalComponents/WinByComparison'
import StrikesComparison from './ComparisonModalComponents/StrikesComparison'
import StrikesByTargetComparison from './ComparisonModalComponents/StrikesByTargetComparison'
import GrapplingComparison from './ComparisonModalComponents/GrapplingComparison'

const ComparisonModal = (props) => {
    const redFighter = props.redFighter
    const blueFighter = props.blueFighter


    return(
        <div className='comparisonContainer'>
            <div className='fighterBox redFighterBox' >
                <div className='cornerStats redCornerStats' style={{alignItems:'center', borderBottom:'2px solid red', paddingBottom:'0.5rem', marginBottom:'1rem'}}>
                    <p style={{fontSize:'1.5rem', textAlign:'center', width:'150%' }}>{redFighter.name} {redFighter.surname}</p>
                    <p style={{alignItems:'flex-end', textAlign:'center', width:'150%' }}>"{redFighter.nickname}"</p>
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
            <div className='fighterBox blueFighterBox'>
                <div className='cornerStats blueCornerStats' style={{alignItems:'center', borderBottom:'2px solid blue', paddingBottom:'0.5rem', marginBottom:'1rem'}}>
                    <p style={{fontSize:'1.5rem', textAlign:'center', width:'150%'}}>{blueFighter.name} {blueFighter.surname}</p>
                    <p style={{alignItems:'flex-end', textAlign:'center', width:'150%'}}>"{blueFighter.nickname}"</p>
                </div>  
                <div className='img3Container' style={{backgroundImage:`url(${blueFighter.img3})`}}></div>
            </div>
        </div>
    )
}

export default ComparisonModal