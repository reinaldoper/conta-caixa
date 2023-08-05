import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
/* import './index.css' */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import CreateUser from './page/CreateUser.jsx';
import Transaction from './page/Transactions.jsx';
import CreateTransaction from './page/CreateTransaction.jsx';
import ClearAccount from './page/CleanAccount.jsx';
import RecoverAccount from './page/RecoverAccount.jsx';
import CreateCashback from './page/CreateCashback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="user" element={<CreateUser />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="create" element={<CreateTransaction />} />
        <Route path="clean" element={<ClearAccount />} />
        <Route path="recover" element={<RecoverAccount />} />
        <Route path="cashback" element={<CreateCashback />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
