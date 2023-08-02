import React from 'react'
import { Provider } from './Contextapi/Provider'
import NavigationScreens from './NavigationScreens'
function App() {
  return (
    <Provider>
      <NavigationScreens/>
    </Provider>
  )
}

export default App
