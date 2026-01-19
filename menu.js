fetch("menu.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("menu-container").innerHTML = data;
  });

function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}
