import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { tokenAtom } from '../atoms/token.atom'
import { QuoteService } from '../services/quote.service'
import { InvalidTokenError } from '../errors/invalidToken.error'
import { useNavigate } from 'react-router-dom'
import { error } from 'console'
import { useQuote } from '../utils/quote.util'

const Generator: React.FC = () => {

    const navigate = useNavigate()

    const [tags, setTags] = useState<string[]>([])
    const [selectedTag, setSelectedTag] = useState('')

    const token = useRecoilValue(tokenAtom)
    const {quote, next, probing} = useQuote(selectedTag)

    useEffect(() => {
        QuoteService
            .getTags(token)
            .then(setTags)
            .catch(e => {
                if (e instanceof InvalidTokenError) {
                    navigate('/')
                } else {
                    console.error(error)
                }
            })
    }, [])

    const selectTag: ChangeEventHandler<HTMLSelectElement> = e => {
        setSelectedTag(e.target.value)
    }

    return <div>
        <div className="d-flex">
            <h2 className="my-5">Quote Generator</h2>
            {probing && <div className="spinner-border"></div>}
        </div>
        <div className="my-3">
            <select className="form-select" value={selectedTag} onChange={selectTag}>
                <option value=''>Select a specific tag</option>
                {[...new Set(tags)].map(tag => <option value={tag} key={tag}>{tag}</option>)}
            </select>
        </div>
        <div>
            {quote && <span>
                <i className="mr-3">{quote.content}</i>
                -
                <b className="ml-3">{quote.author}</b>
                </span>}
        </div>
        <div className="d-flex justify-content-center my-4">
            <button className="btn btn-primary mx-3" onClick={next}>Next</button>
        </div>
    </div>
}

export default Generator