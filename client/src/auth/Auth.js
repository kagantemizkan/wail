import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const getTokenFromURL = () => {
  const hash = window.location.hash.substr(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  return accessToken;
};

export const authenticateUser = (setSpotifyToken, setLoggedIn) => {
  const spotifyToken = getTokenFromURL();
  window.location.hash = '';

  if (spotifyToken) {
    setSpotifyToken(spotifyToken);
    spotifyApi.setAccessToken(spotifyToken);
    spotifyApi.getMe().then((user) => {
      console.log(user);
    });
    setLoggedIn(true);
  }
};

export const logoutUser = (setSpotifyToken, setLoggedIn) => {
  // Kullanıcının oturumunu sonlandırma işlemlerini burada gerçekleştirin
  setSpotifyToken(''); // Spotify token'ı sıfırlayın veya gerektiğine göre temizleyin
  setLoggedIn(false); // loggedIn durumunu false olarak ayarlayın veya kullanıcıyı oturum dışı bırakmak için gereken adımları gerçekleştirin
};