import { Store, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { routerMiddleware } from 'connected-react-router';

import history from '../services/history';

import createRootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const encrypted = encryptTransform({
  secretKey: 'PARTOGRAMA',
});

const persistName = '@PARTOGRAMA';

const persistConfig = {
  key: persistName,
  storage,
  whitelist: ['header'],
  transforms: [encrypted],
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history)];

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history),
);

const compose = composeWithDevTools(applyMiddleware(...middlewares));

const store: Store<Store.State> = createStore(persistedReducer, compose);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
