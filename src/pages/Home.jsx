import React, { useState , useEffect} from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import './Home.css' // custom styles

const Home = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [text, setText] = useState("")
  const [posts, setPosts] = useState([])   // store all posts
  const [loading, setLoading] = useState(false)

  // 🔹 Fetch all posts when page loads
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/posts-status")
      if (!res.ok) throw new Error("Failed to fetch posts")
      const data = await res.json()
      setPosts(data) // save posts from server
    } catch (err) {
      console.error(err)
      alert("Error loading posts")
    }
  }


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
      setPosts([data, ...posts])// server response
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
        
        {/* Centered input + button (only show if logged in) */}
        {user && (
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
        )}



        {/* 🔹 Show all posts */}
        <div className="posts-list">
          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-item">
                ID = {post.id} - Said: {post.content}
              </div>
            ))
          )}
        </div>

      </div>
    </DefaultLayout>
  )
}

export default Home