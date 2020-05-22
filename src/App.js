import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import FightList from './Components/FightList'
import Navbar from './Components/Navbar'
import Landing from './Components/Landing'
import StatsUFC249 from './Components/StatsUFC249'
import { globalDropdown } from './Components/Navbar'
import { darkmodeContext, metricContext, landingContext, newPageContext } from './utils/Context'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'


const App = () => {
  const [dark, setDark] = useState(false)
  const [metric, setMetric] = useState(false)
  const [landing, setLanding] = useState(true)
  const [newPage, setNewPage] = useState(false)

  library.add(fab)
  if (dark) {
    document.body.style.backgroundColor = '#111113'
  } if (!dark) {
    document.body.style.backgroundColor = '#ffffff'
  }


  return (

      <div className={dark ? 'App darkmodeText' : 'App'} onClick={() => globalDropdown()}>
        <darkmodeContext.Provider value={{ dark, setDark }}>
          <metricContext.Provider value={{ metric, setMetric }}>
            <landingContext.Provider value={{ landing, setLanding }}>
              <newPageContext.Provider value={{ newPage, setNewPage}}>
                <Navbar />
              </newPageContext.Provider>
            <Landing />
              {!newPage && <FightList />}
              {newPage && <StatsUFC249 />}
            </landingContext.Provider>
          </metricContext.Provider>
        </darkmodeContext.Provider>
      </div>

  )
}

export default App;