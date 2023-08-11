import '@testing-library/jest-dom';
import 'vitest-localstorage-mock'
import { render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import ClearAccount  from '../src/page/CleanAccount'
import { afterEach, describe, expect, test } from 'vitest'
import { serverDelete } from './mocks/deleteAccount';
import { serverNavbar } from './mocks/navbar.mock';


beforeAll(() => serverNavbar.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => serverNavbar.close());
afterEach(() => serverNavbar.resetHandlers());


beforeAll(() => serverDelete.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => serverDelete.close());
afterEach(() => serverDelete.resetHandlers());

describe('Transactions delete', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test('should return one message "This is an error alert" ', async () => {
    const token = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwZWRyb0BlbWFpbC5jb20iLCJpYXQiOjE2OTE3NzI0MTMsImV4cCI6MTY5MjIwNDQxM30.EPfEghH0PXD7z_74T0fOoP0nqOS-iUhIOdfP2AYN39w'
    };
    const emails = {
      email: 'reinaldoper83@gmail.com',
    }
  
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage('token', token);
    setLocalStorage('email', emails);
  
    
    const { debug, getByRole, getByTestId, queryByText } = render(
      <BrowserRouter>
        <ClearAccount />
      </BrowserRouter>
    )
    debug();
    const title = getByRole('heading', {
      name: /Account delete/i
    });
    expect(title).toBeInTheDocument();
    const button = getByTestId('button-delete');
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
  test('should return one message "Email is not exist." ', async () => {
    const token = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwZWRyb0BlbWFpbC5jb20iLCJpYXQiOjE2OTE3NzI0MTMsImV4cCI6MTY5MjIwNDQxM30.EPfEghH0PXD7z_74T0fOoP0nqOS-iUhIOdfP2AYN39w'
    };
    const emails = {
      email: 'reinaldoper83@gmail.com',
    }
  
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage('token', token);
    setLocalStorage('email', emails);
  
    
    const { debug, getByRole, getByTestId, queryByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <ClearAccount />
      </BrowserRouter>
    )
    debug();
    const title = getByRole('heading', {
      name: /Account delete/i
    });
    expect(title).toBeInTheDocument();

    const email = getByPlaceholderText(/email/i);
    expect(email).toBeInTheDocument();
    
    fireEvent.change(email, { target: { value: 'maria@email.com' } });
    const button = getByTestId('button-delete');
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
  test('should return message "Success" ', async () => {
    const token = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwZWRyb0BlbWFpbC5jb20iLCJpYXQiOjE2OTE3NzI0MTMsImV4cCI6MTY5MjIwNDQxM30.EPfEghH0PXD7z_74T0fOoP0nqOS-iUhIOdfP2AYN39w'
    };
    const emails = {
      email: 'reinaldoper83@gmail.com',
    }
  
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    setLocalStorage('token', token);
    setLocalStorage('email', emails);
  
    
    const { debug, getByRole, getByTestId, queryByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <ClearAccount />
      </BrowserRouter>
    )
    debug();
    const title = getByRole('heading', {
      name: /Account delete/i
    });
    expect(title).toBeInTheDocument();

    const id = getByPlaceholderText(/email/i);
    expect(id).toBeInTheDocument();
    
    fireEvent.change(id, { target: { value: 'reinaldoper83@gmail.com' } });
    
    const button = getByTestId('button-delete');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(() => {
      const msg = queryByText(/This is an error alert/i);
      expect(msg).toBeInTheDocument()
    });


    await waitFor(() => {
      const msg = queryByText(/This is an error alert/i);
      expect(msg).not.toBeInTheDocument();
    }, { timeout: 4000 });
  })
});