import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {addLocaleData, IntlProvider} from 'react-intl';

function merge(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

function does_lang_exist(lang){try{require(`./translations/${lang}/todolist.json`);return true;}catch(err){return false;}}

function get_messages(lang){
	if(!does_lang_exist(lang)){
		return get_messages("en")
	}
	var list = require(`./translations/${lang}/todolist.json`)
	var entry = require(`./translations/${lang}/entry.json`)
	var inputs = require(`./translations/${lang}/inputs.json`)
	var merged = merge(list, entry)
	merged = merge(merged, inputs)
	return merged
}
var languages = {en:get_messages("en"),fi:get_messages("fi"),nl:get_messages("nl")};
var engLang = {fields:languages.en,locale:"en",pluralRuleFunction:function(e,a){return a?1===e?"one":"other":e>=0&&e<2?"one":"other"}}
var finLang = {fields:languages.fi,locale:"fi",pluralRuleFunction:function(e,a){return a?1===e?"one":"other":e>=0&&e<2?"one":"other"}}
var nlLang = {fields:languages.nl,locale:"nl",pluralRuleFunction:function(e,a){return a?1===e?"one":"other":e>=0&&e<2?"one":"other"}}
addLocaleData([engLang,finLang,nlLang])
if (localStorage.getItem("language") === null) {
    localStorage.setItem("language", "en");
}
let language = localStorage.getItem("language");
if(!does_lang_exist(language)){
	language = "en";
}
ReactDOM.render(
<IntlProvider locale={language} messages={languages[language]}>
    <App />
</IntlProvider>,
document.getElementById('root'));
registerServiceWorker();
