import React, { useState, useEffect } from 'react'
import { Bar, Radar, Polar } from 'react-chartjs-2'


const Test2= () => {

    const [chartData, setChartData] = useState({})

    const options = {
        responsive: true,
        labels:{display:false},
        scales: {
            yAxes: [{
                gridLines:{display:false},
                ticks:{
                    display:false
                }
            }],
            xAxes: [{
                gridLines:{display:false}
            }]
        }
    }

    const chart = () => {
        setChartData({
            labels: ['Standing', 'Clinch', 'Ground'],
            datasets: [
                {
                    label:'Striking by Position',
                    borderWidth: 0,
                    data: [642, 26, 64],
                    backgroundColor:[
                        'rgba(250, 60, 60, 0.9)',
                        'rgba(33, 33, 33, 1)',
                        'rgba(150, 150, 150, 1)'
                    ],
                    barThickness: 50,
                }
            ]
        })
    }

    useEffect(() => {
        chart()
    }, [])

    return(
        <div style={{width:'500px', height:'500px'}}>
            <h2 style={{textAlign:'center'}}>STRIKES BY POSITION</h2>
            <Polar data={chartData} options={options}/>
            <Radar data={chartData} options={options}/>
        </div>
    )
}

export default Test2