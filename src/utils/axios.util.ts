import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { baseUrl } from '../constants/api.constants'
import { ApiError } from '../errors/api.error'

/**
 * Builder design pattern for building Axios Request
 */
export class AxiosRequestBuilder {

    private parameters?: Record<string, string>
    
    constructor() {}

    /**
     * 
     * @param name 
     * @param value 
     * @returns the builder with the parameter set for the request to build
     */
    public parameter(name: string, value: string): AxiosRequestBuilder {
        if(!this.parameters) {
            this.parameters = {}
        }
        this.parameters[name] = value
        return this
    }

    /**
     * 
     * @returns Axios request config given the builder elements set
     */
    public build(): AxiosRequestConfig {
        return {
            params: this.parameters,
        }

    }
}

/**
 * Axios client based on the Quote API
 */
export const axiosClient = axios.create({
    baseURL: baseUrl
})

/**
 * 
 * @param call 
 * @returns The result of the Axios call
 * @throws API error if axios call fail
 */
export const handleAxiosError = async <T>(call: Promise<T>) => {
    try{
        return await call
    } catch (e) {
    
        const error = e as AxiosError
        throw new ApiError(`Something went wrong with quote generator API - ${error.cause}`, Number(error.code))
        
    }
}
