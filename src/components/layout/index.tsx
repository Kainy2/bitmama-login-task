import React from 'react'

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