import AuthProvider from './authprovider/AuthProvider'
import './App.css'
import Routers from './Routers/router'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { SocketProvider } from './authprovider/socketContext'

function App() {
  

  return (
    <AuthProvider>
      <Provider store={store}>
        <SocketProvider>

        
      <Routers>

      </Routers>
      </SocketProvider>
      </Provider>
    </AuthProvider>
  )
}

export default App
