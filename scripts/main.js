const imgContainer = document.getElementById("imgContainer");
const button = document.querySelector("button");

const AUDIO_VOLUME = 0.25;

button.addEventListener("click", () => {
  addHerta();
});

function addHerta() {
  const herta = createHerta();
  setRandomPos(herta);
  imgContainer.append(herta);
  playAudio();
  animate(herta);
}

function createHerta() {
  const herta = document.createElement("img");
  herta.src = "assets/herta.webp";
  herta.style.width = `100px`;
  return herta;
}

function setRandomPos(element) {
  const topPosition = rand(-50, window.screen.availHeight - 50);
  const leftPosition = rand(-50, window.screen.availWidth - 50);
  
  element.style.position = "absolute";
  element.style.top = `${topPosition}px`;
  element.style.left = `${leftPosition}px`;
}

function playAudio() {
  const audio = new Audio("assets/kuru_kuru.mp3");
  audio.volume = AUDIO_VOLUME;
  audio.loop = true;
  audio.play();
}

function animate(element) {
  setTimeout(() => {
    setRandomPos(element);
  }, 100);
  setTimeout(() => {
    animate(element);
  }, 8000);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}