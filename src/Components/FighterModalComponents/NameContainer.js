import React, { useRef, useEffect, useState } from 'react'
import { useOnScreen } from '../../utils/functions'

const NameContainer = props => {
    const [setRef, visible] = useOnScreen({ threshold: 0.7 })
    const record = props.record
    const refRank = useRef()

    const conditionalRank = () => {
        if (props.rank === "C") {
            refRank.current.innerText = props.weightclass + " Champion"
        }
    }

    useEffect(() => {
        conditionalRank()
    }, [visible])

    return (
            <div ref={setRef} className="fighterNameContainer container">
                <h1>{props.name} {props.surname}</h1>
                <h2>"{props.nickname}" </h2>
                <div>
                    <span ref={refRank}> #{props.rank} {props.weightclass} division </span> | {record.wins}-{record.losses}-{record.draws} (w-l-d)
                    </div>
            </div>
    )
}

export default NameContainer