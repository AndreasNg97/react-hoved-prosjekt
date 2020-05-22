import React from 'react'
import body from '../../img/body.png'


const StrikesByTargetComparison = (props) => {

    const redStriking = props.redStriking
    const blueStriking = props.blueStriking
    const redHeadPrencentage = Math.floor(props.redStriking.sig_strike_head / props.redStriking.sig_strike_landed * 100)
    const redBodyPrencentage = Math.floor(props.redStriking.sig_strike_body / props.redStriking.sig_strike_landed * 100)
    const redLegPrencentage = Math.floor(props.redStriking.sig_strike_leg / props.redStriking.sig_strike_landed * 100)

    const blueHeadPrencentage = Math.floor(props.blueStriking.sig_strike_head / props.blueStriking.sig_strike_landed * 100)
    const blueBodyPrencentage = Math.floor(props.blueStriking.sig_strike_body / props.blueStriking.sig_strike_landed * 100)
    const blueLegPrencentage = Math.floor(props.blueStriking.sig_strike_leg / props.blueStriking.sig_strike_landed * 100)


    return (
        <div className='comparisonSectionBox'>
            <p className='sectionTitle'>STRIKES BY TARGET</p>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redStriking.sig_strike_head} ({redHeadPrencentage}%)</p>
                </div>
                <div className='centerOfAll'>
                    <p>HEAD</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueStriking.sig_strike_head} ({redBodyPrencentage}%)</p>
                </div>
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redStriking.sig_strike_body} ({redLegPrencentage}%)</p>
                </div>
                <div className='centerOfAll'>
                    <p>BODY</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueStriking.sig_strike_body} ({blueHeadPrencentage}%)</p>
                </div>
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redStriking.sig_strike_leg} ({blueBodyPrencentage}%)</p>
                </div>
                <div className='centerOfAll'>
                    <p>LEG</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueStriking.sig_strike_leg} ({blueLegPrencentage}%)</p>
                </div>
            </div>
        </div>
    )
}

export default StrikesByTargetComparison

/* 
        <div className='comparisonSectionBox'>
            <p className='sectionTitle'>STRIKES BY TARGET</p>
            <div className='byTargetSectionBox'>
                <div className='redSideOfBody sideOfBody'>
                    <div>
                        <p>{redStriking.sig_strike_head} ({redHeadPrencentage}%)</p>
                        <div className='comparisonLine headLineComparison redHeadLine'></div>
                    </div>                    
                    <div>
                        <p>{redStriking.sig_strike_body} ({redBodyPrencentage}%)</p>
                        <div className='comparisonLine bodyLineComparison redBodyLine'></div>
                    </div>                    
                    <div>
                        <p>{redStriking.sig_strike_leg} ({redLegPrencentage}%)</p>
                        <div className='comparisonLine legLineComparison redLegLine'></div>
                    </div>                    
                </div>
                <div className='centerOfAll'>
                    <img src={body} style={{ width: '50%' }} />
                </div>
                <div className='blueSideOfBody sideOfBody'>
                    <div>
                        <div className='comparisonLine headLineComparison blueHeadLine'></div>
                        <p>{blueStriking.sig_strike_head} ({blueHeadPrencentage}%)</p>
                    </div>
                    <div>
                        <div className='comparisonLine bodyLineComparison blueBodyLine'></div>
                        <p>{blueStriking.sig_strike_body} ({blueBodyPrencentage}%)</p>
                    </div>
                    <div>
                        <div className='comparisonLine legLineComparison blueLegLine'></div>
                        <p>{blueStriking.sig_strike_leg} ({blueLegPrencentage}%)</p>
                    </div>
                </div>
            </div>
        </div>
*/