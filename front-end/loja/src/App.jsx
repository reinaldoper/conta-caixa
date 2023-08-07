import {  Routes, Route } from "react-router-dom";
import CreateUser from './page/CreateUser.jsx';
import Transaction from './page/Transactions.jsx';
import CreateTransaction from './page/CreateTransaction.jsx';
import ClearAccount from './page/CleanAccount.jsx';
import RecoverAccount from './page/RecoverAccount.jsx';
import CreateCashback from './page/CreateCashback.jsx';
import Login from "./page/Login.jsx";



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="user" element={<CreateUser />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="create" element={<CreateTransaction />} />
        <Route path="clean" element={<ClearAccount />} />
        <Route path="recover" element={<RecoverAccount />} />
        <Route path="cashback" element={<CreateCashback />} />
      </Routes>
    </>
  )
}

export default App
