import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {addLocaleData, IntlProvider} from 'react-intl';
var engLang = {fields:require('./translations/en.json'),locale:"en",pluralRuleFunction:function(e,a){return a?1===e?"one":"other":e>=0&&e<2?"one":"other"}}

addLocaleData([...engLang])

if (localStorage.getItem("language") === null) {
    localStorage.setItem("language", "en");
}
let language = localStorage.getItem("language");

ReactDOM.render(
<IntlProvider locale={language}>
    <App />
</IntlProvider>,
document.getElementById('root'));
registerServiceWorker();
