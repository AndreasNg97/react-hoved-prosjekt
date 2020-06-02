import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useOnScreen, ChartColor } from '../../utils/functions'
import { useCountUp } from 'react-countup'

const TakedownAccuracy = (props) => {
    let value = props.tdLanded / props.tdAttempted * 100
    if (props.tdAttempted === 0){value = 0}
    const [chartData, setChartData] = useState({})
    const [setRef, visible] = useOnScreen({threshold: 0.6})
    let [counted, setCounted] = useState(false)
    const [color, color2] = ChartColor()
    const { countUp, start } = useCountUp({
        end:value,
        duration:1
    })

    const options = {
        responsive: true,
        cutoutPercentage: 60,
        events: ['null'],
        labels: { display: false },
        legend: { display: false },
        plugins: { datalabels: { display: false }},
        scales: {
            yAxes: [{
                    ticks: {display: false},
                    gridLines: {display: false}
                }],
            xAxes: [{
                    gridLines: {display: false}
                }]
        }
    }

    const countUpOnce = () => {
        if(visible){
            if(counted === false){
                start()
                setCounted(true)
            }
        }
    }

    const chart = () => {
        if(visible){
            setChartData({
                labels: ['', ''],
                datasets: [
                    {
                        data: [Math.round(value), Math.round(100 - value)],
                        backgroundColor: [
                            color,
                            color2
                        ],
                        borderWidth: 0
                    }
                ]
            })
        }
    }

    useEffect(() => {
        countUpOnce()
        chart()
    }, [visible])

    return (
        <div ref={setRef} className="chartWrap">
            <h2> TAKEDOWN ACCURACY</h2>
            <div>
                <p>Takedown Attempted : <span>{props.tdAttempted}</span></p>
                <p>Takedown Landed : <span>{props.tdLanded}</span></p>
            </div>
            <h1 className='centerChartText'>{Math.round(countUp)}%</h1>
            <Doughnut data={chartData} options={options} />
        </div>
    )
}


export default TakedownAccuracy