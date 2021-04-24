import React from 'react'
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom'
import { MultiProvider, useProvider, useChange, ChangeNotifier } from './'

describe('ChangeNotifier', () => {
  it('contructor', () => {
    const cn = new ChangeNotifier()

    expect(cn).not.toBeNull()
    expect(cn.hasListeners).toBeFalsy()
  })

  it('addListener & removeListener', () => {
    const cn = new ChangeNotifier()
    const listener = () => { called = true }
    let called = false

    cn.addListener(listener)
    expect(cn.hasListeners).toBeTruthy()

    cn.notifyListeners()
    expect(called).toBeTruthy()

    cn.removeListener(listener)
    expect(cn.hasListeners).toBeFalsy()

    called = false
    cn.notifyListeners()
    expect(called).toBeFalsy()
  })
})

describe('useProvider', () => {
  const Name = () => {
    const name = useProvider('name')
    return <h1>Hello, {name}!</h1>
  }

  const Person = () => {
    const person = useProvider('person')
    return <h1>Hello, {person.name}!</h1>
  }

  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it('get simple value', () => {
    act(() => {
      render(<MultiProvider providers={{
        'name': 'Jenny'
      }}><Name /></MultiProvider>, container)
    })
    expect(container.textContent).toBe('Hello, Jenny!')
  })

  it('get simple value from object', () => {
    act(() => {
      render(<MultiProvider providers={{
        'person': { name: 'Jenny' }
      }}><Person /></MultiProvider>, container)
    })
    expect(container.textContent).toBe('Hello, Jenny!')
  })
})

describe('useChange', () => {
  const Person = () => {
    const person = useProvider('person')
    const name = useChange(person, 'name')
    return <h1>Hello, {person.name}!</h1>
  }

  class PersonViewModel extends ChangeNotifier {
    _name = 'Jenny'

    get name() {
      return this._name
    }

    set name(value) {
      this._name = value
      this.notifyListeners()
    }
  }

  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it('get value', () => {
    act(() => {
      render(<MultiProvider providers={{
        'person': () => new PersonViewModel()
      }}><Person /></MultiProvider>, container)
    })
    expect(container.textContent).toBe('Hello, Jenny!')
  })

  it('listen changes', () => {
    const vm = new PersonViewModel()
    act(() => {
      render(<MultiProvider providers={{
        'person': vm
      }}><Person /></MultiProvider>, container)
    })
    expect(container.textContent).toBe('Hello, Jenny!')

    act(() => { vm.name = 'Margaret' })
    expect(container.textContent).toBe('Hello, Margaret!')
  })
})