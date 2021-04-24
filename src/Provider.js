import React, { useContext } from 'react';

const ProvidersContext = React.createContext()

export const MultiProvider = ({ children, providers }) =>
  <ProvidersContext.Provider value={providers}>
    {children}
  </ProvidersContext.Provider>

const isString = (type) => typeof type === String
const isFunction = (type) => typeof type === 'function'

export const useProvider = (name) => {
  const providers = useContext(ProvidersContext) ?? []
  if (!(name in providers)) {
    throw new TypeError(`${name} provider not found, use MultiProvider to declare one`);
  }
  const provider = isFunction(providers[name]) ? providers[name]() : providers[name]
  providers[name] = provider
  return provider
}