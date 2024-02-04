import { LoginFailedError } from '../errors/loginFailed.error'

export class LoginService {

    public static async login(username: string, password: string): Promise<string> {
        const response = await fetch('/api/login', {
            method: 'post', 
            body: JSON.stringify({username, password}),
            headers: {
                'Content-type': 'application/json'
            }
        })
        if(!response.ok) {
            if(response.status === 401) {
                throw new LoginFailedError()
            } else {
                throw new Error(`Something went wrong while login - [${response.status}] ${response.statusText}`)
            }
        }

        return (await response.json()).accessToken
    }
}