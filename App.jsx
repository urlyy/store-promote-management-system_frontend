import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import tw from 'twrnc';
import { useEffect } from 'react';
import userStore from './stores/user'
import {
  StyleSheet,
  View,
  Modal,
  Text,
  PermissionsAndroid
} from 'react-native';


import Entrance from './pages/entrance/Entrance'
import Home from './pages/home/Home'
import BottomBar from './components/BottomBar';
import Mine from './pages/mine/Mine';
import Notification from './pages/notification/Notification'
import PromotionDetail from './pages/promotionDetail/PromotionDetail'
import Publish from './pages/publish/Publish'
import Profile from './pages/profile/Profile'
import Follow from './pages/follow/Follow';
import PrivateMessage from './pages/privateMessage/PrivateMessage'
import SearchResult from './pages/searchResult/SearchResult'
import MerchantManage from './pages/merchantManage/MerchantManage';
import AccountManage from './pages/accountManage/AccountManage';
import EditProfile from './pages/editProfile/EditProfile';
import getPermissions from './utils/getPermissions'
import NotificationPolling from './components/NotificationPolling';
import MerchantPosition from './pages/merchantPosition/MerchantPosition';
import UpdatePassword from './pages/updatePassword/UpdatePassword';
import FollowPromotion from './pages/followPromotion/FollowPromotion';

import locator from './utils/getLocation'
import Toast from 'react-native-toast-message';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const App = () => {
  const { token } = userStore();
  const setCurrentLocation = userStore(state => state.setCurrentLocation);
  useEffect(() => {
    getPermissions().then(async (res) => {
      const getLocation = async () => {
        const { latitude, longitude } = await locator.getLocation();
        setCurrentLocation({ latitude, longitude });
      }
      await getLocation();
      setInterval(getLocation, 20 * 1000);
    });
    AsyncStorage.setItem('token', token);
  }, [])
  return (
    <View style={tw`flex-1`}>
      {token == null ? <Entrance></Entrance> : (
        <>
          <NotificationPolling></NotificationPolling>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, initialRouteName: "Home" }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Mine" component={Mine} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen name="Publish" component={Publish} />
              <Stack.Screen name="PromotionDetail" component={PromotionDetail} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="FollowPromotion" component={FollowPromotion} />
              <Stack.Screen name="Follow" component={Follow} />
              <Stack.Screen name="PrivateMessage" component={PrivateMessage} />
              <Stack.Screen name="SearchResult" component={SearchResult} />
              <Stack.Screen name="MerchantManage" component={MerchantManage} />
              <Stack.Screen name="AccountManage" component={AccountManage} />
              <Stack.Screen name="MerchantPosition" component={MerchantPosition} />

            </Stack.Navigator>
            <BottomBar></BottomBar>
          </NavigationContainer>
          <Toast />
        </>
      )}

    </View >
  )
}

export default App;
