import React, { useEffect } from 'react'
import Layout from '../components/layout'
import Login from '../components/Login';
import { useStoreContext } from '../utils/Store';


// interface Props{}


const Home = () => {
  const { store, setStoreContext }: any = useStoreContext()
  const { user, presence, isNewUser }: any = store


  // Handle page visibility change events
  function visibilityListener() {
    let timer = null
    switch ( document.visibilityState ) {
      case "hidden":
        timer = setTimeout( () => {
          setStoreContext( {
            ...store, presence: 'idle'
          } )
        }, 60000 );
        break;
      case "visible":
        setStoreContext( {
          ...store, presence: 'active'
        } )
        if ( timer ) {
          clearTimeout( timer )
        }
        break;
    }
  }

  useEffect( () => {
    document.addEventListener( "visibilitychange", visibilityListener );
    // eslint-disable-next-line
  }, [] )

  useEffect( () => {
    const users = localStorage.getItem( '' )
  }, [ presence ] )




  const setUser = () => {
    localStorage.setItem( 'user', '' )
    setStoreContext( {
      user: localStorage.getItem( 'user' ) ?? ''
    } )
  }

  const newUsersignIn = () => {
    setStoreContext( {
      isNewUser: true
    } )
  }



  console.log( localStorage );

  return (
    <Layout >
      { ( user === '' || isNewUser ) && <Login /> }
      <div className=' flex flex-col h-screen  justify-center items-center '>

        <div className='flex  space-x-7'>
          <p>Signed User: </p>
          <p className='font-semibold capitalize'> { user } </p>
        </div>
        <div className='flex  space-x-7'>
          <p>Presence: </p>
          <p className='font-semibold capitalize'> { presence } </p>
        </div>
        <div className="flex space-x-5">
          <button
            className='block bg-indigo-700 mt-5 text-white rounded-md py-2 min-w-[100px]'
            onClick={ setUser }
          >Log Out
          </button>
          <button
            className='block bg-indigo-700 mt-5 text-white rounded-md py-2 min-w-[100px]'
            onClick={ newUsersignIn }
          >Sign in with another
          </button>
        </div>

      </div>
    </ Layout >
  )
}

export default Home