import { useState, useEffect, useContext } from 'react'
import { darkmodeContext } from './Context'

//CHECKS IF AN ELEMENT IS VISIBLE OR NOT(INTERSECTIONOBSERVER)
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

//CHANGES COLOR ON CHARTS, COLOR DIFFERS WETHER PAGE IS IN DARKMODE OR NOT
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

// SAVES DARKMODE & CM SETTINGS IN LOCAL STORAGE
export const useLocalState = (localItem) => {
    const [loc, setState] = useState(localStorage.getItem(localItem))

    const setLoc = (newItem) => {
        localStorage.setItem(localItem, newItem)
        setState(newItem)
    }

    return [loc, setLoc]
}

// CHANGES COLOR ON TEXT IN NAVBAR, COLOR DIFFERS WETHER PAGE IS IN DARKMODE OR NOT
export const NavColors = () => {
    const {dark} = useContext(darkmodeContext)
    let navColor
    dark ? navColor = "white" : navColor = 'black'
    return [navColor]
}
