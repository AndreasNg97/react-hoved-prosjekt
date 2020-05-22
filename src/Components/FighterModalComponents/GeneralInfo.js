import React, {useRef, useEffect, useContext} from 'react'
import {modalReveal} from '../../utils/Animations'
import {metricContext} from '../../utils/Context'

const GeneralInfo = (props) => {
    const fighter = props.fighter
    let height = fighter.height
    let reach = fighter.reach
    let legReach = fighter.legReach

    const cmHeight = Math.floor(height * 2.54)
    const cmReach = Math.floor(reach * 2.54)
    const cmLegReach = Math.floor(legReach * 2.54)

    const {metric} = useContext(metricContext)
    const flagurl = "https://www.countryflags.io/"
    const flagurl2 = "/shiny/24.png"
    const fighterFlag = flagurl + fighter.countryCode + flagurl2
    let unit = "''"
    let fighterImg = useRef(null)
    let infoContainer = useRef(null)

    if(metric){
        height = cmHeight
        reach = cmReach
        legReach = cmLegReach
        unit = 'cm'
    }

    useEffect(() => {
        modalReveal(fighterImg, infoContainer)
    }, [unit])



    return (
        <div className='generalInfo container'>
            <div className='imgContainer'>
                <img
                    className='opacityNull' 
                    ref={e => {fighterImg = e}} 
                    src={fighter.img2} />
            </div>
            <div ref={e => {infoContainer = e}} className="infoContainer opacityNull">
                <div className="infoSection1">
                    <p>Country<h2>{fighter.country} <img src={fighterFlag} /></h2></p>
                    <p>Hometown<h2>{fighter.hometown}</h2></p>
                    <p>Age<h2>{fighter.age}</h2></p>
                </div>
                <div className="infoSection2">
                    <div><p>Trains at<h2>{fighter.trainsAt}</h2></p></div>
                    <div><p>Fighting Style<h2>{fighter.fightingStyle}</h2></p></div>
                    <div><p>Octagon Debut:<h2>{fighter.octagon_debut}</h2></p></div>
                </div>
                <div className="infoSection3">
                    <p>Height <h2>{ height} {unit}</h2></p>
                    <p>Reach <h2>{ reach } {unit}</h2></p>
                    <p>Leg Reach <h2>{ legReach } {unit}</h2></p>
                </div>
            </div>
        </div>
    )
}

export default GeneralInfo