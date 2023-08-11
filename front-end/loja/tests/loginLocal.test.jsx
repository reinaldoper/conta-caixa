import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { credentials } from './mocks/register.mock';
import { getLocal } from './mocks/getLocal';

import Login from '../src/page/Login';
import { describe } from 'vitest'
import { serverLocal } from './mocks/serverLocal.mock';

beforeAll(() => serverLocal.listen({ onUnhandledRequest: 'bypass'}));
afterAll(() => serverLocal.close());
afterEach(() => serverLocal.resetHandlers());


describe("Login should return token valid", () => {
  it("should return token", async () => {
    const { debug} = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    debug();
    const email = screen.getByRole('textbox');
    expect(email).toBeInTheDocument();
    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();
    fireEvent.change(email, { target: { value: credentials.validEmail } });
    fireEvent.change(password, { target: { value: credentials.validPassword } });
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(() => {
      const token = 'wjhjghkjas.kjsgadkja.uuhakasfkahsfb.uuhakasfkahsfb.uuhakames'
      const email = {
        email: credentials.validEmail,
        name: credentials.validName,
        cpf: '02020202020'
      }
      localStorage.setItem('token', JSON.stringify(token))
      expect(getLocal()).toStrictEqual(token)
      localStorage.setItem('email', JSON.stringify([email]))
    });

  });
});