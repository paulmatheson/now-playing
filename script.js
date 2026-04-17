const player = document.getElementById("player");
const coverArt = document.getElementById("album-art");
const artist = document.getElementById("artist");
const title = document.getElementById("track");
const time = document.getElementById("status-text");

async function getData() {
  try {
    const response = await fetch("/.netlify/functions/recent-track");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.log(error.message);
  }
}

function setPlayerState(state) {
  player.classList.remove("playing", "idle");
  player.classList.add(state);
}

function updateUI(data) {
  const playedDate = data.playedAt
    ? new Date(Number(data.playedAt) * 1000).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  artist.textContent = data.artist;
  title.textContent = data.title;
  document.getElementById("track-link").href = data.url;

  if (data.coverArt) {
    coverArt.src = data.coverArt;
  }

  time.textContent = data.isPlaying
    ? "Listening now"
    : playedDate
      ? `Last played ${playedDate}`
      : "Last played recently";

  setPlayerState(data.isPlaying ? "playing" : "idle");
}

getData();
setInterval(getData, 90000);
