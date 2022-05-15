import React, { FC, createContext, useContext, useEffect, useState } from 'react'

export interface Store {
  store: object;
  setStoreContext: ( state: object ) => void
}
interface Props {
  children: any
}

const StoreContext = createContext<Store | null>( null )
export const useStoreContext = () => useContext( StoreContext )



const ContextProvider: FC<Props> = ( { children } ) => {


  //main store object
  const [ store, setStore ] = useState( {
    isNewUser: false,
    user: '',
    presence: 'active'
  } )

  // console.log( store );


  const setStoreContext = ( state: object ) => setStore( { ...store, ...state } )

  useEffect( () => {
    const storageData: any = localStorage.getItem( 'users' )
    const users: any[] = JSON.parse( storageData ) || []
    const sessionUser = sessionStorage.getItem( 'user' )
    if ( sessionUser && !users.find( ( value: any ) => value.user === sessionUser ) ) {
      sessionStorage.clear()
    }
    setStoreContext( {
      user: sessionUser || users[ users?.length - 1 ]?.user || ''
    } )

    // eslint-disable-next-line
  }, [] )




  return (
    <StoreContext.Provider value={ { store, setStoreContext } }>
      { children }
    </StoreContext.Provider>
  )
}

export default ContextProvider
