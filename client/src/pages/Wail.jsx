import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const Wail = () => {
  const [nowPlaying, setNowPlaying] = useState({});

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((response) => {
      console.log(response);
      if (response.item) {
        setNowPlaying({
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          artist: response.item.artists[0].name,
        });
      } else {
        setNowPlaying({
          name: 'No song playing',
          albumArt: '',
          artist: ''
        });
      }
    });
  };

  useEffect(() => {
    // İlk olarak şarkıyı kontrol etmek için bir kez çalıştırıyoruz
    getNowPlaying();

    // Her 1 saniyede bir şarkıyı kontrol etmek için setInterval kullanıyoruz
    const interval = setInterval(() => {
      getNowPlaying();
    }, 1000);

    // Komponent kaldırıldığında interval'i temizliyoruz
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='wail'>
      
      <div className='trackDetails'>
        <div className='imgContainer'><img className='trackImg' src={nowPlaying.albumArt} alt='Album Art' /></div>
        <div className='trackNameandArtist'>
          <div className='trackName'>{nowPlaying.name}</div>
          <div className='trackSinger'>{nowPlaying.artist}</div>
        </div>
      </div>
    
    </div>
  );
};

export default Wail;