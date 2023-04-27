import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Container, ThemeProvider, Typography, createTheme, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, makeStyles,} from '@material-ui/core'
import {useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
        fontWeight: '500'
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },
})

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)

    const  [search, setSearch] = useState('')

    const { currency, symbol } = CryptoState()

    const navigate = useNavigate();

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))

        setCoins(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCoins()
    }, [currency])


    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        },
    })

    const handleSearch = () => {
        const filteredCoin = coins.filter((coin)=> 
            coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search) )
        console.log("HandleSearch",filteredCoin)
        return filteredCoin
    }
    
    const classes = useStyles();
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
                    onChange={(e)=> {
                        setSearch(e.target.value)
                    }}
                />
                <TableContainer>
                    {
                        loading? (
                            <LinearProgress style={{backgroundColor: 'gold'}}/>

                        ): (
                            <Table>
                                <TableHead style={{backgroundColor:'gold'}}>
                                    <TableRow>
                                        {
                                            ['Coin','Price','24h Change','Market Cap']
                                                .map((head)=> (
                                                    <TableCell 
                                                        style={{
                                                            color: 'black',
                                                            fontWeight: '700',
                                                            fontFamily: 'Montserrat',
                                                        }}
                                                        key={head}
                                                        align={head=='Coin'?'left':'left'}
                                                    >
                                                        {head}
                                                    </TableCell>
                                                ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        {
                                            handleSearch()
                                                .map((row) => {
                                                    const profit = row.price_change_percentage_24h > 0;
                                                    return (
                                                        <TableRow
                                                            onClick={()=> navigate(`/coins/${row.id}`)}
                                                            className={classes.row}
                                                            key={row.name}
                                                        >
                                                            <TableCell 
                                                            component='th'
                                                            scope='row'
                                                            style={{
                                                                display: 'flex',
                                                                gap: 15,
                                                            }}
                                                            >
                                                                <img
                                                                    src={row?.image}
                                                                    alt={row?.name}
                                                                    height='50'
                                                                    style={{marginBottom: 10}}
                                                                />
                                                                <div style={{display:'flex', flexDirection: 'column'}}>
                                                                    <span
                                                                    style={{textTransform:'uppercase', fontSize: 22,}}>
                                                                        {row.symbol}
                                                                    </span>
                                                                    <span style={{color:'darkgrey'}}>{row.name}</span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                {symbol}{' '}{numberWithCommas(row?.current_price)}
                                                            </TableCell>
                                                            <TableCell
                                                            style={{
                                                                color: profit?'green':'red'
                                                            }}>
                                                                {row?.price_change_percentage_24h.toFixed(2)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {symbol} {' '} {numberWithCommas(row?.market_cap)}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                } )
                                        }
                                </TableBody>
                            </Table>
                        )
                    } 
                </TableContainer>
            </Container>
        </ThemeProvider>
    )
}

export default CoinTable