import { create } from 'zustand'
// import localStorage from '../utils/localStorage'

let user = null;

// const userStr = localStorage.getString("user");
// if (userStr) {
//     user = JSON.parse(userStr);
// }

const userStore = create(set => ({
    token: user ? user.token : null,
    id: user ? user.id : null,
    username: user ? user.username : null,
    age: user ? user.age : null,
    gender: user ? user.gender : null,
    // coin: user ? user.coin : null,
    avatar: user ? user.avatar : null,
    brief: user ? user.brief : null,
    role: user ? user.role : null,
    location: user ? user.location : null,
    currentLocation: null,
    promotionNum: user ? user.promotionNum : null,
    commentNum: user ? user.commentNum : null,
    fanNum: user ? user.fanNum : null,
    category: user ? user.category : null,
    unread: 0,
    logout: () => set(state => ({
        token: null,
        id: null,
        username: null,
        // coin: null,
        age: null,
        gender: null,
        avatar: null,
        brief: null,
        role: null,
        location: null,
        // currentLocation: null,
        promotionNum: null,
        commentNum: null,
        fanNum: null,
        category: null,
    })),
    setUser: (user) => set(state => ({
        id: user.id,
        // coin: user.coin,
        username: user.username,
        token: user.token,
        avatar: user.avatar,
        age: user.age,
        gender: user.gender,
        brief: user.brief,
        role: user.role,
        fanNum: user.fanNum,
        location: user.location,
        promotionNum: user.promotionNum,
        commentNum: user.commentNum,
        category: user.category,
    })),
    setCurrentLocation: ({ latitude, longitude }) => set(state => {
        return {
            ...state,
            currentLocation: [latitude, longitude]
        }
    }),
    beMerchant: (latitude, longitude, category) => set(prev => {
        return ({
            ...prev,
            role: 1,
            location: [latitude, longitude],
            promotionNum: 0,
            commentNum: 0,
            category: category,
        })
    }),
    setAvatar: (avatar) => set(prev => ({ ...prev, avatar: avatar })),
    setCategory: (category) => set(prev => ({ ...prev, category: category })),
    setLocation: (latitude, longitude) => set(prev => ({ ...prev, location: [latitude, longitude] })),
    setUnread: (count) => set(prev => ({ ...prev, unread: count })),
    setProfile: (newProfile) => set(prev => ({ ...prev, ...newProfile }))
}))

export default userStore;