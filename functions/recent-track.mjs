export async function handler() {
  const key = process.env.LASTFM_KEY;
  const user = "ill_pill";
  const base_URL =
    "https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks";

  const url = `${base_URL}&user=${user}&api_key=${key}&format=json`;
  console.log("KEY:", process.env.LASTFM_KEY);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch from Last.fm" }),
      };
    }

    const result = await response.json();
    const track = result.recenttracks.track[0];

    const data = {
      isPlaying: track["@attr"]?.nowplaying === "true",
      title: track.name,
      artist: track.artist["#text"],
      coverArt: track.image?.[1]?.["#text"] || "",
      playedAt: track.date?.uts || null,
      url: track.url,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
