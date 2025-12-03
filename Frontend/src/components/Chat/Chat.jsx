import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, Settings, Search } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import Peer from "simple-peer";
import ChatBox from "./ChatBox.jsx";
import Conversation from "./Conversation.jsx";
import SearchComponent from "./SearchComponent";
import CallModal from "./CallModal";

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    // Call states
    const [callStatus, setCallStatus] = useState("idle"); // idle, outgoing, incoming, connected
    const [callType, setCallType] = useState(null); // audio or video
    const [caller, setCaller] = useState(null);
    const [callerSignal, setCallerSignal] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const peerRef = useRef();

    const navigate = useNavigate();
    const base_url = import.meta.env.VITE_API_URL;
    const socket = useRef();

    const [user, setUser] = useState(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null
    );
    const { senderId } = useParams();

    useEffect(() => {
        setUser(
            localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user"))
                : null
        );
    }, [user?._id]);

    useEffect(() => {
        socket.current = io(`http://localhost:3000`);
        socket.current.emit("new-user-add", user?._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });

        socket.current.on("recieve-message", (data) => {
            setReceivedMessage(data);
        });

        // Call event listeners
        socket.current.on(
            "incoming-call",
            ({ signal, from, name, callType }) => {
                setCallStatus("incoming");
                setCallType(callType);
                setCaller({ id: from, name });
                setCallerSignal(signal);
            }
        );

        socket.current.on("call-accepted", (signal) => {
            setCallStatus("connected");
            peerRef.current?.signal(signal);
        });

        socket.current.on("call-rejected", () => {
            endCall();
            alert("Call was rejected");
        });

        socket.current.on("call-ended", () => {
            endCall();
        });

        return () => {
            socket.current.disconnect();
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [user]);

    useEffect(() => {
        const getChats = async () => {
            if (user) {
                try {
                    const response = await axios.get(
                        `${base_url}/chat/${user?._id}`
                    );
                    setChats(response.data.data);
                } catch (error) {
                    console.error("Error fetching chats:", error);
                }
            }
        };
        getChats();
    }, [user]);

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
            setSendMessage(null);
        }
    }, [sendMessage]);

    useEffect(() => {
        const createChat = async () => {
            if (senderId && user?._id) {
                try {
                    const existingChat = chats.find(
                        (chat) =>
                            chat.members.includes(senderId) &&
                            chat.members.includes(user._id)
                    );

                    if (existingChat) {
                        setCurrentChat(existingChat);
                        return;
                    }

                    const response = await axios.post(`${base_url}/chat/`, {
                        senderId: user._id,
                        receiverId: senderId,
                    });

                    const newChat = response.data.data;
                    setChats((prev) => [...prev, newChat]);
                    setCurrentChat(newChat);
                } catch (error) {
                    console.error("Error creating chat:", error);
                }
            }
        };

        createChat();
    }, [senderId, user?._id, chats]);

    const handleNewChat = async (selectedUser) => {
        try {
            const response = await axios.post(`${base_url}/chat/`, {
                senderId: user._id,
                receiverId: selectedUser._id,
            });
            setChats((prev) => [...prev, response.data.data]);
            setCurrentChat(response.data.data);
            setSearchTerm("");
            setShowSearch(false);
            navigate(`/chat/${selectedUser._id}`);
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user?._id);
        return onlineUsers.some((user) => user.userId === chatMember);
    };

    const handleChatChange = (chat) => {
        const userId = chat.members.find((id) => id !== user?._id);
        navigate(`/chat/${userId}`);
        setCurrentChat(chat);
    };

    // Call functions
    const initiateCall = async (type) => {
        if (!currentChat) return;

        setCallType(type);
        setCallStatus("outgoing");

        try {
            // Check if getUserMedia is supported
            if (
                !navigator.mediaDevices ||
                !navigator.mediaDevices.getUserMedia
            ) {
                throw new Error("Your browser doesn't support media devices");
            }

            const constraints = {
                audio: true,
                video:
                    type === "video"
                        ? {
                              width: { ideal: 1280 },
                              height: { ideal: 720 },
                          }
                        : false,
            };

            console.log("Requesting media with constraints:", constraints);
            const stream =
                await navigator.mediaDevices.getUserMedia(constraints);
            console.log("Got media stream:", stream.getTracks());
            setLocalStream(stream);

            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream,
            });

            peerRef.current = peer;

            peer.on("signal", (data) => {
                const receiverId = currentChat.members.find(
                    (id) => id !== user._id
                );
                socket.current.emit("call-user", {
                    userToCall: receiverId,
                    signalData: data,
                    from: user._id,
                    name: user.username,
                    callType: type,
                });
            });

            peer.on("stream", (stream) => {
                setRemoteStream(stream);
            });

            peer.on("error", (err) => {
                console.error("Peer connection error:", err);
            });
        } catch (error) {
            console.error("Error accessing media devices:", error);
            let errorMessage = "Could not access camera/microphone. ";

            if (
                error.name === "NotAllowedError" ||
                error.name === "PermissionDeniedError"
            ) {
                errorMessage +=
                    "Permission was denied. Please allow access to your microphone" +
                    (type === "video" ? " and camera" : "") +
                    ".";
            } else if (
                error.name === "NotFoundError" ||
                error.name === "DevicesNotFoundError"
            ) {
                errorMessage +=
                    "No microphone" +
                    (type === "video" ? " or camera" : "") +
                    " was found.";
            } else if (
                error.name === "NotReadableError" ||
                error.name === "TrackStartError"
            ) {
                errorMessage +=
                    "Your camera or microphone is already in use by another application.";
            } else if (
                error.name === "OverconstrainedError" ||
                error.name === "ConstraintNotSatisfiedError"
            ) {
                errorMessage +=
                    "Camera/microphone doesn't meet the requirements.";
            } else if (error.name === "TypeError") {
                errorMessage += "Invalid constraints. " + error.message;
            } else {
                errorMessage += error.message || "Unknown error occurred.";
            }

            alert(errorMessage);
            setCallStatus("idle");
        }
    };

    const answerCall = async () => {
        setCallStatus("connected");

        try {
            // Check if getUserMedia is supported
            if (
                !navigator.mediaDevices ||
                !navigator.mediaDevices.getUserMedia
            ) {
                throw new Error("Your browser doesn't support media devices");
            }

            const constraints = {
                audio: true,
                video:
                    callType === "video"
                        ? {
                              width: { ideal: 1280 },
                              height: { ideal: 720 },
                          }
                        : false,
            };

            console.log("Answering call with constraints:", constraints);
            const stream =
                await navigator.mediaDevices.getUserMedia(constraints);
            console.log("Got media stream for answer:", stream.getTracks());
            setLocalStream(stream);

            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream,
            });

            peerRef.current = peer;

            peer.on("signal", (data) => {
                socket.current.emit("answer-call", {
                    signal: data,
                    to: caller.id,
                });
            });

            peer.on("stream", (stream) => {
                setRemoteStream(stream);
            });

            peer.on("error", (err) => {
                console.error("Peer connection error:", err);
            });

            peer.signal(callerSignal);
        } catch (error) {
            console.error("Error accessing media devices:", error);
            let errorMessage = "Could not access camera/microphone. ";

            if (
                error.name === "NotAllowedError" ||
                error.name === "PermissionDeniedError"
            ) {
                errorMessage +=
                    "Permission was denied. Please allow access to your microphone" +
                    (callType === "video" ? " and camera" : "") +
                    ".";
            } else if (
                error.name === "NotFoundError" ||
                error.name === "DevicesNotFoundError"
            ) {
                errorMessage +=
                    "No microphone" +
                    (callType === "video" ? " or camera" : "") +
                    " was found.";
            } else if (
                error.name === "NotReadableError" ||
                error.name === "TrackStartError"
            ) {
                errorMessage +=
                    "Your camera or microphone is already in use by another application.";
            } else if (
                error.name === "OverconstrainedError" ||
                error.name === "ConstraintNotSatisfiedError"
            ) {
                errorMessage +=
                    "Camera/microphone doesn't meet the requirements.";
            } else if (error.name === "TypeError") {
                errorMessage += "Invalid constraints. " + error.message;
            } else {
                errorMessage += error.message || "Unknown error occurred.";
            }

            alert(errorMessage);
            rejectCall();
        }
    };

    const rejectCall = () => {
        socket.current.emit("reject-call", { to: caller.id });
        endCall();
    };

    const endCall = () => {
        if (callStatus === "connected" || callStatus === "outgoing") {
            const receiverId = currentChat?.members.find(
                (id) => id !== user._id
            );
            if (receiverId) {
                socket.current.emit("end-call", { to: receiverId });
            }
        }

        if (peerRef.current) {
            peerRef.current.destroy();
        }

        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
        }

        setCallStatus("idle");
        setCallType(null);
        setCaller(null);
        setCallerSignal(null);
        setLocalStream(null);
        setRemoteStream(null);
        setIsMuted(false);
        setIsVideoOff(false);
    };

    const toggleMute = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };

    const NoSelectedChat = () => (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <MessageSquare size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to Messages
            </h1>
            <p className="text-gray-600 text-center max-w-md mb-6">
                Search for users or select an existing conversation to start
                chatting
            </p>
            <button
                onClick={() => setShowSearch(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Start New Chat
            </button>
        </div>
    );

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-gray-800">
                            Messages
                        </h1>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <Settings size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                    <SearchComponent
                        onSelectUser={(selectedUser) =>
                            handleNewChat(selectedUser)
                        }
                    />
                </div>

                <div className="flex flex-col">
                    {/* Chat List */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="p-3">
                            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Recent Chats
                            </h2>
                        </div>
                        <div
                            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 
                            scrollbar-track-transparent hover:scrollbar-thumb-blue-300 pr-2"
                        >
                            <div className="space-y-1">
                                {chats
                                    ?.slice()
                                    .reverse()
                                    .map((chat) => (
                                        <div
                                            key={chat._id}
                                            onClick={() =>
                                                handleChatChange(chat)
                                            }
                                        >
                                            <Conversation
                                                data={chat}
                                                currentUser={user?._id}
                                                online={checkOnlineStatus(chat)}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    {/* 
                    User Profile
                    <div className="p-4 border-t bg-red-300 border-gray-200 mt-auto pb-0 ">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user?.username?.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-800">{user?.username}</p>
                                <p className="text-xs text-gray-500">Online</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {currentChat ? (
                    <ChatBox
                        chat={currentChat}
                        currentUser={user?._id}
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                        onCall={initiateCall}
                    />
                ) : (
                    <NoSelectedChat />
                )}
            </div>

            {/* Call Modal */}
            <CallModal
                callStatus={callStatus}
                callType={callType}
                callerName={
                    caller?.name ||
                    currentChat?.members.find((id) => id !== user._id)
                }
                onAnswer={answerCall}
                onReject={rejectCall}
                onEnd={endCall}
                localStream={localStream}
                remoteStream={remoteStream}
                isMuted={isMuted}
                isVideoOff={isVideoOff}
                onToggleMute={toggleMute}
                onToggleVideo={toggleVideo}
            />
        </div>
    );
};

export default Chat;
