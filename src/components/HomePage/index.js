/*
 * HomePage
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import VennDiagram from './../VennDiagram'
import WorldMap from './../WorldMap'
import CyclingNotes from './../../containers/CyclingNotes/'
import WindowWithCursor from './../WindowWithCursor'
import PhotosContainer from './../../containers/PhotosContainer/'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTransitionGroup from 'react-addons-transition-group'
import classNames from 'classnames'
import Draggable from 'react-draggable'

const Bio = ({renderToggle, className = ''}) => (
  <div className={className} style={{lineHeight: '1.5em', fontSize: '2em', marginTop: 0, textAlign: 'left'}}>
    <p className='mt0'>
      <span>Creative Technologist, Designer and Engineer.</span> <a href='//asketicsf.com' target='_blank'>Asketic</a> <span>Co-founder.</span>
      <span>I am a</span> {renderToggle('venn diagram', 'venn')} <span>of design,</span> {renderToggle('technology', 'technology')}<span>, </span>{renderToggle('the Internet', 'cloud')}<span>,</span>
      &nbsp;{renderToggle('travel', 'travelMap')}<span>, </span>{renderToggle('cycling', 'routeMap')}<span>, and</span> {renderToggle('photography', 'photos')}<span>.</span>
      <span> Currently obsessed with React and functional
      programming. Interested in</span> {renderToggle('AI', 'ai')}<span>, neural networks
      and a</span> {renderToggle('weirder', 'weird')} <span>future</span> <span dangerouslySetInnerHTML={{ __html: '&#128126' }} />
    </p>
    <p>
      <a href='//twitter.com/peteris'>@peteris</a> —&nbsp;
      <a href='mailto:hi@peter.is'>hi@peter.is</a>
    </p>
    <p>
      &mdash;
    </p>
  </div>
)

const Gif = ({src, name}) => (
  <span className={`component ${name} ai fixed top-0 right-0`}><img src={src} /><span className='bg absolute top-0 left-0 right-0 bottom-0' /></span>
)

class HomePage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      venn: false,
      photos: false,
      travelMap: false,
      routeMap: false,
      ai: false,
      weird: false,
      cloud: false,
      offset: 0
    }
  }

  renderToggle (label, prop) {
    const toggle = (hover) => {
      if (this.state.dragging) { return }

      this.setState({
        hover: hover ? prop : false,
        [prop]: hover
      })
    }

    const setOffset = (e, ui) => {
      this.setState({
        dragging: prop,
        offset: this.state.offset + (ui.x - ui.lastX)
      })
    }

    const resetState = (e, ui) => {
      this.setState({
        dragging: false,
        hover: false,
        offset: 0,
        [prop]: false
      })
    }

    const position = this.state.offset ? null : {x: 0, y: 0}
    const className = classNames('toggle inline-block', {'toggle-hover': this.state.hover === prop})

    let scale = 1
    if (this.state.dragging === prop) {
      scale = Math.max(1, Math.abs(this.state.offset / 100))
    }

    return (
      <Draggable onDrag={setOffset.bind(this)} onStop={resetState.bind(this)} position={position}>
        <span className='inline-block toggle-container'>
          <span className='inline-block' style={{transform: `scale(${scale})`}}>
            <span className={className}
              onMouseOver={toggle.bind(this, true)}
              onMouseOut={toggle.bind(this, false)}>{label}</span>
          </span>
        </span>
      </Draggable>
    )
  }

  render () {
    const { data: { disciplines, color } } = this.props

    const sizeLarge = 9
    const sizeSmall = 3
    const { clientWidth, clientHeight } = window.document.documentElement
    const w = clientWidth * 0.8 * 0.8
    const h = clientHeight * 0.7 * 0.8

    const { venn, photos, travelMap, routeMap, ai, weird, cloud, technology, hover, dragging } = this.state
    const mapType = routeMap ? 'route' : 'cities'
    const mapVisible = Boolean(travelMap || routeMap)

    const bioClassName = classNames('max-width-2 mb4 pb4', {'faded': hover || dragging}, {'disabled': dragging})
    const offset = this.state.offset * 0.2

    return (
      <div className='home height-100'>
        <div className='bg-gradient fixed z2 top-0 left-0 right-0 bottom-0 z2' style={{opacity: 0.8}} />
        <div className='bio relative z2 height-100 px2'>
          <Bio renderToggle={this.renderToggle.bind(this)} className={bioClassName} />
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
            className='component venn fixed absolute-center z1' />
        )}
        {photos && (
          <PhotosContainer
            className='component photos fixed top-0 left-0 m2 z1'
            style={{width: '50%'}}
          />
        )}
          <WorldMap
            visible={mapVisible}
            color={color}
            type={mapType}
            offset={offset}
            className='component fixed top-0 right-0 z1 mt2' />
          {technology && <Gif name='technology' src='https://media.giphy.com/media/jy7Ipmx7Zeb0k/giphy.gif' />}
          {cloud && <Gif name='cloud' src='https://media.giphy.com/media/OT2lwSsUgpsT6/giphy.gif' />}
          {ai && (<Gif name='ai' src='https://media.giphy.com/media/IWoZqzqk7LZn2/giphy.gif' />)}
          {weird && (<Gif name='weird' src='https://media.giphy.com/media/13Gponwdr1r7MI/giphy.gif' />)}
        </ReactCSSTransitionGroup>
        <ReactTransitionGroup>
          {routeMap && <WindowWithCursor key={1}><CyclingNotes /></WindowWithCursor>}
        </ReactTransitionGroup>
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
  mapStateToProps
)(HomePage)
