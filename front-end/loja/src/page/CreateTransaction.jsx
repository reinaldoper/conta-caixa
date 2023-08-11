/* import './App.css' */
import { useState, useEffect } from 'react'
import { fetchTransaction, fetchUser } from '../service/fetch';
import { Alert } from '@mui/material';
import AddIcon from "@mui/icons-material/Add"
import NavbarUser from '../components/NavbarUser';
import formateCPF from '../utils/FormataCpf';

export default function CreateTransaction() {
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [value, setValue] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const getData = async () => {
      const resul = localStorage.getItem('token');
      const { token } = JSON.parse(resul);
      console.log(token);
      const emails = localStorage.getItem('email');
      const update = {
        email: JSON.parse(emails),
      };
      const options = {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      };
      const result = await fetchUser(options, '/get');
      setUser(result);

    }
    getData();
  }, []);

  const handleClick = async () => {
    const resul = localStorage.getItem('token');
    const { token } = JSON.parse(resul);
    const update = {
      accountId: formateCPF(accountId),
      value: Number(value),
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    };
    const { message, data } = await fetchTransaction(options, '/');
    if (message) {
      setShowAlert(true);
      setMsg(message);
      setAccountId('');
      setValue('');
      startTimer();
    } else {
      console.log(data);
      setAlert(true);
      setMsg(data.transactionId);
      setAccountId('');
      setValue('');
      startTimerTrue();
    }
  };

  const startTimer = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const startTimerTrue = () => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <>
      <NavbarUser data={user.data} />
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Transaction create</h3>
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
                    value={accountId}
                    placeholder="accountId"
                    onChange={(e) => setAccountId(e.target.value)}
                  />

                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input type="text"
                    style={{ marginBottom: '0.2vw' }}
                    className="form-control"
                    value={value}
                    placeholder="value"
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <button type="button"
                    data-testId='button'
                    style={{ marginLeft: '15vh', width: '10vh', height: '5vh', marginTop: '0.5vw', textAlign: 'center' }}
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
            {alert && (
              <Alert severity="success">
                TransactionId — <strong>{msg}</strong>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
