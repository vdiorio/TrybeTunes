import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      disableButton: true,
      loading: false,
      redirect: false,

    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  async handleBtnClick() {
    this.setState({
      loading: true,
    });
    const { name } = this.state;
    createUser({ name })
      .then(() => this.setState({
        loading: false,
        redirect: true,
      }));
  }

  onInputChange({ target }) {
    const { value } = target;
    const minCharacters = 3;

    if (value.length >= minCharacters) {
      this.setState({
        name: value,
        disableButton: false,
      });
    }
  }

  render() {
    const { loading, disableButton, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        {loading ? (
          <Loading />
        ) : (

          <form>
            <input
              data-testid="login-name-input"
              type="text"
              placeholder="Nome"
              onChange={ this.onInputChange }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ disableButton }
              onClick={ this.handleBtnClick }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
