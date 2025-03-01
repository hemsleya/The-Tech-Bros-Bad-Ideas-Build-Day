import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GoogleCalendar from "./GoogleCalendar.jsx";

function App() {

  return (
      <>

          <div className="phone-container">
              <div className="screen">
                  <a href="" className="login">login</a>
                  <h2>Soundtrack Your Life</h2>
                  <h3>Sometimes the grass is greener on the other side because it's fake.</h3>
                  <div className="calendar-container">
                      {/*<iframe
                          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FLondon&mode=AGENDA&showPrint=0&src=aGVtc2xleTAwYW1iZXJAZ21haWwuY29t&color=%23039BE5"
                          scrolling="no">
                      </iframe>*/}
                      <iframe
                          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FLondon&showPrint=0&mode=AGENDA&src=YW1iZXJoZW1zbGV5MDJAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2IudWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%230B8043"
                          scrolling="no">
                      </iframe>
                  </div>
              </div>
          </div>
          <GoogleCalendar/>
      </>
  )
}

export default App
