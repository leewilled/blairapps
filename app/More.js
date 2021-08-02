import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
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
import Announcements, {TeacherList} from './Announcements'
import Resources from './Resources'
import StudentWeek from './StudentWeek'
import SSLOps, {SSLInfo} from './SSLOps'
import LunchEvents, {LunchInfo} from './LunchEvents'
import ChallengeWeek from './ChallengeWeek'
import Settings from './Settings'
import Poll from './Poll'
import Images from './Images'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
//import I18n from './i18n';

const Stack = createStackNavigator()

class MoreSwitch extends React.Component {
	constructor(props) {
		super(props)
		this.props = props
	}
	
	render() {
		return (
			<View style={{flex:1,backgroundColor:'white', paddingHorizontal: '5%'}}>
				<FlatList
					data={[
						{name:'Announcements',key:"announce", img:"megaphone-outline"},
						{name:"Resources",key:"resources", img:"newspaper-outline"},
						{name:"Student of the Week",key:"studentweek", img:"ribbon-outline"},
						{name:"Lunch Events",key:"lunchevent", img:"fast-food-outline"},
						{name:"SSL Opportunities",key:"sslopps", img:"school-outline"},
						{name:"Challenge of the Week",key:"challengeweek", img:"golf-outline"},
						{name:"Polls", key:"polls", img: "stats-chart-outline"},
						{name:"Settings", key:"settings", img: "settings-outline"},
					]}
					renderItem={({item})=>
						
						<TouchableOpacity style={styles.moreitem} onPress={()=>this.props.navigation.navigate(item.key)}>
							<Ionicons name={item.img} size={36} color={'#323232'}style={{marginRight: 15}}/>
							<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '85%'}}>
								<Text style={styles.moretext}>{item.name}</Text>
								<Image source = {require('./assets/forward.png')} style={{tintColor: '#b2b2b2'}}/>
							</View>
							
						</TouchableOpacity>
					}
				/>
			</View>
		)
	}
}

const background = (<LinearGradient
                    colors={['#f99', 'white']}
                    style = {{flex:1,borderBottomColor:'black',borderBottomWidth:0.5}}
                    />)

class More extends React.Component {
	render() {
		return (
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen 
						name="Chooser" 
						component={MoreSwitch}
						options={{
							title:"More",
							headerTitleStyle:styles.headerTitle,
							headerBackground: ()=>background,
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="announce" 
						component={Announcements}
						options={{
							title:"Announcements",
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="resources" 
						component={Resources}
						options={{
							title:"Resources",
							headerTitleStyle:styles.headerTitle,
							headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="studentweek" 
						component={StudentWeek}
						options={{
							title:"Student of the Week",
							headerTitleStyle:styles.headerTitle,
							headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="lunchevent" 
						component={LunchEvents}
						options={{
							title:"Lunch Events",
							headerTitleStyle:styles.headerTitle,
							headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="sslopps" 
						component={SSLOps}
						options={{
							title:"SSL Opportunities",
							headerTitleStyle:styles.headerTitle,
							headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="challengeweek" 
						component={ChallengeWeek}
						options={{
							title:"Challenge of the Week",
							headerTitleStyle:styles.headerTitle,
							headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="polls" 
						component={Poll}
						options={{
							title:"Polls",
							headerTitleStyle:styles.headerTitle,
							headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="settings" 
						component={Settings}
						options={{
							title:"Settings",
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background,
							headerShown:false,
						}}
					/>
					<Stack.Screen 
						name="TeacherList" 
						component={TeacherList}
						options={({route})=>({
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center',fontSize:Math.min(24,24*23/route.params.name.length)}],
							title:route.params.name,
							headerRight:()=>(<></>),
							headerBackground: ()=>background
						})}
					/>
					<Stack.Screen 
						name="LunchInfo" 
						component={LunchInfo}
						options={({route})=>({
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center',fontSize:Math.min(24,24*23/route.params.name.length)}],
							title:route.params.name,
							headerRight:()=>(<></>),
							headerBackground: ()=>background
						})}
					/>
					<Stack.Screen 
						name="SSLInfo" 
						component={SSLInfo}
						options={({route})=>({
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center',fontSize:Math.min(24,24*23/route.params.name.length)}],
							title:route.params.name,
							headerBackground: ()=>background,
							headerRight:()=>(<></>)
						})}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}

export default More;