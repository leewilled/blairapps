import React, {Fragment, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
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
				<Tab.Navigator tabBarOptions={{
					activeTintColor: 'red',
					labelStyle:{
					fontSize:16
				}}}>
					<Tab.Screen name="Home" component={Home} />
					<Tab.Screen name="Calendar" component={Calendar} />
					<Tab.Screen name="Polls" component={Poll} />
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
