import React from 'react'
import HalfPieChart from '../charts/HalfPieChart'

const GrapplingComparison = (props) => {
    const redGrappling = props.redGrappling
    const blueGrappling = props.blueGrappling
    let redTdAccuracy = Math.floor(redGrappling.takedown_landed / redGrappling.takedown_attempted * 100)
    let blueTdAccuracy = Math.floor(blueGrappling.takedown_landed / blueGrappling.takedown_attempted * 100)
    if(isNaN(redTdAccuracy)){
        redTdAccuracy = 0
    }
    if(isNaN(blueTdAccuracy)){
        blueTdAccuracy = 0
    }

    return(
        <div className='comparisonSectionBox'>
            <p className='sectionTitle'>GRAPPLING</p>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redTdAccuracy}%</p>
                </div>
                <div className='centerOfAll'>
                    <p>TAKEDOWN ACCURACY</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueTdAccuracy}%</p>
                </div>
            </div>
            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redGrappling.takedown_defense}%</p>
                </div>
                <div className='centerOfAll'>
                    <p>DEFENSE</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueGrappling.takedown_defense}%</p>
                </div>
            </div>
            
            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redGrappling.takedown_landed}</p>
                </div>
                <div className='centerOfAll'>
                    <p>TAKEDOWN LANDED</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueGrappling.takedown_landed}</p>
                </div>
            </div>
            
            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redGrappling.avg_takedown_15}</p>
                </div>
                <div className='centerOfAll'>
                    <p>TAKEDOWN AVERAGE PER 15 MIN</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueGrappling.avg_takedown_15}</p>
                </div>
            </div>
            
            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redGrappling.avg_submission_15}</p>
                </div>
                <div className='centerOfAll'>
                    <p>SUBMISSION AVERAGE PER 15 MIN</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueGrappling.avg_submission_15}</p>
                </div>
            </div>
        </div>
    )
}

export default GrapplingComparison