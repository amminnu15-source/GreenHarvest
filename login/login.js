const themeToggle = document.getElementById("themeToggle");
const dirToggle = document.getElementById("dirToggle");

// DARK MODE
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

// RTL / LTR
dirToggle.onclick = () => {
  if(document.documentElement.dir === "ltr"){
    document.documentElement.dir = "rtl";
    dirToggle.innerText = "RTL";
  }else{
    document.documentElement.dir = "ltr";
    dirToggle.innerText = "LTR";
  }
};











document.querySelectorAll(".social-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    showToast("Social login coming soon 🚀");
  });
});

function showToast(msg){
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.style.cssText = `
    position:fixed;
    bottom:20px;
    right:20px;
    background:#22c55e;
    color:#fff;
    padding:12px 20px;
    border-radius:10px;
    box-shadow:0 10px 20px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),2000);
}