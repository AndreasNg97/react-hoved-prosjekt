import React from 'react'

const StrikesComparison = (props) => {
    const redStriking = props.redStriking
    const blueStriking = props.blueStriking
    //Getting Striking accuracy 
    const redAccuracy = Math.floor( redStriking.sig_strike_landed / redStriking.sig_strike_attempted * 100 )
    const blueAccuracy = Math.floor( blueStriking.sig_strike_landed / blueStriking.sig_strike_attempted * 100 )

    return(
        <div className='comparisonSectionBox'>
            <p className='sectionTitle'>STRIKING</p>
            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redAccuracy}%</p>
                </div>
                <div className='centerOfAll'>
                    <p>ACCURACY</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueAccuracy}%</p>
                </div>
            </div>
            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redStriking.sig_strike_defense}%</p>
                </div>
                <div className='centerOfAll'>
                    <p>DEFENSE</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueStriking.sig_strike_defense}%</p>
                </div>
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redStriking.sig_strike_landed_min}</p>
                </div>
                <div className='centerOfAll'>
                    <p>LANDED PER MIN</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueStriking.sig_strike_landed_min}</p>
                </div>
            </div>

            <div className='statBoxDiv'>
                <div className='cornerStats redCornerStats'>
                    <p>{redStriking.sig_strike_absorbed_min}</p>
                </div>
                <div className='centerOfAll'>
                    <p>ABSORBED PER MIN</p>
                </div>
                <div className='cornerStats blueCornerStats'>
                    <p>{blueStriking.sig_strike_absorbed_min}</p>
                </div>
            </div>

        </div>
    )
}

export default StrikesComparison