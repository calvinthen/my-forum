import React, { useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import './Home.css' // custom styles

const Home = () => {
  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState("")

  const handleSubmit = () => {
    setSubmitted(text)
    setText("")
  }

  return (
    <DefaultLayout>
      <div className="home-wrapper">

        {/* Centered input + button */}
        <div className="form-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What is on your mind?"
            className="text-input"
          />
          <button onClick={handleSubmit} className="submit-btn">
            Post
          </button>
        </div>

        {submitted && (
          <p className="submitted-text">
            You wrote: <strong>{submitted}</strong>
          </p>
        )}
      </div>
    </DefaultLayout>
  )
}

export default Home