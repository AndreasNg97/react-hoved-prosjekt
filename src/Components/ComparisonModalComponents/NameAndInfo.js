import React, { useContext } from 'react'
import {metricContext} from '../../utils/Context'

const NameAndInfo = (props) => {
    const {metric} = useContext(metricContext)
    const redFighter = props.redFighter
    const blueFighter = props.blueFighter
    const redRecord = props.redFighter.record
    const blueRecord = props.blueFighter.record
    let unit =  " ''"
    let weightUnit = ' lbs'

    let redHeight = redFighter.height
    let redReach = redFighter.reach
    let redLegReach = redFighter.legReach
    let redWeight = redFighter.weight
    const redCmHeight = Math.floor(redFighter.height * 2.54)
    const redCmReach = Math.floor(redFighter.reach * 2.54)
    const redCmLegReach = Math.floor(redFighter.legReach * 2.54)
    const redKgWeight = Math.floor(redFighter.weight * 0.4535)
    
    let blueHeight = blueFighter.height
    let blueReach = blueFighter.reach
    let blueLegReach = blueFighter.legReach
    let blueWeight = blueFighter.weight
    const blueCmHeight = Math.floor(blueFighter.height * 2.54)
    const blueCmReach = Math.floor(blueFighter.reach * 2.54)
    const blueCmLegReach = Math.floor(blueFighter.legReach * 2.54)
    const blueKgWeight = Math.floor(redFighter.weight * 0.4535)

    if(metric){
        redHeight = redCmHeight
        redReach = redCmReach
        redLegReach = redCmLegReach
        redWeight = redKgWeight

        blueHeight = blueCmHeight
        blueReach = blueCmReach
        blueLegReach = blueCmLegReach
        blueWeight = blueKgWeight
        unit = ' cm'
        weightUnit = ' kg'
    }

    return(
        <div className='comparisonSectionBox'>
            <div className='statBoxDiv smallScreenName' style={{marginBottom:'2rem'}}>
                <div className='cornerStats redCornerStats' style={{alignItems:'center', borderBottom:'2px solid red', paddingBottom:'0.5rem'}}>
                    <p style={{fontSize:'1.5rem', textAlign:'center', width:'150%' }}>{redFighter.name} {redFighter.surname}</p>
                    <p style={{alignItems:'flex-end', textAlign:'center', width:'150%' }}>"{redFighter.nickname}"</p>
                </div>   
                <div className='centerOfAll'>
                    <p>VS</p>
                </div>   
                <div className='cornerStats blueCornerStats' style={{alignItems:'center', borderBottom:'2px solid blue', paddingBottom:'0.5rem'}}>
                    <p style={{fontSize:'1.5rem', textAlign:'center', width:'150%'}}>{blueFighter.name} {blueFighter.surname}</p>
                    <p style={{alignItems:'flex-end', textAlign:'center', width:'150%'}}>"{blueFighter.nickname}"</p>
                </div>   
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redRecord.wins} - {redRecord.losses} - {redRecord.draws}</p>
                </div>   
                <div className='centerOfAll'>
                    <p>RECORD</p>
                </div>   
                <div className='cornerStats blueCornerStats'>
                    <p>{blueRecord.wins} - {blueRecord.losses} - {blueRecord.draws}</p>
                </div>   
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redFighter.country}</p>
                </div>   
                <div className='centerOfAll'>
                    <p>COUNTRY</p>
                </div>   
                <div className='cornerStats blueCornerStats'>
                    <p>{blueFighter.country}</p>
                </div>   
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redWeight}{weightUnit}</p>
                </div>   
                <div className='centerOfAll'>
                    <p>WEIGHT</p>
                </div>   
                <div className='cornerStats blueCornerStats'>
                    <p>{blueWeight}{weightUnit}</p>
                </div>   
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redHeight}{unit}</p>
                </div>   
                <div className='centerOfAll'>
                    <p>HEIGHT</p>
                </div>   
                <div className='cornerStats blueCornerStats'>
                    <p>{blueHeight}{unit}</p>
                </div>   
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redReach}{unit}</p>
                </div>   
                <div className='centerOfAll'>
                    <p>REACH</p>
                </div>   
                <div className='cornerStats blueCornerStats'>
                    <p>{blueReach}{unit}</p>
                </div>   
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redLegReach}{unit}</p>
                </div>   
                <div className='centerOfAll'>
                    <p>LEG REACH</p>
                </div>   
                <div className='cornerStats blueCornerStats'>
                    <p>{blueLegReach}{unit}</p>
                </div>   
            </div>
        </div>
    )
}

export default NameAndInfo

