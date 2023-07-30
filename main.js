const button = document.querySelector("button");

button.addEventListener("click", () => {
  let herta = document.createElement("img");
  herta.src = "herta.webp";

  herta.style.width = "100px";

  herta.style.position = "absolute";
  herta.style.top = `${rand(0, window.screen.height - 150)}px`;
  herta.style.left = `${rand(0, window.screen.width - 100)}px`;

  let audio = new Audio("kuru_kuru.mp3");
  audio.volume = 0.3;
  audio.loop = true;
  audio.play();

  document.body.append(herta);
});

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}