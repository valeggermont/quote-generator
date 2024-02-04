import { atom } from 'recoil'

export const tokenAtom = atom<string>({
    key: 'token',
    default: sessionStorage.getItem('quote-generator-token') || '',
    effects: [
        ({ onSet }) => {
            onSet(newToken => {
                sessionStorage.setItem('quote-generator-token', newToken)
            })
        }
    ]
})