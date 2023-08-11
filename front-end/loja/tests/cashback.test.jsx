import '@testing-library/jest-dom';
import 'vitest-localstorage-mock'
import { render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import CreateCashback from '../src/page/CreateCashback';
import { afterEach, describe, expect, test } from 'vitest'
import { serverGetCashback } from './mocks/getCashback';
import { serverNavbar } from './mocks/navbar.mock';


beforeAll(() => serverNavbar.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => serverNavbar.close());
afterEach(() => serverNavbar.resetHandlers());


beforeAll(() => serverGetCashback.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => serverGetCashback.close());
afterEach(() => serverGetCashback.resetHandlers());

describe('Transactions create cashback', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test('should return one message "This is an error alert" ', async () => {
    const token = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwZWRyb0BlbWFpbC5jb20iLCJpYXQiOjE2OTE3NzI0MTMsImV4cCI6MTY5MjIwNDQxM30.EPfEghH0PXD7z_74T0fOoP0nqOS-iUhIOdfP2AYN39w'
    };
    const emails = {
      email: 'pedro@email.com',
    }
  
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage('token', token);
    setLocalStorage('email', emails);
  
    
    const { getByRole, getByTestId, queryByText } = render(
      <BrowserRouter>
        <CreateCashback />
      </BrowserRouter>
    )
    
    const title = getByRole('heading', {
      name: /cashback create/i
    });
    expect(title).toBeInTheDocument();
    const button = getByTestId('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(() => {
      const msg = queryByText(/This is an error alert —/i);
      expect(msg).toBeInTheDocument()
    });


    await waitFor(() => {
      const msg = queryByText(/This is an error alert —/i);
      expect(msg).not.toBeInTheDocument();
    }, { timeout: 4000 });
  })
  test('should return one message "Transaction is not exist." ', async () => {
    const token = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwZWRyb0BlbWFpbC5jb20iLCJpYXQiOjE2OTE3NzI0MTMsImV4cCI6MTY5MjIwNDQxM30.EPfEghH0PXD7z_74T0fOoP0nqOS-iUhIOdfP2AYN39w'
    };
    const emails = {
      email: 'pedro@email.com',
    }
  
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage('token', token);
    setLocalStorage('email', emails);
  
    
    const { getByRole, getByTestId, queryByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <CreateCashback />
      </BrowserRouter>
    )
    
    const title = getByRole('heading', {
      name: /cashback create/i
    });
    expect(title).toBeInTheDocument();

    const id = getByPlaceholderText(/transactionId/i);
    expect(id).toBeInTheDocument();
    const cashback = getByPlaceholderText(/cashback/i);
    expect(cashback).toBeInTheDocument();
    fireEvent.change(id, { target: { value: '11222' } });
    fireEvent.change(cashback, { target: { value: '123456' } });
    const button = getByTestId('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(() => {
      const msg = queryByText(/This is an error alert —/i);
      expect(msg).toBeInTheDocument()
    });


    await waitFor(() => {
      const msg = queryByText(/This is an error alert —/i);
      expect(msg).not.toBeInTheDocument();
    }, { timeout: 4000 });
  })
  test('should return all transactions ', async () => {
    const token = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwZWRyb0BlbWFpbC5jb20iLCJpYXQiOjE2OTE3NzI0MTMsImV4cCI6MTY5MjIwNDQxM30.EPfEghH0PXD7z_74T0fOoP0nqOS-iUhIOdfP2AYN39w'
    };
    const emails = {
      email: 'pedro@email.com',
    }
  
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage('token', token);
    setLocalStorage('email', emails);
  
    
    const { getByRole, getByTestId, queryByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <CreateCashback />
      </BrowserRouter>
    )
    const title = getByRole('heading', {
      name: /cashback create/i
    });
    expect(title).toBeInTheDocument();

    const id = getByPlaceholderText(/transactionId/i);
    expect(id).toBeInTheDocument();
    const cashback = getByPlaceholderText(/cashback/i);
    expect(cashback).toBeInTheDocument();
    fireEvent.change(id, { target: { value: 'eedc46b1-7ef7-4552-a4de-a6f56ec8d2a0' } });
    fireEvent.change(cashback, { target: { value: '1232.5' } });
    const button = getByTestId('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(() => {
      const msg = queryByText(/Success/i);
      expect(msg).toBeInTheDocument()
    });


    await waitFor(() => {
      const msg = queryByText(/Success/i);
      expect(msg).not.toBeInTheDocument();
    }, { timeout: 4000 });
  })
});