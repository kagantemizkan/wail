import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSpotifyLogin = () => {
    window.location.href = 'http://localhost:8888/login';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8889/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          navigate('/wail');
        } else {
          setError('Giriş bilgilerinizi kontrol ediniz.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      });
  };

  return (
    <div className='login'>
      <div className='loginOptions'>
        <div className='loginText'>WAIL'de oturum aç</div>

        <button className='button' onClick={handleSpotifyLogin}>
          <a className='buttonElements'>
            {' '}
            <Icon icon='mdi:spotify' width='34' height='34' color='#1ed760' /> Spotify ile Giriş Yap
          </a>
        </button>

        <hr className='line' />

        <div className='form'>
          <label className='formText'>E-posta adresi</label>
          <input type='text' className='formInput' placeholder='E-posta adresi' value={email} onChange={handleEmailChange} />

          <label className='formText'>Parola</label>
          <input
            type='password'
            className='formInput'
            placeholder='Parola'
            value={password}
            onChange={handlePasswordChange}
          />
          <div className='parolaUnuttum'>Parolanı mı unuttun?</div>

          <button className='girisYapButton' onClick={handleSubmit}>
            <a className='girisYapButtonElements'>Giriş Yap</a>
          </button>
          <Link to='/register'>
            <div className='uyeOl'>Üye Ol</div>
          </Link>

          {error && <div className='error'>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
