import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './index'; 


describe('Componente de Autenticação: LoginForm', () => {
  
  it('Deve renderizar os campos de e-mail, senha e o botão de entrar', () => {
    render(<LoginForm />);

    // Verifica se os inputs estão na tela procurando pelo placeholder ou rótulo
    const emailInput = screen.getByPlaceholderText(/Entre com seu email/i);
    const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Deve permitir que o usuário digite suas credenciais', () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/Entre com seu email/i);
    const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);

    // Simula o usuário digitando no teclado
    fireEvent.change(emailInput, { target: { value: 'admin@hospital.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // Verifica se o estado interno do componente atualizou os valores dos inputs
    expect(emailInput).toHaveValue('admin@hospital.com');
    expect(passwordInput).toHaveValue('123456');
  });

  it('Deve exibir uma mensagem de erro se o formulário for enviado vazio', () => {
    // Nota: Este teste pressupõe que você exibe uma div/span com a mensagem "Preencha todos os campos" no seu componente
    render(<LoginForm />);

    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    
    // Clica no botão sem preencher nada
    fireEvent.click(loginButton);

    // Espera que a mensagem de validação apareça na tela
    const errorMessage = screen.getByText(/preencha todos os campos/i);
    expect(errorMessage).toBeInTheDocument();
  });

});
