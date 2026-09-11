const loginCard = document.getElementById("login-card");
const registerCard = document.getElementById("register-card");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function setCard(mode) {
  const isLogin = mode === "login";
  loginCard.classList.toggle("hidden", !isLogin);
  registerCard.classList.toggle("hidden", isLogin);
}

function markValidity(form) {
  [...form.querySelectorAll(".field")].forEach((field) => {
    const input = field.querySelector("input");
    field.classList.toggle("error", input && !input.checkValidity());
  });
}

document.getElementById("show-register").addEventListener("click", () => setCard("register"));
document.getElementById("show-login").addEventListener("click", () => setCard("login"));
document.getElementById("forgot-btn").addEventListener("click", () => {
  showToast("Password reset is not connected yet.");
});

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  markValidity(form);
  if (!form.checkValidity()) {
    showToast("Enter a valid email and password.");
    return;
  }
  showToast("Logged in successfully.");
});

document.getElementById("register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const password = form.password.value;
  const confirm = form.confirm.value;
  markValidity(form);
  if (!form.checkValidity()) {
    showToast("Fill in all fields with a valid email.");
    return;
  }
  if (password !== confirm) {
    showToast("Passwords do not match.");
    return;
  }
  showToast("Account created. You can log in now.");
  form.reset();
  setCard("login");
});
