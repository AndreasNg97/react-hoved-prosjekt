import React from 'react'
import '../css/AllStrikingAndGrappling.css'
import TakedownAccuracy from '../charts/TakedownAccuracy'
import TakedownDefense from '../charts/TakedownDefense'
import MiscGrapplingInfo from './GrapplingSubComponents/MiscGrapplingInfo'

const AllGrappling = (props) => {

    const grappling = props.fighterGrappling
    const avgFightTime = props.avgFightTime

    return (

            <div className="allGrappling container">
                <h1 className='sectionH1'>GRAPPLING</h1>
                <div className='grapplingBodyContent'>
                    <div className='chartContainer' style={{border:'none'}}>
                        <TakedownAccuracy
                            tdLanded={grappling.takedown_landed}
                            tdAttempted={grappling.takedown_attempted} />
                    </div>
                    <div className='grapplingMiscInfo' >
                        <MiscGrapplingInfo 
                            avgTD15={grappling.avg_takedown_15}
                            avgSub15={grappling.avg_submission_15}
                            avgFightTime={avgFightTime}
                        />
                    </div>
                    <div className='chartContainer' style={{border:'none'}}>
                        <TakedownDefense tdDefense={grappling.takedown_defense} />
                    </div>
                </div>
            </div>
    )
}

export default AllGrappling