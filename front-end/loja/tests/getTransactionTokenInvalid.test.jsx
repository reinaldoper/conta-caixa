import '@testing-library/jest-dom';
import 'vitest-localstorage-mock'
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Transactions from '../src/page/Transactions';
import { afterEach, describe, test } from 'vitest'
import { serverGetTransaction } from './mocks/getTransaction';
import { getLocal } from './mocks/getLocal';
import { getLocalEmail } from './mocks/getLocalEmail';
import { serverNavbar } from './mocks/navbar.mock';
import { tokenUsed } from './mocks/token';


beforeAll(() => serverNavbar.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => serverNavbar.close());
afterEach(() => serverNavbar.resetHandlers());


beforeAll(() => serverGetTransaction.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => serverGetTransaction.close());
afterEach(() => serverGetTransaction.resetHandlers());

describe('Transactions by cpf', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test('should return a message invalid token', async () => {
    const token = {
      token: 'wjhjghkjas.kjsgadkja.uuhakasfkahsfb.uuhakasfkahsfb.uuhakames'
    };
    const emails = {
      email: 'pedro@email.com',
    }
  
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage('token', token);
    setLocalStorage('email', emails);
  
    
    const { queryAllByText, getByText } = render(
      <BrowserRouter>
        <Transactions />
      </BrowserRouter>
    )

    const not = getByText(/cashback/i);
    expect(not).toBeInTheDocument();
    expect(getLocal()).toStrictEqual(token)
    expect(getLocalEmail()).toStrictEqual(emails);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toEqual(JSON.stringify(token));
      expect(localStorage.getItem('email')).toEqual(JSON.stringify(emails));
      const nameTitle = queryAllByText(/Expired or invalid token/i);
      expect(nameTitle[0]).toBeInTheDocument();
    });
  })
  test('should return all Transaction witch cpf valid', async () => {
    const token = {
      token: tokenUsed
    };
    const emails = {
      email: 'pedro@email.com',
    }
  
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage('token', token);
    setLocalStorage('email', emails);
  
    
    const { debug, getByText, queryAllByText } = render(
      <BrowserRouter>
        <Transactions />
      </BrowserRouter>
    )
    debug();

    const not = getByText(/cashback/i);
    expect(not).toBeInTheDocument();
    expect(getLocal()).toStrictEqual(token)
    expect(getLocalEmail()).toStrictEqual(emails);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toEqual(JSON.stringify(token));
      expect(localStorage.getItem('email')).toEqual(JSON.stringify(emails));
      const nameTitle = queryAllByText(/Date/i);
      expect(nameTitle[0]).toBeInTheDocument();
    });
  })
});