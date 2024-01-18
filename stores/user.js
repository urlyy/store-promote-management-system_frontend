import { create } from 'zustand'
import localStorage from '../utils/localStorage'

let user = null;

const userStr = localStorage.getString("user");
if (userStr) {
    user = JSON.parse(userStr);
}

const userStore = create(set => ({
    token: user ? user.token : null,
    id: user ? user.id : null,
    username: user ? user.username : null,
    coin: user ? user.coin : null,
    avatar: user ? user.avatar : null,
    brief: user ? user.brief : null,
    role: user ? user.role : null,
    location: user ? user.location : null,
    logout: () => set(state => ({
        token: null,
        id: null,
        username: null,
        coin: null,
        avatar: null,
        brief: null,
        role: null,
        location: null,
    })),
    setUser: (user) => set(state => ({
        id: user.id,
        coin: user.coin,
        username: user.username,
        token: user.token,
        avatar: user.avatar,
        brief: user.brief,
        role: user.role,
        location: user.location,
    })),
    beMerchant: () => set(prev => {
        return ({
            ...prev,
            role: 1
        })
    }),
    setAvatar: (avatar) => set(prev => ({ ...prev, avatar: avatar }))
}))



export default userStore;