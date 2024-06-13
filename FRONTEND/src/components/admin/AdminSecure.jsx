import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminSecure = (props) => {

    let history = useHistory();

    let [Token, SetToken] = useState("");

    useEffect(() => {

        let ADMIN_TOKEN = localStorage.getItem("ADMIN_TOKEN");

        if (!ADMIN_TOKEN) {
            history.push("/admin/login")
        }
        else {
            SetToken(ADMIN_TOKEN)
        }

    }, [])

    if (!Token) {
        return (
            // IF TOKEN NOT GET THEN DISPLAY THIS EMPTY SPAN THAT STOP THE BACK PAGE THRITTEN //
            // IF ANY CHANGE PATH ITSELF IN WEBSITE IT WILL AUTOMEICALLY REDIRECT ON /ADMIN/LOGIN PAGEE THAT ABOVE DISPLAY ! //
            <span>  </span>
        )
    }

    return (
        <div>
            {
                props.children
            }
        </div>
    )
}

export default AdminSecure;
