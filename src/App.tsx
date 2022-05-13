import React from 'react';
import Home from './pages/Home';
import ContextProvider, { useStoreContext } from './utils/Store';


function App() {

  return (
    <>
      <ContextProvider>
        <Home />
      </ContextProvider>
    </>
  );
}

export default App;
