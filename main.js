import React from 'react';
import ReactDOM from 'react-dom';
import less from 'less';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import 'antd/dist/antd.less';

import App from './src/components/App.jsx';


ReactDOM.render(
    <LocaleProvider locale={enUS}>
      <App/>
    </LocaleProvider>
  ,document.getElementById('app')
);
