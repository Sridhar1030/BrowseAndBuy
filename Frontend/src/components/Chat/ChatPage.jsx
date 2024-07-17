import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";    

export function ChatPage() {
    const [data, setData] = React.useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/auth/userData",
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        },
                    }
                );
                setData(res.data.data);
            } catch (error) {
                console.log("CHAT ERROR", error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (data.user) {
            console.log(data)
            console.log("data0", data.user.username);
        }
    }, [data]);


    return (
        <>
            <h1>Chat Page</h1>
        </>
    );
}
