import React from 'react'

interface Props {
  children: any
}


const Login: React.FC<Props> = ( { children } ) => {
  return (
    <div>
      { children }
    </div>
  )
}

export default Login