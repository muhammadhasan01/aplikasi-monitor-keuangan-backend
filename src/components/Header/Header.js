import React from 'react';
import axios from 'axios';
import { Link, } from "react-router-dom";
import * as Constants from '../../constants';
import { withRouter } from "react-router-dom";
import './Header.css';

function Header(props) {
    function renderLogout() {
        return(
            <div id="logout">
                <button onClick={() => handleLogout()}>LOGOUT</button>
            </div>
        )
    }

    function handleLogout() {
        /*
        let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                            xmlns:ser="http://services.ck/">\
                        <soapenv:Header/>\
                        <soapenv:Body>\
                            <ser:logout>\
                                <arg0>1</arg0>\
                            </ser:logout>\
                        </soapenv:Body>\
                    </soapenv:Envelope>';
        axios
        .post(Constants.POSTURL,
            xmls,
            {headers:
            {'Content-Type': 'text/xml'}
        })
        .then(res=>{
            var doc = new DOMParser().parseFromString(res.data, 'text/xml');
            var valueXML = doc.getElementsByTagName('ns2:logoutResponse');
            var temps = valueXML[0].children;
            console.log(temps);
            localStorage.removeItem(Constants.ACCESS_TOKEN_NAME);
            props.history.push('/login');
        })
        .catch(err=>{
            console.log(err)
        });
        */
    }

    return(
        <div id="Header">
            <h1>[WEBSITE NAME HERE]</h1>
            {renderLogout()}
        </div>
    )
}
export default withRouter(Header);