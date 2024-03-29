import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: 'gold',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'ponter',
    }
}))
const Header = () => {
    const classes = useStyles()

    const navigate = useNavigate()

    const { currency, setCurrency } = CryptoState()

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        },
    })
    console.log(currency);
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate("/")}
                            className={classes.title}
                            variant='h6'
                        >
                            Crypto-Tracker
                        </Typography>
                        <Select
                            variant='outlined'
                            sytle={{
                                width: 100,
                                height: 20,
                                marginRight: 15
                            }}
                            value= {currency}
                            onChange= {(e) => setCurrency(e.target.value)}
                            >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header