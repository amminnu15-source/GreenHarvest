const themeToggle = document.getElementById("themeToggle");
const dirToggle = document.getElementById("dirToggle");
const htmlTag = document.getElementById("htmlTag");

/* DARK MODE */
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
};

/* RTL / LTR */
dirToggle.onclick = () => {
  if (htmlTag.getAttribute("dir") === "rtl") {
    htmlTag.setAttribute("dir", "ltr");
    dirToggle.textContent = "LTR";
  } else {
    htmlTag.setAttribute("dir", "rtl");
    dirToggle.textContent = "RTL";
  }
};




document.querySelectorAll(".social-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    showToast("Social login coming soon 🚀");
  });
});

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}





/* ================= FORM VALIDATION ================= */

document.querySelector("form").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.querySelector('input[placeholder="Full Name"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelectorAll('input[type="password"]')[0].value;
  const confirm = document.querySelectorAll('input[type="password"]')[1].value;
  const checkbox = document.querySelector('.checkbox input').checked;

  if(!name || !email || !password){
    showToast("Please fill all fields ⚠️");
    return;
  }

  if(password !== confirm){
    showToast("Passwords do not match ❌");
    return;
  }

  if(!checkbox){
    showToast("Please accept Terms & Privacy 📜");
    return;
  }

  showToast("Account created successfully 🎉");
});