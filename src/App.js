import React, { useState } from 'react';
import TopNavBar from './Components/TopNavBar'
import FightList from './Components/FightList'
import Landing from './Components/Landing'
import Stats from './Components/Stats'
import Favorites from './Components/Favorites'
import { auth } from './FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { darkmodeContext, metricContext, landingContext, newPageContext } from './utils/Context'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faStar, faHeart } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [user, loading, error] = useAuthState(auth)
  const [dark, setDark] = useState(true)
  const [metric, setMetric] = useState(false)
  const [landing, setLanding] = useState(true)
  const [newPage, setNewPage] = useState('home')


  library.add(fab, faCog, faStar, faHeart)
  if (dark) {
    document.body.style.backgroundColor = '#111113'
  } if (!dark) {
    document.body.style.backgroundColor = '#ffffff'
  }

if(user || user === null)
  return (
      <div className={dark ? 'App darkmodeText' : 'App'} /* onClick={() => globalDropdown()} */>
        <darkmodeContext.Provider value={{ dark, setDark }}>
          <metricContext.Provider value={{ metric, setMetric }}>
            <landingContext.Provider value={{ landing, setLanding }}>
              <newPageContext.Provider value={{ newPage, setNewPage}}>
                <TopNavBar />
              </newPageContext.Provider>
              <Landing />
              {newPage === 'home' && <FightList />}
              {newPage === 'stats' && <Stats />}
              {newPage === 'favorites' && <Favorites/>}
            </landingContext.Provider>
          </metricContext.Provider>
        </darkmodeContext.Provider>
      </div>
  )
  if(loading || error)
  return(
    <div style={{width:'100vw', height:'100vh'}} className='flex-center'>
      <h1>LOADING...</h1>
    </div>
  )
}

export default App;