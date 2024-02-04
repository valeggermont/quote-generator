import { resolve } from 'path'

export default ({
    entry: './app/index.tsx',
    mode: 'development',
    output: {
        filename: 'quote-generator.js',
        path: resolve(__dirname, 'public', 'js')
    },
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        fallback: {
            'console': false
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
})