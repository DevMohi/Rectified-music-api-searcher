const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const artistContainer = elementById("artists");
  const albumContainer = elementById("albums");

  if(keyword.value === ""){
    console.log('error')
  }
  else{
    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
    fetch(url)
      .then(res => res.json())
      .then(data => showArtists(data.artists));
    
    keyword.value = "";
    artistContainer.innerHTML = "";
    albumContainer.innerHTML = "";
  }
};

const showArtists = (data) => {

  const artistContainer = elementById("artists");
  data.forEach((artist) => {
 
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist:'Not available'}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : 'Not available'}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : 'Not available'}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));


  const albumContainer = elementById("albums");
  albumContainer.innerHTML = ""; 
};

const showAlbum = (data) => {
  
  const albumContainer = elementById("albums");
  data.forEach((item) => {
    console.log(item)
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
