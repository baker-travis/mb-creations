import React, { Component } from 'react';
import logo from '../resources/logo.svg';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFixed: false
    };

    this.calculateLogoTween = this.calculateLogoTween.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateLogoPosition = this.updateLogoPosition.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
    this.calculateLogoTween();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  calculateLogoTween() {
    const {top, left} = this._logoImg.getBoundingClientRect();
    this._originalLogoRight = left;
    this._originalLogoTop = top;
    this._scalePerPixel = left / top;

    this._logoImg.style.marginLeft = 'initial';
    this._logoImg.style.marginRight = 'initial';
    this._logoImg.style.left = 'initial';
    this._logoImg.style.right = left + 'px';
  }

  updateLogoPosition(scrollPos) {
    let newX = this._originalLogoRight - (this._scalePerPixel * scrollPos);

    this._logoImg.style.right = newX + 'px';
  }

  handleScroll(e) {
    let top = window.pageYOffset || document.scrollTop || 0;
    if (top <= this._originalLogoTop) {
      if (this.state.isFixed) {
        this.setState({isFixed: false});
      }
      this.updateLogoPosition(top);
    } else if (!this.state.isFixed) {
      this.setState({isFixed: true});
      console.log(top);
    }
  }

  render() {
    let imgClassName = this.state.isFixed ? 'logo-fixed' : 'logo';

    return (
      <div className="header">
        <nav>
            
        </nav>
        <img 
            className={imgClassName}
            src={logo}
            ref={(c) => this._logoImg = c}
            alt="Megan Baker Creations"
        />
      </div>
    );
  }
}

export default App;
