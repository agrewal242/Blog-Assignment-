// manage_posts.js
document.addEventListener("DOMContentLoaded", async function () {
  const containerEl = document.getElementById("posts-container");

  try {
    // Fetch all posts from the /manage_posts endpoint
    const res = await fetch("http://localhost:3000/manage_posts");
    const posts = await res.json();

    if (!posts.length) {
      containerEl.innerHTML = `<p class="has-text-centered">No posts yet.</p>`;
      return;
    }

    // Create a card for each post
    posts.forEach((post) => {
      const { _id, title, content, date } = post;

      const cardEl = document.createElement("div");
      cardEl.classList.add("card", "mb-3", "is-fullwidth");

      cardEl.innerHTML = `
        <div class="card-content is-flex is-justify-content-space-between is-align-items-center">
          <!-- Left side: title & content -->
          <div>
            <h3 class="title is-4">${title}</h3>
            <p class="subtitle is-6">${date || ""}</p>
            <p class="subtitle is-6">${content}</p>
          </div>
          <!-- Right side: Delete/Edit buttons -->
          <div>
            <button class="button is-small is-danger delete-button">Delete</button>
            <a href="update_post.html?id=${_id}" class="button is-small is-info ml-2">Edit</a>
          </div>
        </div>
      `;
      containerEl.appendChild(cardEl);
    });

    // Attach Delete event listeners
    document.querySelectorAll(".delete-button").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const cardContent = btn.closest(".card-content");
        const titleEl = cardContent.querySelector(".title.is-4");
        const postTitle = titleEl ? titleEl.innerText : "this post";

        // Extract the post ID from the "Edit" link
        const editLink = cardContent.querySelector("a");
        const urlParams = new URLSearchParams(editLink.href.split("?")[1]);
        const postId = urlParams.get("id");

        const confirmDelete = confirm(`Delete the post "${postTitle}"?`);
        if (!confirmDelete) return;

        try {
          const deleteRes = await fetch(`http://localhost:3000/manage_posts?id=${postId}`, {
            method: "DELETE",
          });
          if (deleteRes.ok) {
            btn.closest(".card").remove();
          }
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    containerEl.innerHTML = `<p class="has-text-centered has-text-danger">Error loading posts.</p>`;
  }
});
