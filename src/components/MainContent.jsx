import React from 'react'
import './MainContent.css' // import the custom css file

export default function MainContent ({ children, hideWelcome }){
  // ✅ Get user from localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <main className="main-content">
      <div className="content-wrapper">
         {!hideWelcome && <h2>Welcome to My Forum {user ? `, ${user.username}` : ""}</h2>}  
         {/* Only show if not hidden */}
      
        <p>
          {children}
        </p>
      </div>
    </main>
  )
}

