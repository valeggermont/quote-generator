const jestFns = {
    create: jest.fn(),
    get: jest.fn(),
  }
  
jestFns.create.mockReturnValue({get: jestFns.get})

const toExport = {
    create: jestFns.create,
    jestFns,
}

export type MockType = typeof toExport;

export function castToMockAxios(axios: unknown) {
    return axios as MockType
}

export class AxiosError extends Error {
    constructor(
        public message:string,
        public code:string) {
            super(message)
    }
}

export default toExport