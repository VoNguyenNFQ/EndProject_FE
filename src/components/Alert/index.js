import React, { useState, useEffect } from "react";
import styled from "styled-components";
const StyledAlert = styled.div`
    -webkit-animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    input:checked~*{
        -webkit-animation: fade-out-right 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        animation: fade-out-right 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .alert-success{
        background-color:#6bb55ddb;
        color:#1b7e09;
    }
    .alert-error{
      background-color:#c80d3087;
      color:#b80f0f;
    }
    .alert-warning{
      background-color:#edcb2387;
      color:#eecf20;

    }
    @-webkit-keyframes slide-in-right {
      0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0
      }

      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1
      }
    }

    @keyframes slide-in-right {
      0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0
      }

      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1
      }
    }

    @-webkit-keyframes fade-out-right {
      0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1
      }

      100% {
        -webkit-transform: translateX(50px);
        transform: translateX(50px);
        opacity: 0
      }
    }

    @keyframes fade-out-right {
      0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1
      }

      100% {
        -webkit-transform: translateX(50px);
        transform: translateX(50px);
        opacity: 0
      }
    }
`

const Alert = ({ type, msg, style }) => {
  const [showAlert, setShowAlert] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false)
    }, 5000);
    return () => clearTimeout(timeout)
  }, [])
  return (
    <StyledAlert>
      {showAlert ? (

        <div className={`alert fixed ${style}`}>
          <input type="checkbox" className="hidden" id="footertoast" />

          <label className={`alert-${type} close cursor-pointer shadow-lg flex items-center justify-center w-full p-7 rounded shadow-lg`} title="close" for="footertoast">
            <div className="flex space-x-3">
              {type == 'success' ?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="flex-none fill-current h-4 w-4">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
                </svg>
              }
              <div className="flex-1 leading-tight text-md font-medium text-white">{msg}</div>
            </div>
          </label>
        </div>

      ) : null}
    </StyledAlert>
  )
}
export default Alert