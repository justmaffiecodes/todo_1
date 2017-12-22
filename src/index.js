import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {addLocaleData, IntlProvider} from 'react-intl';
var llangs = require("./components/LanguageSelector").languages;
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
function getLang(lang){
	return {fields:languages[lang],locale:lang,pluralRuleFunction:function(e,a){return a?1===e?"one":"other":e>=0&&e<2?"one":"other"}}
}
var langs = []
function addLang(lang){
	let messages = get_messages(lang);
	languages[lang] = messages;
	langs.push(getLang(lang))
}
for(var lol in Object.keys(llangs)){
	lol = Object.keys(llangs)[lol]
	addLang(lol)
}
addLocaleData(langs)
if (localStorage.getItem("language") === null) {
    localStorage.setItem("language", "en");
}
let language = localStorage.getItem("language");
if(!does_lang_exist(language)){
	language = "en";
}
ReactDOM.render(
<IntlProvider locale={language} messages={languages[language]}>
    <App language={language}/>
</IntlProvider>,
document.getElementById('root'));
registerServiceWorker();
