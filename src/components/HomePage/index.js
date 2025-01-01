import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import Helmet from 'react-helmet';

import { parseMd } from './../../utils/markdown';

// import './styles.css';

import WorldMap, { TYPE_ROUTE, TYPE_CITIES } from './../WorldMap';
import CyclingNotes from './../../containers/CyclingNotes/';
import WindowWithCursor from './../WindowWithCursor';
import Bio from './../Bio';
import Contact from './../Contact';
import Awards from './../Awards';
import Footer from './../Footer';
import Work from './../Work';
import SvgFilters from './../SvgFilters';

import { isTouchDevice } from './../../utils/env';

class HomePage extends Component {
  state = {
    offset: 0,
    dragging: false,
    currentToggle: '',
  };

  constructor(props) {
    super(props);
  }

  handleToggle = (hover, url) => {
    const { activeComponent, setUrl } = this.props;
    const { currentToggle } = this.state;
    const ignoreEvent =
      !hover && activeComponent && currentToggle !== url && !isTouchDevice();
    if (ignoreEvent) {
      // Ignore late mouse leave update
    } else {
      const replace = true;
      setUrl(hover ? url : '/', replace);
    }

    if (hover) {
      this.setState({ currentToggle: url });
    }
  };

  handleOffset = (offset) =>
    this.setState({
      dragging: true,
      offset,
    });

  resetState = () => {
    const { setUrl } = this.props;
    this.setState({
      dragging: false,
      offset: 0,
    });

    setUrl('/');
  };

  render() {
    const {
      color,
      work,
      awards,
      bio,
      contact,
      footer,
      activeComponent,
      routeMap,
      travelMap,
      children,
    } = this.props;
    const { dragging, offset } = this.state;

    const mapType = routeMap ? TYPE_ROUTE : TYPE_CITIES;
    const mapVisible = Boolean(travelMap || routeMap);

    const bioClassName = classNames('max-width mb3 bio', {
      faded: Boolean(activeComponent) || dragging,
      disabled: dragging,
    });
    const mapClassName = classNames('component map fixed abs-center z1', {
      fuzzy: mapVisible,
    });
    const mapOffset = offset * 0.2;

    return (
      <div>
        <Helmet title="Peteris Bikis – Designer and Engineer" />
        <SvgFilters />
        <div
          className="relative z2 height-100 px2 py1"
          style={{ maxWidth: '1400px' }}
        >
          <Bio
            content={bio}
            activeToggle={`/${activeComponent}`}
            dragging={dragging}
            handleOffset={this.handleOffset}
            handleToggle={this.handleToggle}
            handleRelease={this.resetState}
            className={bioClassName}
          >
            <WorldMap
              visible={mapVisible}
              color={color}
              type={mapType}
              offset={mapOffset}
              className={mapClassName}
            />
            <TransitionGroup>
              <CSSTransition
                timeout={600}
                classNames="visualisation"
              >
                {children}
              </CSSTransition>
            </TransitionGroup>
            <TransitionGroup>
              {routeMap && (
                <WindowWithCursor>
                  <CyclingNotes />
                </WindowWithCursor>
              )}
            </TransitionGroup>
          </Bio>
          <div className="clearfix mx-auto relative flex flex-wrap mb3 mt3">
            <Work
              className="mx-auto sm-mx0 sm-pl3 mt2 mb3 min-width-half"
              projects={work}
            />
            <Awards className="mx-auto sm-ml-auto mb3" awards={awards} />
          </div>
          <Contact className="clerfix center">{parseMd(contact)}</Contact>
          <Footer content={footer} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  color: PropTypes.string.isRequired,
  work: PropTypes.arrayOf(PropTypes.string).isRequired,
  awards: PropTypes.arrayOf(PropTypes.string).isRequired,
  bio: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  footer: PropTypes.string.isRequired,
  activeComponent: PropTypes.string,
  routeMap: PropTypes.bool,
  travelMap: PropTypes.bool,
  setUrl: PropTypes.func.isRequired,
};

export default HomePage;
