import { Alert, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { fetchUser } from '../service/fetch';
import { useNavigate } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add"
import formateCPF from '../utils/FormataCpf';
import validateEmail from "../utils/validateEmail";

export default function CreateUser() {
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleClick = async () => {
    if (validateEmail(email)) {
      const update = {
        email,
        name,
        password,
        cpf: formateCPF(cpf),
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(update),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { message } = await fetchUser(options, '/');
      if (message) {
        setShowAlert(true);
        setMsg(message);
        setCpf('');
        setName('');
        setPassword('');
        setEmail('');
        startTimer();
      } else {
        setEmail('');
        setCpf('');
        setName('');
        setPassword('');
        navigate('/');
      }
    } else {
      setShowAlert(true);
      setMsg('check it email!');
      setCpf('');
      setName('');
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
    <div>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>User create</h3>
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
                    value={name}
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                  />

                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>
                  <input type="text"
                    style={{ marginBottom: '0.2vw' }}
                    className="form-control"
                    value={cpf}
                    placeholder="cpf"
                    onChange={(e) => setCpf(e.target.value)}
                  />

                </div>
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
                    style={{ marginBottom: '0.2vw' }}
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
                    <AddIcon />
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
              <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                <Typography variant="body1">
                  Login
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
