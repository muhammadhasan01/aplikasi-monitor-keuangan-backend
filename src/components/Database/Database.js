import React, {useState} from 'react';
import axios from 'axios';
import * as Constants from '../../constants';
import { withRouter } from "react-router-dom";
//import './Database.css';

function Database(props) {
    const [state , setState] = useState({
        username : "",
        password : "",
    })

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

export default withRouter(Database);