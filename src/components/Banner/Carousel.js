import { Link, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel'

const useStyles = makeStyles(() => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}))

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const Carousel = () => {
  const [trending, setTrending] = useState([])

  const classes = useStyles()

  const { currency, symbol } = CryptoState()

  const fetchTrendingCoins = async () => {
    const { data } = await axios(TrendingCoins(currency))
    setTrending(data)
  }

  // console.log(trending) // Console 

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])

  const items = trending.map((coin) => {

    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height='80'
          style={{
            marginBottom: 10
          }}
        />
        <span style={{
          color: profit > 0 ? "rgba(14,203,129)" : "red",
          fontWeight: 500
        }}>
          {coin?.symbol}
          &nbsp;
          <span>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{
          fontSize: 22,
          fontWeight: 500,
        }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })


  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 4,
    }
  }
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={500}
        animationDuration={1500}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carousel