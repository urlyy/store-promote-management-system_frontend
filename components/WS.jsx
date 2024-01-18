// import { useState, useEffect, useRef } from "react";
// import { API_BACKEND_WS_URL } from '../env'

// const WS = () => {
//     const socket = useRef(null);
//     useEffect(() => {
//         socket.current = io(`${API_BACKEND_WS_URL}/msg`, { transports: ["websocket"] });
//         socket.connect();
//         socket.on('connect', () => {
//             emit('player_enter');
//         });
//         socket.on('disconnect', () => {

//         });
//         // 在组件卸载时解除事件监听
//         return () => {
//             socket.off('connect');
//             socket.disconnect();
//             socket.off('disconnect');
//         };
//     }, [])
// }
// export default WS;

