const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");

for (let card of cards) {
  card.addEventListener("click", function() {
    modalOverlay.classList.add("active");
    modalOverlay.querySelector("img").src = card.querySelector("img").src;
    modalOverlay.querySelector(".modal-content-description h1").innerHTML = card.querySelector(".card h1").textContent;
    modalOverlay.querySelector(".modal-content-description p").innerHTML = card.querySelector(".card p").textContent;
  });
}

document
  .querySelector(".modal-content-close")
  .addEventListener("click", function() {
    modalOverlay.classList.remove("active");
  });