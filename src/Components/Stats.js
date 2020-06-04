import React, { useEffect, useState, useContext} from 'react'
import { ChartColor } from '../utils/functions'
import { HorizontalBar } from 'react-chartjs-2'
import { metricContext } from '../utils/Context'
import fightcard from '../files/fightcard'
import FighterCard from '../Components/FighterCard'
import './css/Stats.css'

const Stats = () => {
    // Empty arrays
    let fighters = []
    let fighterName = []
    let fighterSelectedData = []
    // useStates
    const [fighterList] = useState(fighters)
    const [chartData, setChartData] = useState({})
    const [fighterData, setFighterData] = useState()
    const [unit, setUnit] = useState()
    const [highlightData, setHighlightData] = useState(false)
    // Utils imports
    const [color] = ChartColor()
    const { metric } = useContext(metricContext)

    // Pushes name and surname of fighter to FighterName array
    fighterList.map(fighter =>
        fighterName.push(fighter.name + ' ' + fighter.surname)
    )

    // Pushes fighter from Main, Prelim, and Earlyprelim into one array (fighters)
    fightcard.main.map(mainfight =>
        fighters.push(mainfight.redCorner, mainfight.blueCorner)
    )
    fightcard.prelims.map(prelimfight =>
        fighters.push(prelimfight.redCorner, prelimfight.blueCorner)
    )
    fightcard.earlyprelims.map(earlyprelimfight =>
        fighters.push(earlyprelimfight.redCorner, earlyprelimfight.blueCorner)
    )

    //Function that checks what kind of data is being pressed
    const selectData = (selectedData) => {
        const selectedDatas = {
            age: 'age',
            height: 'height',
            reach: 'reach',
            legReach: 'legReach',
            wins: 'wins',
            losses: 'losses',
            ko: 'ko',
            sub: 'sub',
            dec: 'dec',
            winstreak: 'current_win_streak'
        }
        const sdProp = selectedDatas[selectedData]
        // Marks what kind of data is being shown by changing color of dataBtn to red
        setHighlightData(sdProp)

        fighterList.map(fighter => {
            //If metric is true the data will be shown in Centimeters
            if (metric) {
                if (sdProp === 'height' || sdProp === 'reach' || sdProp === 'legReach') {
                    fighterSelectedData.push(Math.floor(fighter[sdProp] * 2.54))
                }
            }
            //If metris is false the data will be shown in inches
            if (!metric) {
                if (sdProp === 'height' || sdProp === 'reach' || sdProp === 'legReach') {
                    fighterSelectedData.push(fighter[sdProp])
                }
            }
            if (sdProp === 'age') {
                fighterSelectedData.push(fighter[sdProp])
            }
            if (sdProp === 'wins' || sdProp === 'losses' || sdProp === 'current_win_streak' || sdProp === 'ko' || sdProp === 'sub' || sdProp === 'dec') {
                fighterSelectedData.push(fighter.record[sdProp])
            }
        })
        //After pushing selected datas to fighterSelectedData, the function sets fighterData to be fighterSelectedData ( setFighterData(fighterSelectedData) )
        setFighterData(fighterSelectedData)
    }

    // Creates a chart using fighterName as labels, and fighterData as data. 
    const chart = () => {
        setChartData({
            labels: fighterName,
            datasets: [{
                data: fighterData,
                backgroundColor: color,
                barThickness: 20,
            }]
        })
    }

    // Options for Chart
    const options = {
        responsive: true,
        legend: { display: false },
        events: ['null'],
        plugins: {
            datalabels: {
                clamp: true,
                align: 'start',
                anchor: 'end',
                color: 'white',
                display: function (context) {
                    return context.dataset.data[context.dataIndex] !== 0
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: { beginAtZero: true },
                offset: true
            }],
            xAxes: [{
                ticks: { beginAtZero: true },
            }]
        },


    }

    useEffect(() => {
        chart()
        if(metric) setUnit('(CM)')
        if(!metric) setUnit('(IN)')
    }, [fighterData, metric ])

    return (
        <div className='mainStatsDiv flex-center'>
            <div className='flex-center btnContainer'>
                <div data-value='age' className={highlightData === 'age' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>AGE</div>
                <div data-value='height' className={highlightData === 'height' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>HEIGHT {unit}</div>
                <div data-value='reach' className={highlightData === 'reach' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>REACH {unit}</div>
                <div data-value='legReach' className={highlightData === 'legReach' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>LEG REACH {unit}</div>
            </div>
            <div className='flex-center btnContainer'>
                <div data-value='wins' className={highlightData === 'wins' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>WINS</div>
                <div data-value='losses' className={highlightData === 'losses' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>LOSSES</div>
                <div data-value='ko' className={highlightData === 'ko' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>KO</div>
                <div data-value='sub' className={highlightData === 'sub' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>SUBMISSIONS</div>
                <div data-value='dec' className={highlightData === 'dec' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>DECISIONS</div>
                <div data-value='winstreak' className={highlightData === 'current_win_streak' ? 'dataBtnPressed' : 'dataBtn'} onClick={(e) => selectData(e.target.dataset.value)}>WIN STREAK</div>
            </div>

            <div style={{ width: '100%' }}>
                <HorizontalBar data={chartData} options={options} />
            </div>
            <div className='flex-center favoriteFighterBox'>
                {fighters.map(fighter =>
                <div style={{width:'25%'}}>
                    <FighterCard
                        fighter={fighter}
                        key={fighter.fighterId} />
                </div>
                )}
            </div>

        </div>
    )
}
export default Stats