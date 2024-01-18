import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import tw from 'twrnc';
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
import PromotionManage from './pages/promotionManage/PromotionManage';
import AccountManage from './pages/accountManage/AccountManage';
import userStore from './stores/user';
import getPermissions from './utils/getPermissions'
import NotificationPolling from './components/NotificationPolling';

const Stack = createStackNavigator();
const App = () => {
  getPermissions();
  const { token } = userStore();
  return (
    <View style={tw`flex-1`}>
      {token == null ? <Entrance></Entrance> : (
        <>
          <NotificationPolling></NotificationPolling>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, initialRouteName: "Home" }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Mine" component={Mine} />
              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen name="Publish" component={Publish} />
              <Stack.Screen name="PromotionDetail" component={PromotionDetail} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Follow" component={Follow} />
              <Stack.Screen name="PrivateMessage" component={PrivateMessage} />
              <Stack.Screen name="SearchResult" component={SearchResult} />
              <Stack.Screen name="PromotionManage" component={PromotionManage} />
              <Stack.Screen name="AccountManage" component={AccountManage} />
            </Stack.Navigator>
            <BottomBar></BottomBar>
          </NavigationContainer>
        </>
      )}

    </View >
  )
}

export default App;
