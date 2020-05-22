import React, { useState, useEffect, useContext } from 'react'
import { darkmodeContext } from './Context'
import { Pie, Doughnut } from 'react-chartjs-2'


export const useOnScreen = options => {
    const [ref, setRef] = useState(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting)
        }, options)

        if (ref) {
            observer.observe(ref)
        }

        return () => {
            if (ref) {
                observer.unobserve(ref)
            }
        }
    }, [ref, options])

    return [setRef, visible]
}

export const ChartColor = () => {
    const { dark } = useContext(darkmodeContext)
    let color
    let color2
    if (dark) {
        color = 'rgb(150, 0, 0)'
        color2 = '#272933'
    } else {
        color = 'rgb(250, 60, 60)'
        color2 = '#eee'
    }
    return [color, color2]
}


export const useLocalState = (localItem) => {
    const [loc, setState] = useState(localStorage.getItem(localItem))

    const setLoc = (newItem) => {
        localStorage.setItem(localItem, newItem)
        setState(newItem)
    }

    return [loc, setLoc]
}