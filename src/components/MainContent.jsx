import React from 'react'
import './MainContent.css' // import the custom css file

export default function MainContent ({ children }){
  return (
    <main className="main-content">
      <div className="content-wrapper">
        <h2>Welcome to My Forum</h2>

        <p>
          {children}
        </p>
      </div>
    </main>
  )
}

