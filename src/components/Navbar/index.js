import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMobileNavMenu: false,
    };

    this.toggleMobileNavMenu = this.toggleMobileNavMenu.bind(this);
    this.removeNavMargin = this.removeNavMargin.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.removeNavMargin);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.removeNavMargin);
  }

  removeNavMargin() {
    if (window.innerWidth > 768) {
      this.setState({
        showMobileNavMenu: false,
      });
    }
  }

  toggleMobileNavMenu() {
    this.setState({
      showMobileNavMenu: !this.state.showMobileNavMenu,
    });
  }

  render() {
    const isActive = classNames({
      'is-active': this.state.showMobileNavMenu,
    });

    const addMargin = classNames({
      'm-b-45': this.state.showMobileNavMenu,
    });

    return (
      <div className={`hero-header ${addMargin} slide`}>
        <header className="header">
          <div className="container">
            <div className="header-left">
              <Link className="header-item title" to="/">
                Bryan Lackey
              </Link>
            </div>

            <span
              className={`header-toggle ${isActive}`}
              onClick={this.toggleMobileNavMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>

            <div className={`header-right header-menu ${isActive}`}>
              {/* <span className="header-item">
                <a href="#">Portfolio</a>
              </span>*/}
              <span className="header-item">
                <Link
                  to="blog"
                  activeClassName="is-active"
                >
                  Blog
                </Link>
              </span>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;
