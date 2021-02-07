let searchesDiv = document.getElementById('searchResult');
let lyricsDiv = document.getElementById('song-lyric');
document.getElementById('searchBtn').addEventListener('click', function () {
    let searchVal = document.getElementById('searchInput').value;
    const url = `https://api.lyrics.ovh/suggest/${searchVal}`;
    console.log(url);
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.data);
            displayData(data.data);
        });
    searchVal = '';
    document.getElementById('searchInput').value = searchVal;
    searchesDiv.innerHTML = '';
    lyricsDiv.innerText = '';
});
//data.data[0].album.title
//data.data[0].artist.name
//data.data[0].artist.link
function displayData(data) {
    data.forEach(val => {
        const searchDiv = document.createElement('div');
        const searchInfo = `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
        <h3 class="lyrics-name">${val.title}</h3>
        <p class="author lead">Album by <span>${val.artist.name}</span></p>
        <audio controls>
        <source src="${val.preview}" type="audio/mpeg">
        Preview.
        </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <button onClick="getLyric('${val.artist.name}', '${val.title}')" class="btn btn-success lyric">Get Lyrics</button>
        </div>
        </div>
        `;
        searchDiv.innerHTML = searchInfo;
        searchesDiv.appendChild(searchDiv);
    });
}

function getLyric(artist, title) {
    const songUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(songUrl)
        .then(resp => resp.json())
        .then(data => displayLyrics(data.lyrics));
}
function displayLyrics(lyrics) {
    lyricsDiv.innerText = lyrics;
}