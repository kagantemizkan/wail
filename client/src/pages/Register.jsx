import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8888/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          setRegistrationSuccess(true);
        } else {
          setRegistrationSuccess(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setRegistrationSuccess(false);
      });
  };

  return (
    <div className='register'>
      <div className='registerOptions'>
        <div className='registerText'>Yeni Hesap Oluştur</div>
        <div className='form'>
          <label className='formText'>Kullanıcı adı</label>
          <input type='text' className='formInput' placeholder='Kullanıcı adı' name="username" value={username} onChange={handleUsernameChange} />

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

          <button className='hesapOlusturButton' onClick={handleSubmit}>
            <a className='hesapOlusturButtonElements'>Hesap Oluştur</a>
          </button>
          <Link to='/login'>
            <div className='oturumAc'>Oturum Aç</div>
          </Link>
          {registrationSuccess && <div className='success'>Kayıt işlemi başarılı.</div>}
          {!registrationSuccess && <div className='error'>Kayıt işlemi başarısız.</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
