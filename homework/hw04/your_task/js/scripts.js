const baseURL = "https://www.apitutor.org/spotify/simple/v1/search";

// Note: AudioPlayer is defined in audio-player.js
const audioFile =
  "https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c";
const audioPlayer = AudioPlayer(".player", audioFile);

const search = (ev) => {
  const term = document.querySelector("#search").value;
  console.log("search for:", term);
  // issue three Spotify queries at once...
  getTracks(term);
  getAlbums(term);
  getArtist(term);
  if (ev) {
    ev.preventDefault();
  }
};

const getTracks = async (term) => {
  const api = `${baseURL}?type=track&q=${term}`;
  const res = await fetch(api);
  let tracks = await res.json();
  const tracksElem = document.querySelector("#tracks");
  if (tracks.length === 0) {
    tracksElem.innerHTML = "No tracks found that match your search criteria.";
  } else {
    tracks = tracks.slice(0, 5);
    tracksElem.innerHTML = "";
    for (const track of tracks) {
      tracksElem.innerHTML += createTrackCard(track);
    }
  }
};

const createTrackCard = (track) => {
  return `<button class="track-item preview" data-preview-track="${track.preview_url}" onclick="handleTrackClick(event);">
      <img src="${track.album.image_url}">
      <i class="fas play-track fa-play" aria-hidden="true"></i>
      <div class="label">
          <h2>${track.name}</h2>
          <p>
              ${track.artist.name}
          </p>
      </div>
  </button>`;
};

const getAlbums = (term) => {
  console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
};

const getArtist = async (term) => {
  console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);

  const api = `${baseURL}?type=artist&q=${term}`;
  const res = await fetch(api);
  const artists = await res.json();
  const artistElem = document.querySelector("#artist");
  if (artists.length === 0) {
    artistElem.innerHTML = "No artist was returned.";
  } else {
    const artist = artists[0];
    artistElem.innerHTML = createArtistCard(artist);
    // artistSection.onclick = () => displayTopTracks(artist);
  }
};

const createArtistCard = (artist) => {
  const html = `<section class="artist-card" id="${artist.id}">
    <div>
      <img src="${artist.image_url}">
        <h2>${artist.name}</h2>
          <div class="footer">
            <a href="${artist.spotify_url}" target="_blank">
              view on spotify
            </a>
          </div>
    </div>
  </section>`;
  return html;
};

const handleTrackClick = (ev) => {
  const previewUrl = ev.currentTarget.getAttribute("data-preview-track");
  console.log(previewUrl);
};

document.querySelector("#search").onkeyup = (ev) => {
  // Number 13 is the "Enter" key on the keyboard
  console.log(ev.keyCode);
  if (ev.keyCode === 13) {
    ev.preventDefault();
    search();
  }
};
