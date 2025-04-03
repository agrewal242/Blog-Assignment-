// posts.js
document.addEventListener("DOMContentLoaded", async () => {
    const blogEl = document.getElementById("blog-posts")
  
    try {
      // Fetch all posts
      const res = await fetch("http://localhost:3000/posts")
      const posts = await res.json()
  
      if (!posts.length) {
        blogEl.innerHTML = `<h2 class="title is-4 has-text-centered">No posts yet.</h2>`
        return
      }
  
      // For each post, create a simple read-only card
      posts.forEach((post) => {
        const { title, content, date } = post
        console.log(post)

        const cardEl = document.createElement("div")
        cardEl.classList.add("card", "mb-3")
        cardEl.innerHTML =  `
        <div class="card-content">
          <h3 class="title is-4">${title}</h3>
          <p class="subtitle is-6">${date || ""}</p>
          <p class="subtitle is-6">${content}</p>
        </div>
      `;
        blogEl.appendChild(cardEl)
      })
    } catch (error) {
      console.error("Error loading blog posts:", error)
      blogEl.innerHTML = `<p class="has-text-danger has-text-centered">Error loading posts.</p>`
    }
  })
  