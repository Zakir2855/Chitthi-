import AuthProvider from './authprovider/AuthProvider'
import './App.css'
import Routers from './Routers/router'
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {
  

  return (
    <AuthProvider>
      <Provider store={store}>
      <Routers>

      </Routers>
      </Provider>
    </AuthProvider>
  )
}

export default App
