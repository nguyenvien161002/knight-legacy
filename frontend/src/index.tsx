import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GlobalStyle from './components/globalstyle';
import { Web3Provider, MetamarkProvider } from './provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <GlobalStyle>
      <Provider store={store}>
        <Web3Provider>
          <MetamarkProvider>
           <App />
          </MetamarkProvider>
        </Web3Provider>
      </Provider>
      
    </GlobalStyle>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

