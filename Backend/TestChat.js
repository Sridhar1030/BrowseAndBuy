// import WebSocket from "ws";

// // Connect to the WebSocket server
// const ws = new WebSocket("ws://localhost:3000");

// ws.on("open", function open() {
//     ws.send(
//         JSON.stringify({
//             event: "sendChat",
//             data: {
//                 senderName: "user1",
//                 receiverName: "user2",
//                 message: "Hello, User2!",
//             },
//         })
//     );
// });

// ws.on("message", function incoming(data) {
//     console.log("Message from server:", data);
// });
