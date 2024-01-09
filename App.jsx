import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import tw from 'twrnc';
import {
  StyleSheet,
  View,
} from 'react-native';

import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import BottomBar from './components/BottomBar';
import Mine from './pages/mine/Mine';
import Notification from './pages/notification/Notification'
import PromotionDetail from './pages/promotionDetail/PromotionDetail'
import Publish from './pages/publish/Publish'
import Profile from './pages/profile/Profile'
import Follow from './pages/follow/Follow';
import Message from './pages/message/Message'
import SearchResult from './pages/searchResult/SearchResult'



const Stack = createStackNavigator();
function App() {
  return (
    <View style={tw`flex-1 bg-[#f7f7f7]`}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="Message">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Mine" component={Mine} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Publish" component={Publish} />
          <Stack.Screen name="PromotionDetail" component={PromotionDetail} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Follow" component={Follow} />
          <Stack.Screen name="Message" component={Message} />
          <Stack.Screen name="SearchResult" component={SearchResult} />
        </Stack.Navigator>
        <BottomBar></BottomBar>
      </NavigationContainer>
    </View>

  )
}

const styles = StyleSheet.create({

});

export default App;
