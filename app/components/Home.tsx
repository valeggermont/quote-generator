import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { tokenAtom } from '../atoms/token.atom'
import { LoginService } from '../services/login.service'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {

    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [probing, setProbing] = useState(false)

    const setToken = useSetRecoilState(tokenAtom)

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            username: { value : string }
            password: { value : string }
        }

        try {
            setProbing(true)
            const token = await LoginService.login(target.username.value, target.password.value)
            setToken(token)
            navigate('/generator')
        } catch (e) {
            setError('Login went wrong')
        } finally {
            setProbing(false)
        }
    }

    return <div>
        <div>
            <h2>Welcome to Quote Generator</h2>
            <p>In order to start, please login using the test user :</p>
        </div>
        <form className="my-3" onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="userNameInput">Username</label>
                <input type="text" className="form-control" id="userNameInput" name="username"/>
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input type="password" className="form-control" id="passwordInput" name="password"/>
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
            <div className="d-flex">
                <button type="submit" className="btn btn-primary">Submit</button>
                {probing && <div className="spinner-border"></div>}
            </div>
        </form>
    </div>
    
}

export default Home