import React, { useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import './Home.css' // custom styles

const Home = () => {
  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!text.trim()) return

    setLoading(true)
    try {
      // fetch to backend API (example: http://localhost:5000/posts-status)
      const res = await fetch("http://localhost:5000/posts-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      })

      if (!res.ok) throw new Error("Failed to save post")

      const data = await res.json()
      setSubmitted(data.content) // server response
      setText("")
    } catch (err) {
      console.error(err)
      alert("Error saving post")
    } finally {
      setLoading(false)
    }
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
          <button onClick={handleSubmit} className="submit-btn" disabled={loading}>
            {loading ? "Posting..." : "Post"}
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