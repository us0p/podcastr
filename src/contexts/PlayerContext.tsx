import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episode_list: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playlist: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevius: () => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    isLooping: boolean;
    isShuffling: boolean;
    toggleShuffle: () => void;
    setPlayingState: (state: Boolean) => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevius: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
  children: ReactNode;
}

export function PlayerContextProvider ({ children }: PlayerContextProviderProps){
    const [episode_list, setEpisode_list] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)


  
    function play(episode: Episode){
      setEpisode_list([episode])
      setCurrentEpisodeIndex(0)
      setIsPlaying(true)
    }

    function playlist(list: Episode[], index: number){
      setEpisode_list(list)
      setCurrentEpisodeIndex(index)
      setIsPlaying(true)
    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying)
    }

    function toggleShuffle(){
      setIsShuffling(!isShuffling)
    }

    function toggleLoop(){
      setIsLooping(!isLooping)
    }
    
    function setPlayingState(state: boolean){
      setIsPlaying(state)
    }

    function clearPlayerState (){
      setEpisode_list([])
      setCurrentEpisodeIndex(0)
    }

    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episode_list.length
    const hasPrevius = currentEpisodeIndex > 0

    function playNext (){
      if (isShuffling){
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episode_list.length)

        setCurrentEpisodeIndex(nextRandomEpisodeIndex)

      } else if (hasNext){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1)
      }
    }

    function playPrevius() {
        if (hasPrevius){
          setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }
  
    return (
        <PlayerContext.Provider 
        value = {{
          episode_list, 
          currentEpisodeIndex, 
          play,
          playlist,
          playNext,
          playPrevius, 
          isPlaying, 
          togglePlay, 
          setPlayingState,
          hasNext,
          toggleLoop,
          isLooping,
          isShuffling,
          toggleShuffle,
          clearPlayerState,
          hasPrevius}}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () =>{
  return useContext(PlayerContext)
}