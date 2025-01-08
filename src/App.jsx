import AuthProvider from './authprovider/AuthProvider'
import './App.css'
import Routers from './Routers/router'

function App() {
  

  return (
    <AuthProvider>
      <Routers>

      </Routers>
    </AuthProvider>
  )
}

export default App
