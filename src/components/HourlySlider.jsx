import React from 'react'
import MiniCard from './MiniCard'
import {ImArrowRight2, ImArrowLeft2, ImOffice} from 'react-icons/im'
import Detail from '../components/Detail'
import { useState } from 'react'


const HourlySlider = ({ arr, city, active, miniData, currSlide, setCurrSlide, chartToggle, chart }) => {


  const slides = [arr.slice(0, 6), arr.slice(6, 12), arr.slice(12, 18), arr.slice(18, 24), arr.slice(24, 30), arr.slice(30, 36), arr.slice(36, 42), arr.slice(42)]

  const next = () => {
    setCurrSlide((currSlide === 7) ? 0 : currSlide + 1)
  }

  const back = () => {
    setCurrSlide((currSlide === 0) ? 7 : currSlide - 1)
  }

  const getTime = (i) => {
    if(i === 0) return ['Monday', '12:00AM']
    if(i < 12) return ['Monday', `${i}:00AM`]
    if(i === 12) return ['Monday', `12:00PM`]
    if(i < 24) return ['Monday', `${i - 12}:00PM`]
    if(i === 24) return ['Tuesday', '12:00AM']
    if(i < 36) return ['Tuesday', `${i - 24}:00AM`]
    if(i === 36) return ['Tuesday', `12:00PM`]
    if(i < 48) return ['Tuesday', `${i - 36}:00PM`]

    // return [day, i]
  }

    return(
    <div className="slider hourlySlider">
      <h3
        style={{
          paddingBottom: "20px",
          paddingLeft: "20px",
          width: "269px",
          alignItems: "center",
        }}
      >  
      {city}
      </h3>
      <Detail activePage = {active} chartToggle = {chartToggle} chart = {chart} />
      <div className="daily-slider">
          {slides[currSlide].map( (card, i) => {
            const [day, time] = getTime(i + currSlide * 6);
            return <MiniCard 
              pic={`http://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`}  
              temp = {card.temp} 
              arr = {arr} 
              miniData = {miniData} 
              page = {active} 
              text={time} 
              day = {day}
              key = {`c${i}]`}
            />
          })}
      </div>
      <div className="buttonContainer">
        <ImArrowLeft2 onClick = {back}/>
        <ImArrowRight2 onClick = {next}/>
      </div>
    </div>)
}

export default HourlySlider
