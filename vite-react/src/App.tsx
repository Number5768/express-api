import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { http } from './utils'

function App() {

    const [count, setCount] = React.useState(0)
    const [data, setData] = React.useState<{
        book_id: number
        category: string
        book_name: string
        description: string
        detail: string
    }[]>([])

    React.useEffect(() => {
        (async () => {
            const _res = await http.get('/book')
            if (_res.status === 200 && _res.data.status) setData(_res.data.data)
        })()
    }, [count])

    return (
        <React.Fragment>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React + Express</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 2)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            {
                data && data.length > 0 && data.flatMap((item) => (
                    <div key={item.book_id}>
                        <h2>{item.book_name}</h2>
                        <p>{item.description}</p>
                        <p>{item.detail}</p>
                    </div>
                ))
            }
        </React.Fragment>
    )
}

export default App