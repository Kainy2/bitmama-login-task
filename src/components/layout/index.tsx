import React from 'react'
import Login from '../Login'
interface Props {
  children: any
}


const Index: React.FC<Props> = ( { children } ) => {
  return (
    <div>
      { children }
    </div>
  )
}

export default Index