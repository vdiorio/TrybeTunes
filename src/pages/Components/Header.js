import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      userName: '',
    };

    this.loadUserName = this.loadUserName.bind(this);
  }

  componentDidMount() {
    this.loadUserName();
  }

  async loadUserName() {
    this.setState({
      loading: true,
    });
    getUser()
      .then((obj) => this.setState({
        loading: false,
        userName: obj.name,
      }));
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <div data-testid="header-component">
        {
          loading ? (
            <Loading />
          ) : (
            <div>
              <span data-testid="header-user-name">
                {userName}
              </span>
              <nav>
                <ul>
                  <li>
                    <Link
                      to="/search"
                      data-testid="link-to-search"
                    >
                      Procurar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/favorites"
                      data-testid="link-to-favorites"
                    >
                      Perfil
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )
        }
      </div>
    );
  }
}

export default Header;
