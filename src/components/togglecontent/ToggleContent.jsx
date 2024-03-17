import React from 'react'
import './ToggleContent.css'

const ToggleContent = ({content}) => {
  return (
    <div className='tc-container'>
        <div className='tc-contents'>
            <p>{content.noteContents}</p>
        </div>
        <div className='tc-date-time'>
            <div className='tc-content-date'>{content.date}</div>
            <div>.</div>
            <div className='tc-content-time'>{content.time}</div>
        </div>
    </div>
  )
}

export default ToggleContent