var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// functions/recent-track.mjs
var recent_track_exports = {};
__export(recent_track_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(recent_track_exports);
async function handler() {
  const key = process.env.LASTFM_KEY;
  const user = "ill_pill";
  const base_URL = "https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks";
  const url = `${base_URL}&user=${user}&api_key=${key}&format=json`;
  console.log("KEY:", process.env.LASTFM_KEY);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch from Last.fm" })
      };
    }
    const result = await response.json();
    const track = result.recenttracks.track[0];
    const data = {
      isPlaying: track["@attr"]?.nowplaying === "true",
      title: track.name,
      artist: track.artist["#text"],
      coverArt: track.image?.[1]?.["#text"] || "",
      playedAt: track.date?.uts || null
    };
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=recent-track.js.map
