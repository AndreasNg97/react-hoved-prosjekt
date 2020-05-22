import React, { useState, useEffect, useContext } from 'react'
import Switch from 'react-switch'
import darkLogo from '../img/dark.png'
import lightLogo from '../img/light.png'
import { darkmodeContext, metricContext } from '../utils/Context'
import { useLocalState } from '../utils/functions'


const SettingsModal = () => {
    const {metric, setMetric} = useContext(metricContext)
    const {dark, setDark} = useContext(darkmodeContext)
    const [saveDarkmode, setSaveDarkmode] = useLocalState('darkmode')
    const [saveMetric, setSaveMetric] = useLocalState('metric')


    const applySavedSettings = () => {
        if(saveDarkmode === 'true') setDark(true)
        if(saveDarkmode === 'false') setDark(false)
        if(saveMetric === 'true') setMetric(true)
        if(saveMetric === 'false') setMetric(false)
    }

    useEffect(() => {
        applySavedSettings()
    })
    return (
        <div>
            <label htmlFor='normal-switch'>
                <div className='switchContainer'>
                    <Switch
                        id='normal-switch'
                        onChange={() => {
                            setMetric(!metric)
                            setSaveMetric(!metric)
                        }}
                        checked={metric}
                        className='switch'
                        onColor='#888'
                        uncheckedIcon={
                            <div className='switchContainer'>
                                <p style={{ color: 'orange' }}>IN</p>
                            </div>}
                        checkedIcon={
                            <div className='switchContainer'>
                                <p>CM</p>
                            </div>} />
                </div>
            </label>
            <label>
                <div className='switchContainer'>
                    <Switch
                        id='normal-switch'
                        onChange={() => {
                            setDark(!dark)
                            setSaveDarkmode(!dark)
                        }}
                        checked={dark}
                        className='switch'
                        onColor='#555'
                        offColor='#eee'
                        uncheckedIcon={
                            <div className='switchIconContainer'>
                                <img style={{ width: '20px' }} src={lightLogo} />
                            </div>
                        }
                        checkedIcon={
                            <div className='switchIconContainer'>
                                <img style={{ width: '20px' }} src={darkLogo} />
                            </div>} />
                </div>

            </label>
        </div>
    )
}

export default SettingsModal
