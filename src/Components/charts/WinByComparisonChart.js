import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'


const WinByComparisonChart = (props) => {
    const [chartData, setChartData] = useState({})

    const options = {
        responsive: true,
        legend: {display: false},
        plugins: { datalabels: { display: false }},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    }

    const chart = () => {
        setChartData({
            labels:['KO/TKO', 'SUB', 'DEC'],
            datasets:
                [{
                    data:[props.redKo, props.redSub, props.redDec],
                    backgroundColor: [
                        'rgb(250, 30, 30)',
                        'rgb(250, 30, 30)',
                        'rgb(250, 30, 30)'
                    ],
                    barThickness: 25
                },{
                    data:[props.blueKo, props.blueSub, props.blueDec],
                    backgroundColor: [
                        'rgb(30, 30, 250)',
                        'rgb(30, 30, 250)',
                        'rgb(30, 30, 250)'
                    ],
                    barThickness: 25
                }]
        })
    }

    useEffect(() => {
        chart()
    },[])

    return(
        <div style={{width:'100%'}}> 
            <Bar data={chartData} options={options} />
        </div>
    )
}

export default WinByComparisonChart