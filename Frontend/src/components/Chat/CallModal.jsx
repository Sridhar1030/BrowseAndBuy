import React, { useEffect, useRef, useState } from "react";
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, X } from "lucide-react";

const CallModal = ({
    callStatus,
    callType,
    callerName,
    onAnswer,
    onReject,
    onEnd,
    localStream,
    remoteStream,
    isMuted,
    isVideoOff,
    onToggleMute,
    onToggleVideo,
}) => {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    if (!callStatus || callStatus === "idle") return null;

    const renderIncomingCall = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <div className="text-center">
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl text-white font-bold">
                            {callerName?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {callerName}
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Incoming {callType === "video" ? "video" : "voice"}{" "}
                        call...
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={onReject}
                            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                        >
                            <PhoneOff className="w-8 h-8 text-white" />
                        </button>
                        <button
                            onClick={onAnswer}
                            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg"
                        >
                            <Phone className="w-8 h-8 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOutgoingCall = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <div className="text-center">
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <span className="text-3xl text-white font-bold">
                            {callerName?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {callerName}
                    </h2>
                    <p className="text-gray-600 mb-8">Calling...</p>
                    <button
                        onClick={onEnd}
                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg mx-auto"
                    >
                        <PhoneOff className="w-8 h-8 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );

    const renderActiveCall = () => (
        <div className="fixed inset-0 z-50 bg-gray-900">
            <div className="relative h-full flex flex-col">
                {/* Remote Video (Full Screen) */}
                <div className="flex-1 relative bg-gray-800">
                    {callType === "video" && remoteStream ? (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-5xl text-white font-bold">
                                    {callerName?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Local Video (Picture in Picture) */}
                    {callType === "video" && localStream && !isVideoOff && (
                        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden shadow-xl">
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover mirror"
                            />
                        </div>
                    )}

                    {/* Caller Name Overlay */}
                    <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                        <p className="text-white font-semibold">{callerName}</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-gray-800 p-6">
                    <div className="flex justify-center items-center space-x-6">
                        {callType === "video" && (
                            <button
                                onClick={onToggleVideo}
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                                    isVideoOff
                                        ? "bg-red-500 hover:bg-red-600"
                                        : "bg-gray-600 hover:bg-gray-700"
                                }`}
                            >
                                {isVideoOff ? (
                                    <VideoOff className="w-6 h-6 text-white" />
                                ) : (
                                    <Video className="w-6 h-6 text-white" />
                                )}
                            </button>
                        )}
                        <button
                            onClick={onToggleMute}
                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                                isMuted
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-gray-600 hover:bg-gray-700"
                            }`}
                        >
                            {isMuted ? (
                                <MicOff className="w-6 h-6 text-white" />
                            ) : (
                                <Mic className="w-6 h-6 text-white" />
                            )}
                        </button>
                        <button
                            onClick={onEnd}
                            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                        >
                            <PhoneOff className="w-8 h-8 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    switch (callStatus) {
        case "incoming":
            return renderIncomingCall();
        case "outgoing":
            return renderOutgoingCall();
        case "connected":
            return renderActiveCall();
        default:
            return null;
    }
};

export default CallModal;
