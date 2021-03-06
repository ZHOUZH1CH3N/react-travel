import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import rootStore from './redux/store'
import './i18n/configs'
import axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react'
import 'antd/dist/antd.css'

axios.defaults.baseURL =
  'http://192.168.120.194:7300/mock/61d79dc72c7cf895bc0c49e1'
axios.defaults.headers['x-icode'] = 'mock'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
