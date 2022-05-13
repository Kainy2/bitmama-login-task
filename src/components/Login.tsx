import React, { useRef, useState } from 'react'
import { useStoreContext } from '../utils/Store'

//imported interfaces  
import { Store } from '../utils/Store.js'

interface Props {
  children?: any
}



const Login: React.FC<Props> = ( { children } ) => {
  const { store, setStoreContext }: any = useStoreContext()
  const { user }: any = store

  const [ inputChange, setInputChange ] = useState( '' )

  const handleChange = ( e: any ) => {
    let { value } = e.target
    //   ( prev ) => ( { ...prev, [ name ]: value } )
    setInputChange( value )

  }

  const handleSubmit = ( e: any ) => {
    e.preventDefault();
    setInputChange( '' )
    // setStoreContext( {
    //   ...store, loggedUser: localStorage.getItem( 'loggedUser' ) ?? ''
    // } )

    const storageData: any = localStorage.getItem( 'users' )
    const users: object[] = JSON.parse( storageData ) || []
    setStoreContext( {
      user: inputChange.toLowerCase(), isNewUser: false
    } )
    sessionStorage.setItem( 'user', inputChange.toLowerCase() )
    const user = {
      user: inputChange.toLowerCase(),
      presence: 'active'
    }
    users.push( user )
    localStorage.setItem( 'users', JSON.stringify( users ) )
  }

  return (
    <div className='absolute z-10 flex w-full h-full bg-white'>
      <div className='w-[500px] h-[200px] m-auto bg-slate-100 shadow-md  rounded-md flex justify-center align-middle '>

        <form className='flex flex-col justify-center items-center' name='login' onSubmit={ handleSubmit } >
          <div className='space-x-7'>
            <label htmlFor="username">Username:</label>
            <input className='border py-1 px-3 border-gray-500 rounded-md focus:outline-none ' onChange={ handleChange } value={ inputChange } required type="text" id='username' name='username' />
          </div>
          <button className='bg-indigo-700 mt-5 text-white rounded-md py-2 min-w-[100px]' type='submit'>Log In</button>
        </form>

      </div>
    </ div>
  )
}

export default Login