import React from 'react'
import '../css/AllStrikingAndGrappling.css'
import StrikeAccuracy from '../charts/StrikeAccuracy'
import StrikeDefense from '../charts/StrikeDefense'
import StrikeByPosition from '../charts/StrikeByPosition'
import MiscStrikingInfo from './StrikingSubComponents/MiscStrikingInfo'
import StrikingByTarget from './StrikingSubComponents/StrikeByTarget'


const AllStriking = (props) => {
    const striking = props.fighterStriking

    return (
        <div className='allStriking container'>
            <div className='sectionH1'>
                <h1>STRIKING</h1>
            </div>
            <div className='strikingBodyContent'>
                <div className="chartContainer">
                    <StrikeAccuracy
                        strikesAttempted={striking.sig_strike_attempted}
                        strikesLanded={striking.sig_strike_landed} />
                </div>
                <div className="chartContainer">
                    <StrikeDefense strikingDefense={striking.sig_strike_defense} />
                </div>

                <div className='chartContainer barChartContainer'>
                    <StrikeByPosition
                        standing={striking.sig_strike_standing}
                        clinch={striking.sig_strike_clinch}
                        ground={striking.sig_strike_ground}
                        total={striking.sig_strike_landed} />
                </div>
                <div className='strikingMiscInfo chartContainer'>
                    <MiscStrikingInfo 
                        strikesLandedPerMin={striking.sig_strike_landed_min}
                        strikesAbsorbedPerMin={striking.sig_strike_absorbed_min}
                        knockdownRatio={striking.knockdown_ratio}
                    />
                </div>
            </div>
            <div style={{ marginTop: '2.1rem' }}>
                <StrikingByTarget 
                    headStrikes={striking.sig_strike_head}
                    bodyStrikes={striking.sig_strike_body}
                    legStrikes={striking.sig_strike_leg}
                    totalLanded={striking.sig_strike_landed}/>
            </div>
        </div>
    )
}

export default AllStriking
