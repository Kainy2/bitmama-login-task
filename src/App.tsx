import React from 'react';
import Layout from './components/layout'
import ContextProvider from './utils/Store';


function App() {
  return (
    <ContextProvider>

      <Layout >
        test
      </ Layout>
    </ContextProvider>
  );
}

export default App;
