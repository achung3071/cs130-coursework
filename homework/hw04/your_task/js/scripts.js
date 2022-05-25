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
        tracksElem.innerHTML =
            "No tracks found that match your search criteria.";
    } else {
        tracks = tracks.slice(0, 5);
        tracksElem.innerHTML = "";
        for (const track of tracks) {
            tracksElem.innerHTML += createTrackCard(track);
        }
    }
};

const createTrackCard = (track, imageUrl, artistName, albumName) => {
    return `<button class="track-item preview"
        ${
            track.preview_url
                ? `data-preview-track="${track.preview_url}" onclick="handleTrackClick(event);"`
                : ""
        }>
      <img src="${
          imageUrl ? imageUrl : track.album.image_url
      }" alt="Album artwork for ${albumName ? albumName : track.album.name}">
      ${
          track.preview_url
              ? `<i class="fas play-track fa-play" aria-hidden="true"></i>`
              : ""
      }
      <div class="label">
          <h2>${track.name}</h2>
          <p>
              ${artistName ? artistName : track.artist.name}
              ${track.preview_url ? "" : " (no preview available)"}
          </p>
      </div>
  </button>`;
};

const handleTrackClick = (ev) => {
    const currentTrackElem = document.querySelector("#current-track");
    currentTrackElem.innerHTML = ev.currentTarget.innerHTML;
    const previewUrl = ev.currentTarget.dataset.previewTrack;
    console.log(previewUrl);
    if (audioPlayer.getAudioFile() !== previewUrl) {
        audioPlayer.setAudioFile(previewUrl);
    }
    audioPlayer.togglePlay();
};

const getAlbums = async (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
    const api = `${baseURL}?type=album&q=${term}`;
    const res = await fetch(api);
    const albums = await res.json();
    const albumsElem = document.querySelector("#albums");
    if (albums.length === 0) {
        albumsElem.innerHTML = "No albums were returned.";
    } else {
        albumsElem.innerHTML = "";
        for (const album of albums) {
            albumsElem.innerHTML += createAlbumCard(album);
        }
    }
};

const createAlbumCard = (album) => {
    return `<section class="album-card" id="${album.id}" onclick="getAlbumTracks(event);" data-album-name="${album.name}" data-image-url="${album.image_url}">
      <div>
          <img src="${album.image_url}" alt="Album artwork for ${album.name}">
          <h2>${album.name}</h2>
          <div class="footer">
              <a href="${album.spotify_url}" target="_blank">
                  view on spotify
              </a>
          </div>
      </div>
  </section>`;
};

const getAlbumTracks = async (ev) => {
    const albumId = ev.currentTarget.getAttribute("id");
    const imageUrl = ev.currentTarget.dataset.imageUrl;
    const albumName = ev.currentTarget.dataset.albumName;
    const api = `https://www.apitutor.org/spotify/v1/albums/${albumId}/tracks`;
    const response = await fetch(api);
    const { items } = await response.json();
    const tracksElem = document.querySelector("#tracks");
    const tracks = items.slice(0, 5);
    tracksElem.innerHTML = "";
    for (const track of tracks) {
        tracksElem.innerHTML += createTrackCard(
            track,
            imageUrl,
            track.artists[0].name,
            albumName
        );
    }
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
    }
};

const createArtistCard = (artist) => {
    const html = `<section class="artist-card" id="${artist.id}" onclick="getArtistTopTracks(event);" data-artist-name="${artist.name}">
    <div>
      <img src="${artist.image_url}" alt="Image of ${artist.name}">
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

const getArtistTopTracks = async (ev) => {
    const artistId = ev.currentTarget.getAttribute("id");
    const artistName = ev.currentTarget.dataset.artistName;
    const api = `https://www.apitutor.org/spotify/v1/artists/${artistId}/top-tracks?country=us`;
    const response = await fetch(api);
    let { tracks } = await response.json();
    const tracksElem = document.querySelector("#tracks");
    tracks = tracks.slice(0, 5);
    tracksElem.innerHTML = "";
    for (const track of tracks) {
        tracksElem.innerHTML += createTrackCard(
            track,
            track.album.images[0].url,
            artistName
        );
    }
};

document.querySelector("#search").onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};
