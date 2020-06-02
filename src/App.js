import React, { useState } from 'react';
import './App.css';
import TopNavBar from './Components/TopNavBar'
import FightList from './Components/FightList'
import Landing from './Components/Landing'
import Stats from './Components/Stats'
import Favorites from './Components/Favorites'
import { darkmodeContext, metricContext, landingContext, newPageContext } from './utils/Context'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'


const App = () => {
  const [dark, setDark] = useState(true)
  const [metric, setMetric] = useState(false)
  const [landing, setLanding] = useState(true)
  const [newPage, setNewPage] = useState('home')

  library.add(fab, faCog)
  if (dark) {
    document.body.style.backgroundColor = '#111113'
  } if (!dark) {
    document.body.style.backgroundColor = '#ffffff'
  }


  return (

      <div className={dark ? 'App darkmodeText' : 'App'} /* onClick={() => globalDropdown()} */>
        <darkmodeContext.Provider value={{ dark, setDark }}>
          <metricContext.Provider value={{ metric, setMetric }}>
            <landingContext.Provider value={{ landing, setLanding }}>
              <newPageContext.Provider value={{ newPage, setNewPage}}>
                <TopNavBar />
              </newPageContext.Provider>
              {/* <Landing /> */}
              {newPage === 'home' && <FightList />}
              {newPage === 'stats' && <Stats />}
              {newPage === 'favorites' && <Favorites/>}
            </landingContext.Provider>
          </metricContext.Provider>
        </darkmodeContext.Provider>
      </div>

  )
}

export default App;