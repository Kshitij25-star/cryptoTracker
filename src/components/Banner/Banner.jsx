import { makeStyles, Container, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'
const useSytles = makeStyles(() => ({
    banner: {
        backgroundImage: 'url(./banner2.jpg)'
    },
    bannerContent: {
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 25,
        justifyContent: 'space-around',
    },
    tagline: {
        display: 'flex',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    }
}))
const Banner = () => {
    const classes = useSytles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant='h4'
                        style={{
                            fontWeight: 'bold',
                            marginBottom: 15,
                            fontFamily: 'Montserrat',
                        }}
                    >
                    Crypto Price Tracker
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        style={{
                            color: 'darkgrey',
                            textTransform: 'capitalize',
                            fontFamily: 'Montserrat',
                        }}
                    >
                        Get all the info regarding your favourite Crypto Currency
                    </Typography>
                </div>

                <Carousel/>
                
            </Container>
        </div>
    )
}

export default Banner