import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

render(
    <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>,
    document.getElementById('root')
)