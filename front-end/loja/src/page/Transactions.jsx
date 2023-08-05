import NavbarUser from "../components/NavbarUser";
import { useEffect, useState } from "react";
import { fetchUser } from "../service/fetch";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import formatDate from "../utils/formateData";
import formatCpf from "../utils/RetornCpf";
import { CunstomList, StyledPagination } from "../styles/loginForm";



export default function Transaction() {
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState('');
  const [transaction, setTransaction] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6;
  const totalItemsCount = transaction.length;

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
      const response = {
        method: 'PATCH',
        body: JSON.stringify({ cpf: result.data.cpf }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      }
      const { message, data } = await fetchUser(response, '/transaction');
      if (message) {
        setMsg(message);
      } else {
        setTransaction(data.sort((a, b) => extractDate(b.date) - extractDate(a.date)));
      }

    }
    getData();
  }, []);

  const extractDate = (timestamp) => {
    const [datePart] = timestamp.split(' ');
    return new Date(datePart);
  }
  
  let totalCashbackEmReais = 0;
  if(transaction.length > 0) {
    totalCashbackEmReais += transaction.reduce((total, item) => {
      const cashbackValor = Number(item.value) * Number(item.cashback);
      console.log(cashbackValor);
      return total + cashbackValor;
    }, 0);
  }

  const result = (transaction.length > 0 ? transaction.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((transacao) => (
    <ListItem
      key={transacao.id}
      style={{
        display: 'flex',
        marginLeft: '1rem',
        marginBottom: '1rem',
        height: '10rem',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '40%',
      }}
    >
      <ListItemText
        primary={
          <>
            <Typography variant="h6" color="success">
              Date: {formatDate(transacao.date)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Cashback: {transacao.cashback}
            </Typography>
            <Typography variant="h6" color="success">
              Value: {transacao.value}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              TransactionId: {transacao.transactionId}
            </Typography>
          </>
        }
        secondary={
          <Typography variant="body1" color="textSecondary">
            accountId: {formatCpf(transacao.accountId)}
          </Typography>
        }
        inset={true}
      />
    </ListItem>
  )) : <h1 style={{ color: '#0f7d7e', margin: 'auto'}}>Not one<br></br> transactions!</h1>);

  const handlePageChange = (page) => {
    setActivePage(Number(page));
  };

  return (
    <>
      <NavbarUser data={user.data} />
      {msg.length > 0 ? <h1 style={{ textAlign: 'center', color: '#0f7d7e', marginTop: '20vh'}}>{msg}</h1> :
        <CunstomList>
          <h3 style={{color: '#232226', backgroundColor: '#acce91'}}>cashback: {totalCashbackEmReais.toFixed(2)}R$</h3>
          <List style={{
            display: 'flex',
            flexWrap: 'wrap',
            paddingTop: '0.1vw',
            marginTop: '7.5%',
            marginLeft: '13rem',
            width: '80rem'
          }}>
            {result}
          </List>
          {result.length > 0 ?
            <StyledPagination
              count={Math.ceil(totalItemsCount / itemsPerPage)}
              page={activePage}
              onChange={(event, page) => handlePageChange(page)}
            /> : null}
        </CunstomList>
      }
    </>
  )
}
