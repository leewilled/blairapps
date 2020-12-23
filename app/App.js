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
import SplashScreen from 'react-native-splash-screen';
import Home from './Home'
import Calendar from './Calendar'
import Poll from './Poll'
import Clubs from './Clubs'
import More from './More'
import Staff from './Staff'
import OpeningPage from './OpeningPage';
import OpenPage from './OpenPage';
import styles from './styles/morestyles';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

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
			
						if (route.name === 'Home') {
							iconName = focused ? 'ios-home' : 'ios-home-outline';
						} else if (route.name === 'Calendar') {
							iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
						} else if (route.name === 'Polls') {
							iconName = focused ? 'ios-pie-chart' : 'ios-pie-chart-outline';
						} else if (route.name === 'Clubs') {
							iconName = focused ? 'ios-people-circle' : 'ios-people-circle-outline';
						} else if (route.name === 'Staff') {
							iconName = focused ? 'ios-nutrition' : 'ios-nutrition-outline';
						} else if (route.name === 'More') {
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
					<Tab.Screen name="Calendar" component={Calendar} />
					<Tab.Screen name="Clubs" component={Clubs} options ={{title: 'Clubs'}}/>
					<Tab.Screen name="Staff" component={Staff} />
					<Tab.Screen name="More" component={More} />
				</Tab.Navigator>
				: <OpenPage />}
			</NavigationContainer>
		);
	}
}

export default App;
