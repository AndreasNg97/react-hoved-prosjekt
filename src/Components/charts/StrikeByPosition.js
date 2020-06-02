import React, { useState, useEffect, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { useOnScreen, ChartColor } from '../../utils/functions'
import { modalReveal } from '../../utils/Animations'


const StrikeByPosition = (props) => {
    const [setRef, visible] = useOnScreen({ threshold: 0.7 })
    const [chartData, setChartData] = useState({})
    const total = props.total
    const standing = props.standing
    const clinch = props.clinch
    const ground = props.ground
    const standingPrecentage = standing/total*100
    const clinchPrecentage = clinch/total*100
    const groundPrecentage = ground/total*100
    const [color] = ChartColor()
    let h2ref = useRef(null)
    let h3Container = useRef(null)

    const options = {
        responsive: true,
        legend: { display: false },
        labels: { display: false },
        plugins: { datalabels: { display: false }},
        events: ['null'],
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
        if(visible){   
            modalReveal(h2ref, h3Container)           
            setChartData({
                labels: ['', '', ''],
                datasets: [{
                    data: [standing, clinch, ground],
                    backgroundColor:[
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

    return(
        <div ref={setRef} >
            <h2 ref={e => {h2ref = e}} className='text-center'>STRIKES BY POSITION</h2>
            <Bar data={chartData} options={options}/>
            <div ref={e => {h3Container = e}} className='barChartH3Container'>
                <h3 className='barChartH3'><h4>STANDING</h4>{standing} ({Math.floor(standingPrecentage)}%)</h3>
                <h3 className='barChartH3'><h4>CLINCH</h4>{clinch} ({Math.floor(clinchPrecentage)}%)</h3>
                <h3 className='barChartH3'><h4>GROUND</h4>{ground} ({Math.floor(groundPrecentage)}%)</h3>
            </div>
        </div>
    )
}

export default StrikeByPosition