import React, { useEffect } from "react";
import axios from "axios";
import {
    MultiChatSocket,
    MultiChatWindow,
    useMultiChatLogic,
} from "react-chat-engine-advanced";
import { PrettyChatWindow } from 'react-chat-engine-pretty';


export function ChatPage() {
    const user = localStorage.getItem("user");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:3000/auth/chat");
    //             console.log(res.data);
    //         } catch (error) {
    //             console.log("CHAT ERROR");
    //         }
    //     }
    //     fetchData()
    // }, []);

    // const chatProps = useMultiChatLogic(
    //     "b0b2185b-7f85-4d90-9d57-ff445fa30162",
    //     user,
    //     user
    // );
    return (
        <div style={{ height: "100vh" }}>
            {/* <MultiChatSocket {...chatProps} />
            <MultiChatWindow {...chatProps} style={{ height: "100%" }} /> */}
            <PrettyChatWindow
                projectId="b0b2185b-7f85-4d90-9d57-ff445fa30162"
                username={user}
                secret={user}
                style={{ height: "100vh" }}
            />
        </div>
    );
}
