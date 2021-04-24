import React, { useEffect } from 'react'
import { useProvider, useChange, MultiProvider, ChangeNotifier } from 'use-change'

class ViewModel extends ChangeNotifier {
  _items = []

  get items() {
    return this._items
  }

  set items(value) {
    this._items = value
    this.notifyListeners()
  }

  start() {
    setInterval(async () => {
      let response = await fetch('https://api.chucknorris.io/jokes/random')
      if (response.ok) {
        let item = await response.json()
        this.items = [item, ...this._items]
      }
    }, 10000)
  }
}

const View = () => {
  const vm = useProvider('vm')
  const items = useChange(vm, 'items')

  useEffect(() => vm.start(), [])

  return (<>{
    items.map(item => <div key={item.id}>{item.value}</div>)
  }</>
  )
}

const App = () => {
  return (<MultiProvider providers={{
    'vm': () => new ViewModel()
  }}>
    <View />
  </MultiProvider>)
}

export default App