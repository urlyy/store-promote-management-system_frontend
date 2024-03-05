import { useState, useEffect } from "react"
import request from "../utils/request"
import userStore from "../stores/user"

const NotificationPolling = () => {
    const setUnread = userStore(state => state.setUnread);
    const getUnreadNotifications = async () => {
        const res = await request.get('/notification/count/unread')
        const cnt = res.data.data.unread_cnt;
        console.log(cnt);
        setUnread(cnt);
    }
    useEffect(() => {
        // 首次加载数据
        getUnreadNotifications();
        // 设置定时器，每隔3分钟请求一次数据
        const intervalId = setInterval(() => {
            getUnreadNotifications();
        }, 3 * 60 * 1000); // 3分钟
        // 在组件卸载时清除定时器
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (
        <></>
    )
}

export default NotificationPolling