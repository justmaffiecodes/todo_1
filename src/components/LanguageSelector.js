import React, {Component} from 'react';
import { Dropdown } from 'semantic-ui-react'
var languages = {
    fi: {
        text:"Finnish",
        key: "fi",
        value: "fi"
    },
    en: {
        text:"English",
        key: "en",
        value: "en"
    },
    nl: {
        text:"Dutch",
        key: "nl",
        value: "nl"
    }
}

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
        icon='world'
        options={values(languages)}
        search
        text="Select Language"
        />)
    }
}

export default LanguageSelector;