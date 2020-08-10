/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

import Home from './Home'
import Calendar from './Calendar'
import Poll from './Poll'
import Clubs from './Clubs'
import More from './More'

const Tab = createBottomTabNavigator();

class App extends React.Component {
	render() {
		return (
			<NavigationContainer >
				<Tab.Navigator tabBarOptions={{
					labelStyle:{
					fontSize:20
				}}}>
					<Tab.Screen name="Home" component={Home} style={{fontSize:30}} />
					<Tab.Screen name="Calendar" component={Calendar} />
					<Tab.Screen name="Polls" component={Poll} />
					<Tab.Screen name="Clubs" component={Clubs} />
					<Tab.Screen name="More" component={More} />
				</Tab.Navigator>
			</NavigationContainer>
		)
	}
}

const styles = StyleSheet.create({
	
}
);
export default App;
