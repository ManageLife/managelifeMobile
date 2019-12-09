import { createStore, applyMiddleware, compose } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem'
import thunk from 'redux-thunk'
// react-redux-firebase
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { rootReducer } from './reducers'
import { firebase, rrfConfig } from '../config/firebase/firebaseConfig'

const persistConfig = {
   key: 'root',
   storage: ExpoFileSystemStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create & configure store
const store = createStore(
   persistedReducer,
   composeEnhancers(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase),
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
   ),
)
const persistor = persistStore(store)
// React-Redux-Firebase props for Provider in src/App.js
const rrfProps = {
   firebase,
   config: rrfConfig,
   dispatch: store.dispatch,
}

export { store, persistor, rrfProps }
