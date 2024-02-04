import React from 'react'
import { RecoilRoot } from 'recoil'
import { createHashRouter , RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Generator from './components/Generator'

const router = createHashRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/generator',
        element: <Generator/>
    }
])

const App: React.FC = () => {

    return <div>
        <div className='container d-flex justify-content-center align-items-center h-100'>
            <RecoilRoot>
                <RouterProvider router={router}/>
            </RecoilRoot>
        </div>
    </div>
}

export default App