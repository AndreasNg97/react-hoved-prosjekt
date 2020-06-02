import React, { useState, useEffect, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { useOnScreen, ChartColor } from '../../utils/functions'
import { modalReveal } from '../../utils/Animations'

const WinByWay = (props) => {
    const [setRef, visible] = useOnScreen({ threshold: 0.7 })
    const [chartData, setChartData] = useState({})
    const total = props.wins
    const koPrecentage = props.ko / total * 100
    const subPrecentage = props.sub / total * 100
    const decPrecentage = props.dec / total * 100
    const [color] = ChartColor()
    let h1ref = useRef(null)
    let h3Container = useRef(null)

    const options = {
        responsive: true,
        legend: { display: false },
        labels: { display: false },
        events: ['null'],
        plugins: { datalabels: { display: false }},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    display: false
                },
                gridLines: { display: false }
            }],
            xAxes: [{
                gridLines: { display: false }
            }]
        }
    }

    const chart = () => {
        if (visible) {
            modalReveal(h1ref, h3Container)
            setChartData({
                labels: ['','',''],
                datasets: [{
                    data: [props.ko, props.sub, props.dec],
                    backgroundColor: [
                        color,
                        color,
                        color
                    ],
                    barThickness: 50
                }]
            })
        }
    }

    useEffect(() => {
        chart()
    }, [visible])

    return (
        <div className='container' >
            <h1 ref={e => {h1ref = e}} className='sectionH1 opacityNull'>Win by Way</h1>
            <div ref={setRef} className='chartContainer barChartContainer'>
                <Bar data={chartData} options={options} />
                <div ref={e => {h3Container = e}} className='barChartH3Container opacityNull' >
                    <h3 className='barChartH3'><h4>KO/TKO</h4>{props.ko} ({Math.floor(koPrecentage)}%)</h3>
                    <h3 className='barChartH3'><h4>SUB</h4>{props.sub} ({Math.floor(subPrecentage)}%)</h3>
                    <h3 className='barChartH3'><h4>DEC</h4>{props.dec} ({Math.floor(decPrecentage)}%)</h3>
                </div>
            </div>
        </div>
    )
}

export default WinByWay