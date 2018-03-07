import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC5ENaSnJOtYQnd2utAH0KhS1tdnt_HlmU",
  authDomain: "kevchat-957cc.firebaseapp.com",
  databaseURL: "https://kevchat-957cc.firebaseio.com",
  projectId: "kevchat-957cc",
  storageBucket: "kevchat-957cc.appspot.com",
  messagingSenderId: "1011246572423"
}

const rrfConfig = {
  userProfile: 'users',
}

// initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig)
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
})

const initialState = {

}

// Create store with reducers and initial state
export const store = createStoreWithFirebase(rootReducer, initialState)
