import React, { useEffect, useState } from 'react'
import { ChartColor } from '../utils/functions'
import { Bar, HorizontalBar, Polar, Doughnut, Pie, Radar } from 'react-chartjs-2'
import fightcard from '../files/fightcard'
import './css/Stats.css'

const Stats = () => {
    let fighters = []
    let fighterName = []
    let fighterSelectedData = []

    const [fighterList, setFighterList] = useState(fighters)
    const [chartData, setChartData] = useState({})
    const [fighterData, setFighterData] = useState()
    const [color] = ChartColor()

    fighterList.map(fighter =>
        fighterName.push(fighter.name + ' ' + fighter.surname)
    )

    fightcard.main.map(mainfight =>
        fighters.push(mainfight.redCorner, mainfight.blueCorner)
    )
    fightcard.prelims.map(prelimfight =>
        fighters.push(prelimfight.redCorner, prelimfight.blueCorner)
    )
    fightcard.earlyprelims.map(earlyprelimfight =>
        fighters.push(earlyprelimfight.redCorner, earlyprelimfight.blueCorner)
    )

    const selectData = selectedData => {
        const selectedDatas = {
            age: 'age',
            height: 'height',
            reach: 'reach',
            LegReach: 'legReach',
            wins: 'wins',
            losses: 'losses',
            ko: 'ko',
            sub: 'sub',
            dec: 'dec',
            winstreak: 'current_win_streak'
        }
        const sdProp = selectedDatas[selectedData]

        fighterList.map(fighter => {
            if (sdProp === 'age' || sdProp === 'height' || sdProp === 'reach' || sdProp === 'legReach') {
                setFighterData()
                fighterSelectedData.push(fighter[sdProp])
            }
            if (sdProp === 'wins' || sdProp === 'losses' || sdProp === 'current_win_streak' || sdProp === 'ko' || sdProp === 'sub' || sdProp === 'dec') {
                setFighterData()
                fighterSelectedData.push(fighter.record[sdProp])
            }
        })
        setFighterData(fighterSelectedData)
        console.log(sdProp)
    }

    const options = {
        responsive: true,
        legend: { display: false },
        events: ['null'],
        plugins: { 
            datalabels: { 
                clamp: true,
                align:'start',
                anchor: 'end',
                color:'white',
                display: function(context) {
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
                ticks: { beginAtZero:true },
            }]
        },
        
        
    }

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

    useEffect(() => {
        chart()
    }, [fighterData])

    return (
        <div className='mainStatsDiv flex-center'>
            <div>
                <div data-value='age' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>AGE</div>
                <div data-value='height' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>HEIGHT</div>
                <div data-value='reach' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>REACH</div>
                <div data-value='LegReach' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>LEG REACH</div>
            </div>
            <div>
                <div data-value='wins' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>WINS</div>
                <div data-value='losses' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>LOSSES</div>
                <div data-value='ko' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>KO</div>
                <div data-value='sub' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>SUBMISSIONS</div>
                <div data-value='dec' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>DECISIONS</div>
                <div data-value='winstreak' style={{ cursor: 'pointer', border: '1px solid white' }} onClick={(e) => selectData(e.target.dataset.value)}>WIN STREAK</div>
            </div>

            <div style={{width:'100%'}}>
                <HorizontalBar data={chartData} options={options} />
            </div>
            {fighterList.map((fighter, i) => {
                return (
                    <div key={i}>
                        <img src={fighter.img1} style={{ width: '50%' }} alt={'portrait of ' + fighter.name} />
                        <p>{fighter.name} {fighter.surname}</p>
                    </div>
                )
            })}

        </div>
    )
}

export default Stats