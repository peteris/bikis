const initialState = {
  projectName: 'peter.is',
  ownerName: 'peteris',
  disciplines: [
    'Design', // ✏️
    'Tech', // 💾
    'Internet', // 🌐
    'Cycling', // 🚴
    'Travel', // ️️✈️
    'Photo' // 📷
  ]
}

function home (state = initialState, action) {
  return state
}

export default home
