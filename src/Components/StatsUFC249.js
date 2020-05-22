import React, { useEffect } from 'react'
import fightcard from '../files/fightcard'

const StatsUFC249 = () => {
    const mainfights = fightcard.main
    const prelimfights = fightcard.prelims
    const earlyprelimfights = fightcard.earlyprelims
    let fighterArr = []

    mainfights.map( mainfight =>
            fighterArr.push(mainfight)
        )
    useEffect(() => {
        console.log(fighterArr)
    })
    
    return(
        <div>
        </div>
    )
}

export default StatsUFC249