import React, { useContext, useEffect } from 'react'
import Switch from 'react-switch'
import { useLocalState } from '../utils/functions'
import darkLogo from '../img/dark.png'
import lightLogo from '../img/light.png'
import { darkmodeContext, metricContext } from '../utils/Context'

const Switches = () => {
    // UTILS IMPORTS
    const { dark, setDark } = useContext(darkmodeContext)
    const { metric, setMetric } = useContext(metricContext)
    const [saveDarkmode, setSaveDarkmode] = useLocalState('darkmode')
    const [saveMetric, setSaveMetric] = useLocalState('metric')

    //FUNCTION THAT APPLY SAVED SETTINGS IF THERE IS SETTINGS THAT IS SAVED IN LOCAL STORAGE
    const applySavedSettings = () => {
        if (saveDarkmode === 'true') setDark(true)
        if (saveDarkmode === 'false') setDark(false)
        if (saveMetric === 'true') setMetric(true)
        if (saveMetric === 'false') setMetric(false)
    }

    useEffect(() => {
        applySavedSettings()
    })
    return (
        <div>
            <label>
                <div className='switchContainer'>
                    <Switch
                        id='normal-switch'
                        //ON CHANGE DARK IS CHANGED TO !DARK, AND DARKMODE/LIGHTMODE SETTING IS SAVED IN LOCAL STORAGE
                        onChange={() => {
                            setDark(!dark)
                            setSaveDarkmode(!dark)
                        }}
                        checked={!dark}
                        className='switch'
                        onColor='#eee'
                        offColor='#555'
                        uncheckedIcon={
                            <div className='switchIconContainer'>
                                <img style={{ width: '20px' }} src={darkLogo} />
                            </div>
                        }
                        checkedIcon={
                            <div className='switchIconContainer'>
                                <img style={{ width: '20px' }} src={lightLogo} />
                            </div>} />
                    <Switch
                        id='normal-switch'
                        //ON CHANGE METRIC IS CHANGED TO !METRIC, AND CM/IN SETTING IS SAVEN IN LOCAL STORAGE
                        onChange={() => {
                            setMetric(!metric)
                            setSaveMetric(!metric)
                        }}
                        checked={!metric}
                        className='switch'
                        onColor='#888'
                        uncheckedIcon={
                            <div className='switchContainer'>
                                <p style={{ color: 'orange' }}>CM</p>
                            </div>}
                        checkedIcon={
                            <div className='switchContainer'>
                                <p>IN</p>
                            </div>} />
                </div>
            </label>

        </div>
    )
}

export default Switches