import React from 'react'

export default function Button(props) {
    const { buttonText, buttonColor, buttonFunction } = props
  return (
    <button 
    className={buttonColor}
    onClick={() => {buttonFunction()}}>{buttonText}</button>
  )
}
