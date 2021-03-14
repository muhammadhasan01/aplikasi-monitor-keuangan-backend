import React, {useState} from 'react';
import axios from 'axios';
import * as Constants from '../../constants';
import { withRouter } from "react-router-dom";
import './Login.css';

function Login(props) {
    const [state , setState] = useState({
        username : "",
        password : "",
    })
    const handleChange = (e) => {
        const {id , value} = e.target;
        setState(state => ({
            ...state,
            [id] : value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    }

    const login = () => {
        /*
        if(state.username.length && state.password.length) {
            console.log(state);
            let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                                xmlns:ser="http://services.ck/">\
                            <soapenv:Header/>\
                            <soapenv:Body>\
                                <ser:login>\
                                    <arg0>' + state.username + '</arg0>\
                                    <arg1>' + state.password + '</arg1>\
                                </ser:login>\
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
                var valueXML = doc.getElementsByTagName('ns2:loginResponse');
                var temps = valueXML[0].children; //get returns
                console.log(temps);
                localStorage.setItem(Constants.ACCESS_TOKEN_NAME, temps[0].innerHTML);
                redirectToHomepage();
            })
            .catch(err=>{
                console.log(err)
            });
        }
        */
    }

    /*
    const redirectToHomepage = () => {
        props.history.push('/homepage');
    }
    */

    return(
        <div id="Login">
            <form>
                <div id="FormGroup">
                    <label htmlFor="InputUsername"><h4>USERNAME</h4></label>
                    <input type="text" 
                        id="username" 
                        placeholder="Enter Username"
                        value={state.username}
                        onChange={handleChange}
                    />
                </div>
                <div id="FormGroup">
                    <label htmlFor="InputPassword"><h4>PASSWORD</h4></label>
                    <input type="password" 
                        id="password" 
                        placeholder="Enter Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <button 
                    type="submit" 
                    id="submit"
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(Login);