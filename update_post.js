// update_post.js
document.addEventListener("DOMContentLoaded", async function () {
    const errNotifEl = document.querySelector(".fail-notif")
    const notifEl = document.querySelector(".success-notif")
  
    // Close notification buttons
    document.querySelectorAll("button.delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.parentElement.classList.add("is-hidden")
      })
    })
  
    // Parse the "id" from the URL
    const urlParams = new URLSearchParams(window.location.search)
    const postId = urlParams.get("id")
  
    const titleEl = document.querySelector("#post-title")
    const contentEl = document.querySelector("#post-content")
  
    // Fetch the existing post data and populate the form
    try {
      const res = await fetch(`http://localhost:3000/posts/${postId}`)
      if (res.ok) {
        const postData = await res.json()
        titleEl.value = postData.title
        contentEl.value = postData.content
      }
    } catch (error) {
      console.error("Error fetching post:", error)
    }
  
    // Handle form submission => PUT to update
    const formEl = document.querySelector("#form")
    formEl.addEventListener("submit", async (e) => {
      e.preventDefault()
      const updatedData = {
        title: titleEl.value,
        content: contentEl.value,
      }
      try {
        const res = await fetch(`http://localhost:3000/posts/${postId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        })
        if (res.ok) {
          notifEl.classList.remove("is-hidden")
        } else {
          errNotifEl.classList.remove("is-hidden")
        }
      } catch (error) {
        errNotifEl.classList.remove("is-hidden")
      }
    })
  })
  