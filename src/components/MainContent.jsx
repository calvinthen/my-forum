import React from 'react'
import './MainContent.css' // import the custom css file

export default function MainContent ({ children, hideWelcome }){
  return (
    <main className="main-content">
      <div className="content-wrapper">
         {!hideWelcome && <h2>Welcome to My Forum</h2>}  {/* Only show if not hidden */}

        <p>
          {children}
        </p>
      </div>
    </main>
  )
}

