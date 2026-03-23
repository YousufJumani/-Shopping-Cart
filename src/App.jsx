import { useState } from 'react'

const ITEMS = [
  { id: 1, name: 'Notebook', price: 5 },
  { id: 2, name: 'Pen', price: 2 },
  { id: 3, name: 'Bag', price: 25 }
]

export default function App() {
  const [cart, setCart] = useState([])

  // Add an item or increment quantity when already in cart.
  const add = (item) => {
    setCart((c) => {
      const f = c.find((x) => x.id === item.id)
      if (f) return c.map((x) => x.id === item.id ? { ...x, qty: x.qty + 1 } : x)
      return [...c, { ...item, qty: 1 }]
    })
  }

  const remove = (id) => setCart((c) => c.filter((x) => x.id !== id))
  const updateQty = (id, qty) => setCart((c) => c.map((x) => x.id === id ? { ...x, qty: Math.max(1, qty) } : x))
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0)

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      <div className="grid">{ITEMS.map((i) => <div className="card" key={i.id}><h3>{i.name}</h3><p>${i.price}</p><button onClick={() => add(i)}>Add</button></div>)}</div>
      <div className="card">
        <h3>Cart</h3>
        {cart.map((x) => <div key={x.id} className="row"><span>{x.name}</span><input type="number" value={x.qty} onChange={(e) => updateQty(x.id, Number(e.target.value))} /><button onClick={() => remove(x.id)}>Remove</button></div>)}
        <h2>Total: ${total}</h2>
      </div>
    </div>
  )
}
