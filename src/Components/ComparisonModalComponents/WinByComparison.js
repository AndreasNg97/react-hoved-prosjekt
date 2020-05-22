import React from 'react'
import WinByComparisonChart from '../charts/WinByComparisonChart'

const WinByComparison = (props) => {
    const redRecord = props.redRecord
    const blueRecord = props.blueRecord

    const redSubRate = Math.floor(redRecord.sub / redRecord.wins * 100)
    const redKoRate = Math.floor(redRecord.ko / redRecord.wins * 100)
    const blueSubRate = Math.floor(blueRecord.sub / blueRecord.wins * 100)
    const blueKoRate = Math.floor(blueRecord.ko / blueRecord.wins * 100)
    const redFinishRate = redSubRate + redKoRate
    const blueFinishRate = blueSubRate + blueKoRate

    return(
        <div className='comparisonSectionBox'>
            <p className='sectionTitle'>WIN BY WAY</p>
            <div className='statBoxChart'>
            <WinByComparisonChart 
                    redWins = {redRecord.wins}
                    redKo = {redRecord.ko}
                    redSub = {redRecord.sub}
                    redDec = {redRecord.dec}
                    blueWins = {blueRecord.wins}
                    blueKo = {blueRecord.ko}
                    blueSub = {blueRecord.sub}
                    blueDec = {blueRecord.dec}/>
            </div>
            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redFinishRate}%</p>
                </div>
                <div className='centerOfAll'>
                    <p>FINISH RATE</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueFinishRate}%</p>
                </div>
            </div>
            
            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{props.redKnockdownRate}</p>
                </div>
                <div className='centerOfAll'>
                    <p>KNOCKDOWN RATE</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{props.blueKnockdownRate}</p>
                </div>
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{props.redFightTime}</p>
                </div>
                <div className='centerOfAll'>
                    <p>AVERAGE FIGHT TIME</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{props.blueFightTime}</p>
                </div>
            </div>
        </div>
    )
}

export default WinByComparison

