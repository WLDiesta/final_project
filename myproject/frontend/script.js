const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const res = await fetch("http://localhost:8000/api/users/", {
      method: "POST",
      body: formData,
    });
    alert(await res.text());
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm));
    const res = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    localStorage.setItem("token", result.access);
    alert("Login successful");
    window.location.href = "posts.html";
  });
}

const token = localStorage.getItem("token");

// CRUD for posts
const createPostForm = document.getElementById("createPostForm");
const postsList = document.getElementById("postsList");

if (createPostForm) {
  createPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(createPostForm);
    const data = Object.fromEntries(form.entries());
    const res = await fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    alert(await res.text());
    fetchPosts();
  });
}

async function fetchPosts() {
  const res = await fetch("http://localhost:8000/api/posts/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const posts = await res.json();
  postsList.innerHTML = "";
  posts.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${post.title}</strong><br>
      ${post.content}<br>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    postsList.appendChild(li);
  });
}

async function deletePost(id) {
  await fetch(`http://localhost:8000/api/posts/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  fetchPosts();
}

if (postsList) fetchPosts();