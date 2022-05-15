import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Login from '../components/Login';
import { useStoreContext } from '../utils/Store';


// interface Props{}


const Home = () => {
  const { store, setStoreContext }: any = useStoreContext()
  const { user, presence, isNewUser }: any = store
  const [ visibility, setVisibility ] = useState( 'visible' )
  const [ usersL, setUsersL ]: any = useState( [] )

  // Handle page visibility change events
  const visibilityListener = () => {
    setVisibility( document.visibilityState )
  }

  const monitorStorage = () => {
    const storageData: any = localStorage.getItem( 'users' )
    const users: object[] = JSON.parse( storageData ) || []
    setUsersL( users )
    const sessionUser = sessionStorage.getItem( 'user' )
    const focus = localStorage.getItem( 'focus' )
    if ( sessionUser && !users.find( ( value: any ) => value.user === sessionUser ) ) {
      window.location.reload()
    }

    if ( focus && user === focus ) {
      window.open()
      alert( 'some one just tried to sign in with your user name' )
      localStorage.removeItem( 'focus' )
    }
  }

  useEffect( () => {
    document.addEventListener( "visibilitychange", visibilityListener );
    window.addEventListener( 'storage', monitorStorage )

    const storageData: any = localStorage.getItem( 'users' )
    const users: object[] = JSON.parse( storageData ) || []
    setUsersL( users )

    //cleanup
    return () => {
      document.removeEventListener( 'visibilitychange', visibilityListener )
      window.removeEventListener( 'storage', monitorStorage )
    }
    // eslint-disable-next-line
  }, [] )




  useEffect( () => {

    let timer = null
    if ( visibility !== 'visible' ) {
      timer = setTimeout( () => {
        setStoreContext( {
          presence: 'idle'
        } )
      }, 60000 );
    } else {
      setStoreContext( {
        presence: 'active'
      } )
      if ( timer ) {
        clearTimeout( timer )
      }
    }
    // eslint-disable-next-line
  }, [ visibility ] )


  const logOut = () => {
    sessionStorage.clear()

    setStoreContext( {
      user: ''
    } )
    const storageData: any = localStorage.getItem( 'users' )
    const users: object[] = JSON.parse( storageData ) || []

    let index = -1
    users.forEach( ( value: any, elementIndex ) => {
      if ( value.user === user ) {
        index = elementIndex
      }
    } )
    users.splice( index, 1 )
    localStorage.setItem( 'users', JSON.stringify( users ) )

  }

  const newUsersignIn = () => {
    setStoreContext( {
      isNewUser: true
    } )
  }



  console.log( localStorage );
  console.log( sessionStorage );

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

        <div className='my-20'>
          <h1 className='font-semibold text-capitalise my-5 text-center'>Other Users On the Platform</h1>
          { usersL.map( ( userIn: any, index: number ) => {
            return (
              <div className='flex' key={ userIn.user }>
                { userIn.user !== user &&
                  <div className='flex space-x-10 items-center my-3 '  >
                    <div>
                      <p>
                        Username: { userIn.user }
                      </p>
                      <p>
                        Presence: { userIn.presence }
                      </p>
                    </div>
                    <button
                      className='blck bg-indigo-700 text-white rounded-md py-1 min-w-[100px]'
                      onClick={ () => {
                        const temp = [ ...usersL ]
                        temp.splice( index, 1 )
                        localStorage.setItem( 'users', JSON.stringify( temp ) )
                        setUsersL( temp )
                      } }
                    >Log Out
                    </button>
                  </div>
                }
              </div>
            )
          } ) }
        </div>
        <div className="flex space-x-5">
          <button
            className='block bg-indigo-700 mt-5 text-white rounded-md py-2 min-w-[100px]'
            onClick={ logOut }
          >Log Out
          </button>
          <button
            className='block bg-indigo-700 mt-5 px-5 text-white rounded-md py-2 min-w-[100px]'
            onClick={ newUsersignIn }
          >Sign in with another
          </button>
        </div>

      </div>
    </ Layout >
  )
}

export default Home