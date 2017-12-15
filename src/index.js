import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {addLocaleData, IntlProvider} from 'react-intl';
var languages = {en:require("./translations/en.json"),fi:require("./translations/fi.json"),nl:require("./translations/nl.json")};
var engLang = {fields:languages.en,locale:"en",pluralRuleFunction:function(e,a){return a?1===e?"one":"other":e>=0&&e<2?"one":"other"}}
var finLang = {fields:languages.fi,locale:"fi",pluralRuleFunction:function(e,a){return a?1===e?"one":"other":e>=0&&e<2?"one":"other"}}
var nlLang = {fields:languages.nl,locale:"nl",pluralRuleFunction:function(e,a){return a?1===e?"one":"other":e>=0&&e<2?"one":"other"}}
addLocaleData([engLang,finLang,nlLang])
if (localStorage.getItem("language") === null) {
    localStorage.setItem("language", "en");
}
let language = localStorage.getItem("language");
ReactDOM.render(
<IntlProvider locale={language} messages={languages[language]}>
    <App />
</IntlProvider>,
document.getElementById('root'));
registerServiceWorker();
