/*
 * CyclingNotesContainer
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncFetchCyclingData } from '../../actions';
import Notes from '../../components/Notes';
import { ago } from 'time-ago';

const template = (distance, when) =>
  [
    'Rode 2700 miles from Stockholm to Barcelona a few years ago, fixed gear. Still living in past glories.',
    '',
    '   __o  '.replace(/ /gi, '&nbsp;'),
    ' _`\\<,_ '.replace(/ /gi, '&nbsp;'),
    '(_)/ (_)',
    '',
    `Other than that, looks like I last went on a ${distance}km ride ${when}.`,
    '',
  ].join('<br />');

class CyclingNotesContainer extends Component {
  componentDidMount() {
    const { asyncFetchCyclingData } = this.props;
    asyncFetchCyclingData();
  }

  render() {
    const { cycling } = this.props;

    const when = ago(new Date(cycling.date));
    const text = template(cycling.distance, when);

    return <Notes text={text} />;
  }
}

function mapStateToProps({ cycling }) {
  return {
    cycling,
  };
}

export default connect(mapStateToProps, { asyncFetchCyclingData })(
  CyclingNotesContainer
);
