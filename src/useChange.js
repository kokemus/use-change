import { useState, useEffect } from 'react';
import { ChangeNotifier } from './ChangeNotifier';

export const useChange = (provider, key) => {
  if (!provider) {
    throw new TypeError(`provider is not defined, useChange(provider, 'key')`);
  }
  if (typeof provider === ChangeNotifier) {
    throw new TypeError(`provider is not ChangeNotifier`);
  }
  if (!(key in provider)) {
    throw new TypeError(`key ${key} is not found in provider, useChange(provider, 'key')`);
  }
  const [value, setValue] = useState(provider[key])
  useEffect(() => {
    const update = () => setValue(provider[key])
    provider.addListener(update)
    return () => {
      provider.removeListener(update)
    }
  }, [])
  return value
}