import { useEffect } from 'react'
import './App.css'
import { useAppDispatch } from './hooks/storeHooks'
import { fetchUsers } from './store/userThunks'
import { UserTabs } from './components/UserTabs'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      <span className='logo'>😎</span>
      <UserTabs />
    </div>
  )
}

export default App
