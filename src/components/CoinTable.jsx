import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Container, ThemeProvider, Typography, createTheme, TextField } from '@material-ui/core'

const CoinTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)

    const  [search, setSearch] = useState()

    const { currency, symbol } = CryptoState()

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))

        setCoins(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCoins()
    }, [currency])

    console.log(coins)

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        },
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                style={{
                    textAlign: 'center'
                }}>
                <Typography
                    variant='h4'
                    style={{
                        margin: 18,
                        fontFamily: 'Montserrat'
                    }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label="Search for a Crypto Currency.."
                    variant='outlined'
                    style={{
                        marginBottom:20,
                        width: '100%'
                    }}
                    oncChange={(e)=> setSearch(e.target.value)}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinTable