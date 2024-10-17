import { useEffect, useState } from "react"

export type State = 'entered' | 'exited' | 'entering' | 'exiting'

function getVisible(state: State) {
  return state !== 'exited'
}

function startState(state: State) {
  switch (state) {
    case 'entered':
    case 'entering':
      return 'exiting'
    case 'exited':
    case 'exiting':
      return 'entering'
  }
}

function endState(state: State) {
  switch (state) {
    case 'entered':
    case 'entering':
      return 'entered'
    case 'exited':
    case 'exiting':
      return 'exited'
  }
}

export default function useAnimation(
  { duration = 300, delay = 0, deps = [], defaultVisible = false }: 
  { duration?: number, delay?: number, deps?: any[], defaultVisible?: boolean }
) {
  const [animation, setAnimation] = useState<{ 
    state: State,
    finished: boolean,
    visible: boolean
  }>({ 
    state: defaultVisible ? 'entered' : 'exited',
    finished: true, 
    visible: defaultVisible
  })

  useEffect(() => {
    let timeoutA: number
    function runAnimation() {
      setAnimation((prev) => {
        const state = startState(prev.state)
        return { state, finished: false, visible: true }
      })

      timeoutA = setTimeout(() => {
        setAnimation((prev) => {
          const state = endState(prev.state)
          return { state, finished: true, visible: getVisible(state) }
        })
      }, duration)
    }

    const timeoutB = setTimeout(() => {
      runAnimation()
    }, delay)

    return () => {
      clearTimeout(timeoutA)
      clearTimeout(timeoutB)
    }
  }, [...deps])

  return animation
}
