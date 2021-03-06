import React from 'react'
import fightcard from '../files/fightcard.js'
import FighterContainer2 from './FighterContainer2.js'
import './css/FightList2.css'

// Component mapping all the fighters from earlyprelims, prelims and main into one page.
const FightList = () => {
    const mainfights = fightcard.main
    const prelimfights = fightcard.prelims
    const earlyprelimfights = fightcard.earlyprelims
    
    return(
        <div className='fightListMain2'>
            <div className='fightListSection main'>
                <div style={{width:'100%', minWidth:'745px'}}>
                    <h1 style={{textAlign:'center', margin:'4rem 0 1rem 0'}}>MAIN CARD</h1>
                </div>
                {mainfights.map( fight =>
                    <FighterContainer2
                        key={fight.fightId}
                        fight={fight}/>
                )}
            </div>

            <div className='fightListSection prelims'>
                <div style={{width:'100%', minWidth:'745px'}}>
                    <h1 style={{textAlign:'center', margin:'4rem 0 1rem 0'}}> PRELIMS</h1>
                </div>
                {prelimfights.map( fight =>
                    <FighterContainer2
                        key={fight.fightId}
                        fight={fight}/>
                )}
            </div>

            <div className='fightListSection earlyprelims'>
                <div style={{width:'100%', minWidth:'745px'}}>
                    <h1 style={{textAlign:'center', margin:'4rem 0 1rem 0'}}>EARLY PRELIMS</h1>
                </div>
                {earlyprelimfights.map( fight =>
                    <FighterContainer2
                        key={fight.fightId}
                        fight={fight}/>
                )}
            </div>
        </div>
    )
} 
export default FightList