const BaseUrl =
  "https://www.jiosaavn.com/api.php?_format=json&_marker=0&ctx=web6dot0";

export const enum ApiType {
  // search
  searchAll = "autocomplete.get",
  // details by id
  songDetails = "song.getDetails",
  albumDetails = "content.getAlbumDetails",
  playlistDetails = "playlist.getDetails",

  // details by link
  artistDetails = "webapi.get&type=artist&n_song=50",
  songDetailsByLink = "webapi.get&type=song",
  albumDetailsByLink = "webapi.get&type=album",

  homeData = "webapi.getLaunchData",
  albums = "content.getAlbums", // supports pagination
  lyrics = "lyrics.getLyrics",
  playlists = "content.getFeaturedPlaylists&fetch_from_serialized_files=true", // supports pagination
  getFooterDetails = "webapi.getFooterDetails&language=telugu",
  artists = "social.getTopArtists",
}

export const getEndpoint = (isVersion4: boolean, api: string) =>
  `${BaseUrl}${isVersion4 ? "&api_version=4" : ""}&__call=${api}`;
