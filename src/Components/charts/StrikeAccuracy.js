import React, { useEffect, useState, useContext } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useOnScreen, ChartColor } from '../../utils/functions'
import { useCountUp } from 'react-countup'

const StrikeAccuracy = (props) => {
    let value = props.strikesLanded / props.strikesAttempted * 100
    const [chartData, setChartData] = useState({})
    let [counted, setCounted] = useState(false)
    const [setRef, visible] = useOnScreen({ threshold: 0.6 })
    const strLanded = props.strikesLanded
    const strAttempted = props.strikesAttempted

    const [color, color2]  = ChartColor()

    const { countUp, start} = useCountUp({ 
        end: value,
        duration: 1,
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
                ticks: { display: false },
                gridLines: { display: false }
            }],
            xAxes: [{
                gridLines: { display: false }
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
        if (visible) {
            setChartData({
                labels: ['', ''],
                datasets: [{
                        data: [Math.round(value), Math.round(100 - value)],
                        backgroundColor: [
                            color,
                            color2
                        ],
                        borderWidth: 0
                    }]
            })
        }
    }

    useEffect(() => {
        countUpOnce()
        chart()
    }, [visible])
    return (
        <div ref={setRef} className="chartWrap">
            <h2> STRIKING ACCURACY</h2>
            <div>
                <p>Strikes Attempted : <span >{strAttempted}</span></p>
                <p>Strikes Landed : <span >{strLanded}</span></p>
            </div>
            <h1 className='centerChartText'>{Math.round(countUp)}%</h1>
            <Doughnut data={chartData} options={options} />
        </div>
    )
}

export default StrikeAccuracy