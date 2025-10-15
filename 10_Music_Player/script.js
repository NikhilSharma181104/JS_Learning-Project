let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let volumeSlider = document.getElementById("volume");
let volumeIcon = document.getElementById("volume-icon");
let volumeContainer = document.querySelector(".volume-container");

let savedVolume = 100;
let previousVolume = 100;

volumeSlider.value = savedVolume;
song.volume = savedVolume / 100;

function updateVolumeIcon() {
  volumeIcon.className = "";
  if (song.volume >= 0.5) {
    volumeIcon.className = "fa-solid fa-volume-high";
  } else if (song.volume > 0 && song.volume < 0.5) {
    volumeIcon.className = "fa-solid fa-volume-low";
  } else {
    volumeIcon.className = "fa-solid fa-volume-xmark";
  }
}

updateVolumeIcon();

let volumeTimeout;
function showVolumeSlider() {
  volumeSlider.style.opacity = "1";
  clearTimeout(volumeTimeout);
  volumeTimeout = setTimeout(() => {
    if (!volumeContainer.matches(":hover")) {
      volumeSlider.style.opacity = "0";
    }
  }, 2000);
}

// Volume slider event listener
volumeSlider.addEventListener("input", function() {
  song.volume = this.value / 100;
  savedVolume = this.value;
  updateVolumeIcon();
  showVolumeSlider();
});

volumeIcon.addEventListener("click", function() {
  if (song.volume > 0) {
    previousVolume = volumeSlider.value;
    song.volume = 0;
    volumeSlider.value = 0;
    savedVolume = 0;
  } else {
    song.volume = previousVolume / 100;
    volumeSlider.value = previousVolume;
    savedVolume = previousVolume;
  }
  updateVolumeIcon();
  showVolumeSlider();
});

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
  }
}

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.remove("fa-play");
  ctrlIcon.classList.add("fa-pause");
};