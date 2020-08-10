import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import styles from './styles/morestyles'
import Announcements from './Announcements'
import Resources from './Resources'
import StudentWeek from './StudentWeek'
import SSLOps from './SSLOps'
import LunchEvents from './LunchEvents'

const Stack = createStackNavigator()

class MoreSwitch extends React.Component {
	constructor(props) {
		super(props)
		this.props = props
	}
	
	render() {
		return (
			<View style={{flex:1,backgroundColor:'red'}}>
				<FlatList
					data={[
						{name:"Announcements",key:"announce"},
						{name:"Resources",key:"resources"},
						{name:"Student of the Week",key:"studentweek"},
						{name:"Lunch Events",key:"lunchevent"},
						{name:"SSL Opportunities",key:"sslops"}
					]}
					renderItem={({item})=>
						<TouchableOpacity style={styles.moreitem} onPress={()=>this.props.navigation.navigate(item.key)}>
							<Text style={styles.moretext}>{item.name}</Text>
						</TouchableOpacity>
					}
				/>
			</View>
		)
	}
}

class More extends React.Component {
	render() {
		return (
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen 
						name="Chooser" 
						component={MoreSwitch}
						options={{
							title:'More',
							headerTitleStyle:styles.headerTitle,
							headerStyle:{borderBottomWidth:0.5,borderBottomColor:'black'},
						}}
					/>
					<Stack.Screen 
						name="announce" 
						component={Announcements}
						options={{
							title:'Announcements',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null
						}}
					/>
					<Stack.Screen 
						name="resources" 
						component={Resources}
						options={{
							title:'Resources',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null
						}}
					/>
					<Stack.Screen 
						name="studentweek" 
						component={StudentWeek}
						options={{
							title:'Student of the Week',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null
						}}
					/>
					<Stack.Screen 
						name="lunchevent" 
						component={LunchEvents}
						options={{
							title:'Lunch Events',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null
						}}
					/>
					<Stack.Screen 
						name="sslops" 
						component={SSLOps}
						options={{
							title:'SSL Opportunities',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}

export default More;