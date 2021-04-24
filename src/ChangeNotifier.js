export class ChangeNotifier {
  _listeners = []

  addListener(listener) {
    this._listeners.push(listener)
  }

  removeListener(listener) {
    const index = this._listeners.findIndex(l => l === listener)
    if (index !== -1) {
      this._listeners.splice(index, 1)
    }
  }

  notifyListeners() {
    this._listeners.forEach(l => l())
  }

  get hasListeners() {
    return this._listeners.length > 0
  }
}