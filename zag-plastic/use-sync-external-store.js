import { createSignal, onCleanup, onMount } from './runtime.js'

export const useSyncExternalStore = (subscribe, getSnapshot, _getServerSnapshot)=> {
  const [snapshot, setSnapshot] = createSignal(getSnapshot())

  onMount(()=> {
    setSnapshot(() => getSnapshot())
    const unsubscribe = subscribe(() => {
      setSnapshot(() => getSnapshot())
    })
    onCleanup(unsubscribe)
  })

  return snapshot
}
