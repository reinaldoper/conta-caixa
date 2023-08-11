import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { credentials } from './mocks/register.mock';
import { describe } from 'vitest';
import CreaterUser from '../src/page/CreateUser';
import { serverPassword } from './mocks/password.mock';

beforeAll(() => serverPassword.listen({ onUnhandledRequest: 'bypass'}));
afterAll(() => serverPassword.close());
afterEach(() => serverPassword.resetHandlers());


describe('Register User', async () => {
  it('should witch in the message alert', async () => {
    render(
      <BrowserRouter>
        <CreaterUser />
      </BrowserRouter>
    )
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const msg = screen.getByText(/This is an error alert/i);
    expect(msg).toBeInTheDocument();
    await waitFor(() => {
      expect(msg).not.toBeInTheDocument();
    }, { timeout: 4000 });
  });

  it('should have register new user witch error email', async () => {
    render(
      <BrowserRouter>
        <CreaterUser />
      </BrowserRouter>
    );
    const texto = screen.getByText(/User create/i);

    expect(texto).toBeInTheDocument();
    const email = screen.getByPlaceholderText(/email/i);
    expect(email).toBeInTheDocument();
    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();
    const cpf = screen.getByPlaceholderText(/cpf/i);
    expect(cpf).toBeInTheDocument();
    const name = screen.getByPlaceholderText(/name/i);
    expect(name).toBeInTheDocument();
    fireEvent.change(email, { target: { value: 'reinaldoper' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.change(cpf, { target: { value: '123456' } });
    fireEvent.change(name, { target: { value: 'João Pedro' } });
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const msg = screen.getByText(/This is an error alert/i);
    expect(msg).toBeInTheDocument();
    await waitFor(() => {
      expect(msg).not.toBeInTheDocument();
    }, { timeout: 4000 });
  });

  it('should have register new user', async () => {
    render(
      <BrowserRouter>
        <CreaterUser />
      </BrowserRouter>
    );
    const texto = screen.getByText(/User create/i);

    expect(texto).toBeInTheDocument();
    const email = screen.getByPlaceholderText(/email/i);
    expect(email).toBeInTheDocument();
    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();
    const cpf = screen.getByPlaceholderText(/cpf/i);
    expect(cpf).toBeInTheDocument();
    const name = screen.getByPlaceholderText(/name/i);
    expect(name).toBeInTheDocument();
    fireEvent.change(email, { target: { value: credentials.validEmail } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.change(cpf, { target: { value: '123456' } });
    fireEvent.change(name, { target: { value: 'João Pedro' } });
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });

  it('should return message "Invalid cpf" in the document body', async () => {
    render(
      <BrowserRouter>
        <CreaterUser />
      </BrowserRouter>
    );
    const texto = screen.getByText(/User create/i);

    expect(texto).toBeInTheDocument();
    const email = screen.getByPlaceholderText(/email/i);
    expect(email).toBeInTheDocument();
    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();
    const cpf = screen.getByPlaceholderText(/cpf/i);
    expect(cpf).toBeInTheDocument();
    const name = screen.getByPlaceholderText(/name/i);
    expect(name).toBeInTheDocument();
    fireEvent.change(email, { target: { value: credentials.validEmail } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.change(cpf, { target: { value: '123456' } });
    fireEvent.change(name, { target: { value: 'João Pedro' } });
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(() => {
      const msg = screen.queryByText(/This is an error alert —/i);
      expect(msg).toBeInTheDocument()
    });


    await waitFor(() => {
      const msg = screen.queryByText(/This is an error alert —/i);
      expect(msg).not.toBeInTheDocument();
    }, { timeout: 4000 });
  });
});