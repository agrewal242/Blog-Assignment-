// new_post.js
document.addEventListener("DOMContentLoaded", function () {
    const errNotifEl = document.querySelector(".fail-notif")
    const notifEl = document.querySelector(".success-notif")
  
    // Close notifications
    document.querySelectorAll("button.delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.parentElement.classList.add("is-hidden")
      })
    })
  
    // Handle form submission
    const formEl = document.querySelector("#form")
    formEl.addEventListener("submit", async (e) => {
      e.preventDefault()
      const data = new FormData(formEl)
      const objectData = Object.fromEntries(data)
   
      const date = new Date()
      objectData.date = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
   
      try {
        const res = await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(objectData),
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
  