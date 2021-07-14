import React, {Fragment, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import Calendar from './Calendar'
import Clubs from './Clubs'
import More from './More'
import Staff from './Staff'
import OpeningPage from './OpeningPage';
import OpenPage from './OpenPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import I18n from './i18n';
import AsyncStorage from '@react-native-community/async-storage'

const Tab = createBottomTabNavigator();

/*AsyncStorage.getItem('language')
  .then((token) => { 
	console.log("lang: " + token);
	I18n.locale = token;
  });
*/
AsyncStorage.getItem('announcementNotifs')
	.then((token) => { 
	console.log("announcementNotifs: " + token);
	});
AsyncStorage.getItem('eventNotifs')
	.then((token) => { 
	console.log("eventNotifs: " + token);
	});

class App extends React.Component {
	state = {
		loaded: false
	}
	constructor() {
		super();
		OpeningPage.load(v => this.setState({loaded: true}));
	}
	
	render() {
		return (
			<NavigationContainer >
				{this.state.loaded ? 
				<Tab.Navigator 
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
			
						if (route.name === 'Home' || route.name === 'Casa') {
							iconName = focused ? 'ios-home' : 'ios-home-outline';
						} else if (route.name === 'Calendar' || route.name === 'Calendario') {
							iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
						} else if (route.name === 'Clubs' || route.name === 'Clubes') {
							iconName = focused ? 'ios-people-circle' : 'ios-people-circle-outline';
						} else if (route.name === 'Staff' || route.name === 'Personal') {
							iconName = focused ? 'ios-nutrition' : 'ios-nutrition-outline';
						} else if (route.name === 'More' || route.name === 'Más') {
							iconName = focused ? 'ios-ellipsis-horizontal' : 'ios-ellipsis-horizontal-outline';
						}

						return <Ionicons name={iconName} size={size} color={color} />;
						},
					})}
					tabBarOptions={{
						activeTintColor: 'red',
						labelStyle:{
						fontSize:16
					}}}
				>	
					<Tab.Screen name="Home" component={Home}/>
					<Tab.Screen name="Calendar" component={Calendar}/>
					<Tab.Screen name="Clubs" component={Clubs}/>
					<Tab.Screen name="Staff" component={Staff}/>
					<Tab.Screen name="More" component={More}/>
				</Tab.Navigator>
				: <OpenPage />}
			</NavigationContainer>
		);
	}
}

export default App;
