import React, {useRef, useEffect} from 'react'
import { lineGrowth, leftToRightReveal } from '../../../utils/Animations'
import { useOnScreen } from '../../../utils/functions'
import bodypng from '../../../img/body.png'

const StrikeByTarget = (props) => {
    const [setRef, visible] = useOnScreen({ threshold: 0.6 })
    const headStrikesPrecentage = props.headStrikes / props.totalLanded * 100
    const bodyStrikesPrecentage = props.bodyStrikes / props.totalLanded * 100
    const legStrikesPrecentage = props.legStrikes / props.totalLanded * 100
    
    let lineToHead = useRef(null)
    let lineToBody = useRef(null)
    let lineToLeg = useRef(null)
    let headStrikes = useRef(null)
    let bodyStrikes = useRef(null)
    let legStrikes = useRef(null)
    let bodyImg = useRef(null)

    const animationStart = () => {
        if(visible){
            lineGrowth(
                lineToHead,
                lineToBody,
                lineToLeg,
                headStrikes,
                bodyStrikes,
                legStrikes
            )
            leftToRightReveal(bodyImg, 25, 1 )
        }
    }

    useEffect(() => {
        animationStart()
    },[visible])

    return (
        <div className='container byTargetContainer' ref={setRef}>
            <div className='sectionH1'><h1>STRIKING BY TARGET</h1></div>
            <div className='strikingByTarget'>
                <div style={{ height: '500px' }}>
                    <img ref={e => {bodyImg = e}} src={bodypng} alt='body' />
                </div>
                <div className='byTargetStats'>
                    <section className='head'>
                        <h3 ref={e => {lineToHead = e}}>{props.headStrikes} ({Math.floor(headStrikesPrecentage)}%)</h3>
                        <div ref={e => {headStrikes = e}}  className='lineToHead line'></div>
                    </section>

                    <section className='body'>
                        <h3 ref={e => {lineToBody = e}} >{props.bodyStrikes} ({Math.floor(bodyStrikesPrecentage)}%)</h3>
                        <div ref={e => {bodyStrikes = e}}  className='lineToBody line'></div>
                    </section>

                    <section>
                        <h3 ref={e => {lineToLeg = e}} >{props.legStrikes} ({Math.floor(legStrikesPrecentage)}%)</h3>
                        <div ref={e => {legStrikes = e}}  className='lineToLeg line'></div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default StrikeByTarget

