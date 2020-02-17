import React from 'react'

export type PersonInfoContextType = Partial<{
  name: string
  age: number
}>

export const PersonInfoContext = React.createContext<PersonInfoContextType>({})
