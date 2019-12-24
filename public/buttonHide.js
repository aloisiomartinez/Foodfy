const contents = document.querySelectorAll(".cards")

for (let card of cards) {
  const hide = card.querySelector('.hide')
  hide.addEventListener("click", function () {
    card.querySelector('.show').classList.remove('onOff')
    card.querySelector('.hide').classList.add('onOff')
    card.querySelector('.ingredients_list').classList.add('hidden')
  })
}

for (let card of cards) {
  const show = card.querySelector('.show')
  show.addEventListener("click", function () {
    card.querySelector('.hide').classList.remove('onOff')
    card.querySelector('.show').classList.add('onOff')
    card.querySelector('.ingredients_list').classList.remove('hidden')
  })
}