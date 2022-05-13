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
    const users: [] = JSON.parse( storageData ) || []
    setStore( {
      ...store, user: users[ users.length - 1 ] || ''
    } )

  }, [ store.user ] )




  return (
    <StoreContext.Provider value={ { store, setStoreContext } }>
      { children }
    </StoreContext.Provider>
  )
}

export default ContextProvider
