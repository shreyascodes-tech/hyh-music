import { ApiType, getEndpoint } from "./endpoints";

export interface Song {
  id: string;
  name: string;
  year: string;
  primaryArtists: string;
  primaryArtistsId: string;
  image: {
    quality: string;
    link: string;
  }[];
  label: string;
  album: {
    id: string;
    name: string;
    url: string;
  };
  language: string;
  playCount: string;
  copyright: string;
  explicitContent: number;
  hasLyrics: string;
  releaseDate: string;
  permaUrl: string;
  albumUrl: string;
  duration: string;
  downloadUrl: {
    quality: string;
    link: string;
  }[];
}

export interface Album {
  id: any;
  name: any;
  year: any;
  playCount: any;
  language: any;
  explicitContent: any;
  songCount: any;
  primaryArtist: any;
  image:
    | boolean
    | {
        quality: string;
        link: string;
      }[];
  url: string;
  songs: Song[];
}

export interface Playlist {
  id: any;
  name: any;
  followerCount: any;
  songCount: any;
  fanCount: any;
  username: any;
  firstname: any;
  lastname: any;
  image:
    | boolean
    | {
        quality: string;
        link: string;
      }[];
  url: any;
  songs: Song[];
}

export interface Artist {
  name: string;
  image: string;
  subtitle: string;
  topSongs: {
    id: string;
    title: string;
    image: string;
  }[];
}

function request(path: string, init?: RequestInit) {
  return fetch(path, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json, text/plain, */*",
      "Cache-Control": "no-cache",
      Cookie: "L=telugu",
    },
    ...init,
  }).then((r) => r.json());
}

export async function getHomeData() {
  const endpoint = getEndpoint(true, ApiType.homeData);
  const data: any = await request(endpoint);
  return data;
}

const detailsEPs = {
  album: (id: string) =>
    getEndpoint(false, ApiType.albumDetails + `&albumid=${id}`),
  song: (id: string) => getEndpoint(false, ApiType.songDetails + `&pids=${id}`),
  playlist: (id: string) =>
    getEndpoint(false, ApiType.playlistDetails + `&listid=${id}`),
  artist: (id: string) =>
    getEndpoint(
      true,
      ApiType.artistDetails + `&token=${id.split("/").pop()}&_n=20`
    ),
};

const createImageLinks = (link: string) => {
  if (!link) return false;

  const qualities = ["50x50", "150x150", "500x500"];

  return (
    qualities.map((quality) => ({
      quality,
      link: link.replace("150x150", quality),
    })) || false
  );
};

const createDownloadLinks = (link: string) => {
  if (!link) return false;

  const qualities = [
    { id: "_12", bitrate: "12kbps" },
    { id: "_48", bitrate: "48kbps" },
    { id: "_96", bitrate: "96kbps" },
    { id: "_160", bitrate: "160kbps" },
    { id: "_320", bitrate: "320kbps" },
  ];

  return (
    qualities.map((quality) => ({
      quality: quality.bitrate,
      link: link
        .replace("preview.saavncdn.com", "aac.saavncdn.com")
        .replace("_96_p", quality.id),
    })) || false
  );
};

const transformData = {
  album(album: any) {
    const songsArray: any = [];

    const albumPayload = {
      id: album?.albumid || album?.id,
      name: album.title,
      year: album.year,
      playCount: album.play_count,
      language: album.language,
      explicitContent: album.explicit_content,
      songCount: album?.more_info?.song_count || album?.songs?.length,
      primaryArtist:
        album.primary_artists ||
        album.more_info?.artistMap?.primary_artists[0]?.name,
      image: createImageLinks(album.image),
      url: album.perma_url,
      songs: [] as Song[],
    };

    // if album details contain song list
    if (album.songs) {
      album.songs.forEach((song: any) =>
        songsArray.push(this.oneSong(song) as never)
      );
      albumPayload.songs = songsArray;
    }

    return albumPayload;
  },
  oneSong(song: any) {
    const songPayload = {
      id: song.id,
      name: song.song,
      album: { id: song.albumid, name: song.album, url: song.album_url },
      year: song.year,
      releaseDate: song.release_date,
      duration: song.duration,
      label: song.label,
      primaryArtists: song.primary_artists,
      primaryArtistsId: song.primary_artists_id,
      explicitContent: song.explicit_content,
      playCount: song.play_count,
      language: song.language,
      hasLyrics: song.has_lyrics,
      artist: song.primary_artists,
      image: createImageLinks(song.image),
      url: song.perma_url,
      copyright: song.copyright_text,
      downloadUrl: createDownloadLinks(song.media_preview_url),
    };
    return songPayload;
  },
  song({ songs }: any) {
    const payload = [] as unknown[];

    songs.forEach((song: Song) => {
      payload.push(this.oneSong(song));
    });

    return payload;
  },
  playlist(playlist: any) {
    const songsArray = [] as Song[];

    const playlistPayload = {
      id: playlist.listid,
      name: playlist.listname,
      followerCount: playlist.follower_count,
      songCount: playlist.list_count || playlist?.songs?.length,
      fanCount: playlist.fan_count,
      username: playlist.username,
      firstname: playlist.firstname,
      lastname: playlist.lastname,
      image: createImageLinks(playlist.image),
      url: playlist.perma_url,
      songs: [] as Song[],
    };

    // if playlist details contain song list
    if (playlist.songs) {
      playlist.songs.forEach((song: Song) =>
        songsArray.push(this.oneSong(song) as never)
      );
      playlistPayload.songs = songsArray;
    }

    return playlistPayload;
  },
  artist(artist: any) {
    return {
      name: artist.name as string,
      subtitle: artist.subtitle as string,
      image: artist.image as string,
      topSongs: artist.topSongs as {
        id: string;
        title: string;
        image: string;
      }[],
    };
  },
};

export async function getFooterDetails() {
  const endpoint = getEndpoint(true, ApiType.getFooterDetails);
  const data: any = await request(endpoint);
  return data as Record<
    string,
    {
      id: string;
      title: string;
      action: string;
    }[]
  >;
}

export async function getArtists() {
  const endpoint = getEndpoint(true, ApiType.artists);
  const data: any = await request(endpoint);
  return data["top_artists"] as {
    artistid: string;
    name: string;
    image: string;
    follower_count: string;
    perma_url: string;
  }[];
}

export async function getDetails(type: string, id: string) {
  if (!(detailsEPs as any)[type]) {
    return null;
  }
  const endpoint = (detailsEPs as any)[type](id);

  const data: any = await request(endpoint);

  return (transformData as any)[type](data);
}

export async function getLyrics(songId: string) {
  const endpoint = getEndpoint(true, ApiType.lyrics + `&lyrics_id=${songId}`);
  const data: any = await request(endpoint);
  const lyrics = data.lyrics as string;
  return lyrics.replace(/"/gi, "'").replace(/ {2}/gi, " ").split("<br>");
}

const supported = ["song", "album", "playlist", "artist"];
export async function getAutoComplete(query: string) {
  const endpoint = getEndpoint(false, ApiType.searchAll + `&query=${query}`);
  const data: any = await request(endpoint);
  return {
    albums: (data.albums?.data as any[]) ?? [],
    artists: (data.artists?.data as any[]) ?? [],
    songs: (data.songs?.data as any[]) ?? [],
    playlists: (data.playlists?.data as any[]) ?? [],
    topQuery: ((data.topquery?.data as any[]) ?? []).filter((tq) =>
      supported.includes(tq.type)
    ),
  };
}
