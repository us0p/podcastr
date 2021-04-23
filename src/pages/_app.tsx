import '../styles/global.scss'

import { Header } from '../components/Header'
import { Player } from '../components/Player'

import styles from '../styles/app.module.scss'
import { PlayerContext } from '../contexts/PlayerContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [episode_list, setEpisode_list] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode){
    setEpisode_list([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay(){
    setIsPlaying(!isPlaying)
  }
  
  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  return (
    <div className={styles.wrapper}>
      <PlayerContext.Provider value = {{episode_list, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState}}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </PlayerContext.Provider>
    </div>
  );
}

export default MyApp