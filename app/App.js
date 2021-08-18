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
import I18n from './i18n.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tab = createBottomTabNavigator();


AsyncStorage.getItem('language')
  .then((token) => { 
	console.log("lang: " + token);
	I18n.locale = token;
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
					<Tab.Screen name={I18n.t("app.home")} component={Home}/>
					<Tab.Screen name={I18n.t("app.calendar")} component={Calendar}/>
					<Tab.Screen name={I18n.t("app.clubs")} component={Clubs}/>
					<Tab.Screen name={I18n.t("app.staff")} component={Staff}/>
					<Tab.Screen name={I18n.t("app.more")} component={More}/>
				</Tab.Navigator>
				: <OpenPage />}
			</NavigationContainer>
		);
	}
}

export default App;
