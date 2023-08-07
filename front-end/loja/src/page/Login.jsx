import '../App.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../service/fetch';
import { Alert, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GetAppSharp from '@mui/icons-material/GetAppSharp';
import validateEmail from '../utils/validateEmail';


function Login() {
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleClick = async () => {
    if (validateEmail(email)) {
      const update = {
        email,
        password,
      };

      const options = {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { message, data } = await fetchUser(options, '/');
      if (message) {
        setShowAlert(true);
        setMsg(message);
        setPassword('');
        setEmail('');
        startTimer();
      } else {
        localStorage.setItem('token', JSON.stringify(data));
        localStorage.setItem('email', JSON.stringify(email));
        navigate('/create');
        setPassword('');
        setEmail('');
        startTimer();
      }
    } else {
      setShowAlert(true);
      setMsg('check it email!');
      setPassword('');
      setEmail('');
      startTimer();
    }
  };

  const startTimer = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>
                  <input type="text"
                    style={{ marginBottom: '0.2vw' }}
                    className="form-control"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input type="password"
                    className="form-control"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <button type="button"
                    style={{ marginLeft: '15vh', width: '10vh', height: '5vh', marginTop: '0.5vw', textAlign: 'center'}}
                    className="btn btn-success" 
                    onClick={handleClick}
                  >
                    <GetAppSharp />
                  </button>
                </div>
              </form>
            </div>
            {showAlert && (
              <Alert severity="error">
                This is an error alert — <strong>{msg}</strong>
              </Alert>
            )}
            <div className="card-footer">
              <Link to="/user" style={{ color: 'blue', textDecoration: 'underline' }}>
                <Typography variant="body1">
                  Create user
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
