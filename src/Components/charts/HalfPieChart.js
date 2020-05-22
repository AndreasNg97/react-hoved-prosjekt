import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { ChartColor } from '../../utils/functions'

const HalfPieChart = (props) => {
    let redValue 
    let blueValue
    
    if(props.redAccuracy !== undefined){
        redValue=props.redAccuracy
        blueValue=props.blueAccuracy
    }
    if(props.redDefense !== undefined){
        redValue=props.redDefense
        blueValue=props.blueDefense
    }
    if(props.redTdAccuracy !== undefined){
        redValue=props.redTdAccuracy
        blueValue=props.blueTdAccuracy
    }
    if(props.redTdDefense !== undefined){
        redValue=props.redTdDefense
        blueValue=props.blueTdDefense
    }
    const [redChartData, setRedChartData] = useState({})
    const [blueChartData, setBlueChartData] = useState({})
    const [color, color2] = ChartColor()

    const redOptions = {
        responsive: false,
        events: ['null'],
        labels: { display: false },
        legend: {display: false},
        circumference: 1 * Math.PI,
        rotation: .5 * Math.PI,
        cutoutPercentage: 40,
        maintainAspectRatio: false
    }
    const blueOptions = {
        responsive: false,
        events: ['null'],
        labels: { display: false },
        legend: {display: false},
        circumference: 1 * Math.PI,
        rotation: -.5 * Math.PI,
        cutoutPercentage: 40,
        maintainAspectRatio: false
    }

   const chart = () => {
        setRedChartData({
            labels: ['', ''],
            datasets:[
                {
                    data:[100-redValue, redValue],
                    backgroundColor:[
                        color2,
                        'rgb(250, 30, 30)'
                    ],
                    borderColor:[
                        color2,
                        'rgb(250, 30, 30)'
                    ],
                }
            ]
        })
        setBlueChartData({
            labels: ['', ''],
            datasets:[
                {
                    data:[blueValue, 100-blueValue],
                    backgroundColor:[
                        'rgb(30, 30, 250)',
                        color2
                    ],
                    borderColor:[
                        'rgb(30, 30, 250)',
                        color2,
                    ],
                }
            ]
        })
   }

    useEffect(() => {
        chart()
    },[])
    return(
        <div className='halfPieContainer'>
            <div className='halfOfPie redHalf'>
                <Pie  data={redChartData} options={redOptions} />
            </div>
            <div className='halfOfPie blueHalf'>
                <Pie  data={blueChartData} options={blueOptions} />
            </div>
        </div>
    )
}

export default HalfPieChart