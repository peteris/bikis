import assignToEmpty from '../utils/assign'
import { FETCH_SITE_CONTENT } from '../constants/AppConstants'

const initialState = {
  bio: '',
  footer: '',
  contact: '',
  color: 'rgb(106, 0, 199)',
  disciplines: [
    'Design', // ✏️
    'Tech', // 💾
    'Internet', // 🌐
    'Cycling', // 🚴
    'Travel', // ️️✈️
    'Photo' // 📷
  ],
  work: [
  ],
  awards: [
  ]
}

function homeReducer (state = initialState, action) {
  Object.freeze(state)
  switch (action.type) {
    case FETCH_SITE_CONTENT:

      return assignToEmpty(state, action.data)

    default:
      return state
  }
}

export default homeReducer
