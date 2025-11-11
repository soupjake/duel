import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './hooks/storeHooks'
import { fetchUsers } from './store/userThunks'
import { selectCleanLoading, selectCleanUsers, selectDirtyLoading, selectDirtyUsers } from './store/userSelectors'

function App() {
  const dispatch = useAppDispatch()
  const cleanUsers = useAppSelector(selectCleanUsers)
  const cleanLoading = useAppSelector(selectCleanLoading)
  const dirtyUsers = useAppSelector(selectDirtyUsers)
  const dirtyLoading = useAppSelector(selectDirtyLoading)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <p>{cleanLoading ? "Clean loading..." : cleanUsers.length}</p>
        <p>{dirtyLoading ? "Dirty loading..." : dirtyUsers.length}</p>
      </div>
    </>
  )
}

export default App
