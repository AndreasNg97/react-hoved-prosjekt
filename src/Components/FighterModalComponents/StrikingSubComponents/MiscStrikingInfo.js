import React, { useEffect, useRef } from 'react'
import { useOnScreen } from '../../../utils/functions'
import { modalReveal } from '../../../utils/Animations'

const MiscStrikingInfo = (props) => {
    const [setRef, visible] = useOnScreen({ threshold: 0.7 })
    let div1 = useRef(null)
    let div2 = useRef(null)

    const revealIfVisible = () => {
        if(visible){
            modalReveal(div1, div2)
        }
    }

    useEffect(() => {
        revealIfVisible()
    },[visible])

    return (
        <div ref={setRef}>
            <div ref={e => {div1 = e}} className='strikingMiscInfoGrid opacityNull'>
                <div style={{width:'80%'}}><p> Strikes Landed pr. min<h2> {props.strikesLandedPerMin}</h2></p></div>
                <div style={{width:'80%'}}><p> Strikes absorbed pr. min<h2> {props.strikesAbsorbedPerMin}</h2></p></div>
            </div>
            <div ref={e => {div2 = e}} className='opacityNull'>
                <p className='text-centered'>Knockdown Ratio<h2 className='text-centered'>{props.knockdownRatio}</h2></p>
            </div>
        </div>
    )
}

export default MiscStrikingInfo