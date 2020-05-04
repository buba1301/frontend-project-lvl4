import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


export default (gon) => {
    console.log(gon);
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, 
        document.getElementById('chat'),
      );
}
