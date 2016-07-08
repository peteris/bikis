/*
 * HomePage
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import VennDiagram from '../VennDiagram/'
import PhotosContainer from '../../containers/PhotosContainer/'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { asyncFetchInstagramPhotos } from '../../actions'

class HomePage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      venn: false,
      photos: false
    }
  }

  componentWillMount () {
    const { asyncFetchInstagramPhotos } = this.props
    asyncFetchInstagramPhotos()
  }

  toggleVenn () {
    this.setState({
      venn: !this.state.venn
    })
  }

  togglePhotos () {
    this.setState({
      photos: !this.state.photos
    })
  }

  renderToggle (label, prop) {
    const self = this
    const toggle = () => {
      self.setState({
        [prop]: !this.state[prop]
      })
    }

    return <a href='#' onMouseOver={toggle} onMouseOut={toggle}>{label}</a>
  }

  render () {
    const { disciplines } = this.props.data

    const sizeLarge = 9
    const sizeSmall = 3
    const { clientWidth, clientHeight } = window.document.documentElement
    const w = clientWidth * 0.8
    const h = clientHeight * 0.7

    const { venn, photos } = this.state

    return (
      <div className='home height-100'>
        <div className='max-width-1 bio relative z2 height-100 px2 py3'>
          <h1 className='h3'>Peteris Bikis</h1>
          <p>
            Creative Technologist, Designer and Engineer. <a href='//asketicsf.com' target='_blank'>Asketic</a> Co-founder.
            I'm a {this.renderToggle('venn diagram', 'venn')} of design, technology, the Internet,
            cycling, travel, and {this.renderToggle('photography', 'photos')}.
            Currently obsessed with React and functional
            programming. Interested in AI, neural networks
            and a weirder future <span dangerouslySetInnerHTML={{ __html: '&#128126' }} />
          </p>
          <p>
            <a href='//twitter.com/peteris'>@peteris</a>
          </p>
          <p>
            <a href='mailto:hi@peter.is'>hi@peter.is</a>
          </p>
        </div>
        <ReactCSSTransitionGroup
          transitionName='visualisation'
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}>
        {venn && (
          <VennDiagram
            key='venn'
            intersectLabel={['👋', '👌']}
            items={disciplines}
            large={sizeLarge}
            small={sizeSmall}
            duration={1000}
            width={w}
            height={h}
            animate
            className='component venn absolute absolute-center z1' />
        )}
        {photos && (
          <PhotosContainer
            className='component photos absolute bottom-0 right-0 m2 z1'
            style={{width: '50%'}}
          />
        )}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    data: state.home
  }
}

export default connect(
  mapStateToProps,
  { asyncFetchInstagramPhotos }
)(HomePage)
