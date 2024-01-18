import { useState, useEffect } from "react"
import request from "../utils/request"

const NotificationPolling = () => {
    const getUnreadNotifications = async (userId) => {
        const res = await request.get('/notification/count/unread')
        return res.data.data;
    }
    useEffect(() => {
        // // 首次加载数据
        // getUnreadNotifications();
        // // 设置定时器，每隔3分钟请求一次数据
        // const intervalId = setInterval(() => {
        //     fetchData();
        // }, 3 * 60 * 1000); // 3分钟

        // // 在组件卸载时清除定时器
        // return () => {
        //     clearInterval(intervalId);
        // };
    }, []);
    return (
        <></>
    )
}

export default NotificationPolling