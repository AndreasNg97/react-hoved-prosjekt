import React, {useEffect, useRef} from 'react'
import { useOnScreen } from '../../../utils/functions'
import { modalReveal } from '../../../utils/Animations'

const MiscGrapplingInfo = (props) => {
    const [setRef, visible] = useOnScreen({ threshold: 0.7 })
    let div1 = useRef(null)
    let div2 = useRef(null)
    let div3 = useRef(null)

    const revealIfVisible = () => {
        if(visible){
            modalReveal(div1, div2, div3)
        }
    }
    useEffect(() => {
        revealIfVisible()
    },[visible])
    return(
        <div ref={setRef} className='grapplingMiscInfoFlex' >
            <div  ref={e => {div1 = e}} className='opacityNull'>
                <p> Avg. Takedown pr. 15min<h2> {props.avgTD15}</h2></p>
            </div>

            <div  ref={e => {div2 = e}} className='opacityNull'>
                <p> Avg. Submission pr. 15min<h2> {props.avgSub15}</h2></p>
            </div>

            <div  ref={e => {div3 = e}} className='opacityNull'>
                <p> Avg. Fight Time<h2> {props.avgFightTime}</h2></p>
            </div>
        </div>
    )
}

export default MiscGrapplingInfo