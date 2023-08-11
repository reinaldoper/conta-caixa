import '@testing-library/jest-dom'
import 'vitest-localstorage-mock'
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Transactions from '../src/page/Transactions';
import { afterEach, describe, expect, test } from 'vitest'
import { serverNavbar } from './mocks/navbar.mock';
import { getLocal } from './mocks/getLocal';
import { getLocalEmail } from './mocks/getLocalEmail';
import Navbar from '../src/components/NavbarUser';

beforeAll(() => serverNavbar.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => serverNavbar.close());
afterEach(() => serverNavbar.resetHandlers());

describe('Transactions', () => {
  afterEach(() => {
    window.localStorage.clear();
  });
  const data = {
    data: { name: 'Reinaldo P. Santos', status: true, email: 'reinaldo@gmail.com', cpf: '005.953.149-13' }

  }
  test('should return a transaction', async () => {
    const token = {
      token: 'wjhjghkjas.kjsgadkja.uuhakasfkahsfb.uuhakasfkahsfb.uuhakames'
    }
    const emails = {
      email: 'pedro@email.com',
    }

    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage('token', token);
    setLocalStorage('email', emails);
    
    const { getByText } = render(
      <BrowserRouter>
        <Transactions />
      </BrowserRouter>
    )
   
    const nameTitle = getByText('Login - Page');
    const not = getByText(/Not one/i);
    expect(not).toBeInTheDocument();
    expect(nameTitle).toBeInTheDocument();
    await waitFor(() => {
      expect(getLocal()).toStrictEqual(token)
      expect(getLocalEmail()).toStrictEqual(emails);
    });
  })
  test('should return a Navbar', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Navbar data={data.data} />
      </BrowserRouter>
    )
    const nameTitle = getByText('Login - Page');
    expect(nameTitle).toBeInTheDocument();
    await waitFor(() => {
      const name = getByText(/name/i);
      expect(name).toBeInTheDocument();
      const name1 = getByText(/Reinaldo P. Santos/i);
      expect(name1).toBeInTheDocument();
    });
  })
});