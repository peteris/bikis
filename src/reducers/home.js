import assignToEmpty from '../utils/assign';
import { FETCH_SITE_CONTENT } from '../constants/AppConstants';
import contentData from '../../data/content.json';

export const initialState = {
  bio: contentData.bio,
  footer: contentData.footer,
  contact: contentData.contact,
  color: 'rgb(106, 0, 199)',
  disciplines: contentData.disciplines,
  vennIntersectLabel: '◕‿◕',
  work: contentData.work,
  awards: contentData.awards,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SITE_CONTENT:
      return assignToEmpty(state, action.data);

    default:
      return state;
  }
}

export default homeReducer;
