# use-change

> Super simple Model-view-viewmodel for React inspired by [provider](https://pub.dev/packages/provider)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save kokemus/use-change
```

## Usage

### Define viewmodel

1. Inherit from ChangeNotifier
2. Call notifyListeners when something changes

```js
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
```

### Define view

1. With useProvider get viewmodel 
2. With useChange listen changes in viewmodel

```jsx
const View = () => {
  const vm = useProvider('vm')
  const items = useChange(vm, 'items')

  useEffect(() => vm.start(), [])

  return (<>{
    items.map(item => <div key={item.id}>{item.value}</div>)
  }</>)
}
```

### Declare providers

1. Use MultiProvider to declare providers
2. Key 'vm' defines the name of the provider

```jsx
const App = () => {
  return (<MultiProvider providers={{
    'vm': () => new ViewModel()
  }}>
    <View />
  </MultiProvider>)
}
```

## License

MIT © [](https://github.com/)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
