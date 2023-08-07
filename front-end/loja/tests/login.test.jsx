import { render, screen, fireEvent/* , waitFor  */} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import Login from '../src/page/Login';


describe('Login', () => {
  it('Texting click in the route Create User', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const texto = screen.getByText(/Sign In/i);
    
    expect(texto).toBeInTheDocument();

    const link = screen.getByText(/create user/i);
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
  });
});