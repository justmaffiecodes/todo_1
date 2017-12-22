import React, {Component} from 'react';
import { Dropdown } from 'semantic-ui-react'
var languages = {}

function add_lang(lang, text){
    languages[lang] = {text:text,key:lang,value:lang};
}

add_lang("en","English")
add_lang("nl","Dutch")
add_lang("fi","Finnish")
add_lang("tr","Turkish")
add_lang("af","African")
add_lang("ar","Arabic")
add_lang("ca","Catalan")
add_lang("cs","Czech")
add_lang("da","Danish")
add_lang("fr","French")
add_lang("de","German")
add_lang("el","Greek")
add_lang("he","Hebrew")
add_lang("hu","Hungarian")
add_lang("it","Italian")
add_lang("ja","Japanese")
add_lang("ko","Korean")
add_lang("no","Norwegian")
add_lang("pl","Polish")
add_lang("ro","Romanian")
add_lang("ru","Russian")
add_lang("sr","Serbian")
add_lang("so","Somali")
add_lang("es-ES","Spanish")
add_lang("sv-SE","Swedish")
add_lang("uk","Ukrainian")
add_lang("vi","Vietnamese")

var values = function (obj) {
    var vals = [];
    for( var key in obj ) {
        if ( obj.hasOwnProperty(key) ) {
            vals.push(obj[key]);
        }
    }
    return vals;
}

class LanguageSelector extends Component {
    onClick(event, {value}){
        var language = localStorage.getItem("language")
        if(language !== value){
            localStorage.setItem("language", value);
            window.location.reload();
        }
    }

    render() {
        return (<Dropdown button
        onChange={this.onClick}
        className='icon'
        floating
        labeled
        scrolling   
        icon='world'
        options={values(languages)}
        defaultValue={this.props.language}
        />)
    }
}

export {languages, LanguageSelector};