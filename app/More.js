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
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'

import styles from './styles/morestyles'
import Announcements, {TeacherList} from './Announcements'
import Resources from './Resources'
import StudentWeek from './StudentWeek'
import SSLOps, {SSLInfo} from './SSLOps'
import LunchEvents, {LunchInfo} from './LunchEvents'
import ChallengeWeek from './ChallengeWeek'
import Poll from './Poll'
import Language from './Language'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from './i18n';

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
						{name:I18n.t("more.Announcements"),key:"announce", img:"megaphone-outline"},
						{name:I18n.t("more.Resources"),key:"resources", img:"newspaper-outline"},
						{name:I18n.t("more.SOTW"),key:"studentweek", img:"ribbon-outline"},
						{name:I18n.t("more.lunch"),key:"lunchevent", img:"fast-food-outline"},
						{name:I18n.t("more.ssl"),key:"sslopps", img:"school-outline"},
						{name:I18n.t("more.COTW"),key:"challengeweek", img:"golf-outline"},
						{name:I18n.t("more.Polls"), key:"polls", img: "stats-chart-outline"},
						{name:I18n.t("more.Settings"), key:"settings", img: "settings-outline"},
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

class SettingSwitch extends React.Component {
	constructor(props) {
		super(props)
		this.props = props
	}
	
	render() {
		return (
			<View style={{flex:1,backgroundColor:'white', paddingHorizontal: '5%'}}>
				<FlatList
					data={[
						{name:"Language",key:"language", img:'language-outline'}
					]}
					renderItem={({item})=>
						<TouchableOpacity style={styles.moreitem} onPress={()=>this.props.navigation.navigate(item.key)}>
							<Ionicons name={item.img} size={36} color={'#323232'}style={{marginRight: 15}}/>
							<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '85%'}}>
								<Text style={styles.moretext}>{I18n.t('settings.' + item.key)}</Text>
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
							title:I18n.t("more.More"),
							headerTitleStyle:styles.headerTitle,
							headerBackground: ()=>background,
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="announce" 
						component={Announcements}
						options={{
							title:I18n.t("more.Announcements"),
							headerTitleStyle:[styles.headerTitle],
							headerBackground: ()=>background,
							headerTitleAlign: 'center',
							headerBackTitleVisible:false,
							headerTintColor: 'black'
						}}
					/>
					<Stack.Screen 
						name="resources" 
						component={Resources}
						options={{
							title:I18n.t("more.Resources"),
							headerTitleStyle:styles.headerTitle,
							//headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center',
							headerBackTitleVisible:false,
							headerTintColor: 'black'
						}}
					/>
					<Stack.Screen 
						name="studentweek" 
						component={StudentWeek}
						options={{
							title:I18n.t("more.SOTW"),
							headerTitleStyle:styles.headerTitle,
							//headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center',
							headerBackTitleVisible:false,
							headerTintColor: 'black'
						}}
					/>
					<Stack.Screen 
						name="lunchevent" 
						component={LunchEvents}
						options={{
							title:I18n.t("more.lunch"),
							headerTitleStyle:styles.headerTitle,
							//headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center',
							headerBackTitleVisible:false,
							headerTintColor: 'black'
						}}
					/>
					<Stack.Screen 
						name="sslopps" 
						component={SSLOps}
						options={{
							title:I18n.t("more.ssl"),
							headerTitleStyle:styles.headerTitle,
							//headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center',
							headerBackTitleVisible:false,
							headerTintColor: 'black'
						}}
					/>
					<Stack.Screen 
						name="challengeweek" 
						component={ChallengeWeek}
						options={{
							title:I18n.t("more.COTW"),
							headerTitleStyle:styles.headerTitle,
							//headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center',
							headerBackTitleVisible:false,
							headerTintColor: 'black'
						}}
					/>
					<Stack.Screen 
						name="polls" 
						component={Poll}
						options={{
							title:I18n.t("more.Polls"),
							headerTitleStyle:styles.headerTitle,
							//headerLeft:null,
							headerBackground: ()=>background,
							headerTitleAlign: 'center',
							headerBackTitleVisible:false,
							headerTintColor: 'black'
						}}
					/>
					<Stack.Screen 
						name="settings" 
						component={SettingSwitch}
						options={{
							title:I18n.t("more.Settings"),
							headerTitleStyle:[styles.headerTitle],
							//headerLeft:null,
							headerBackground: ()=>background,
							headerBackTitleVisible:false,
							headerTintColor: 'black',
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="language" 
						component={Language}
						options={{
							title:I18n.t("settings.language"),
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerBackground: ()=>background,
							//headerLeft: null,
							headerBackTitleVisible:false,
							headerTintColor: 'black',
							headerTitleAlign: 'center'
						}}
					/>
					<Stack.Screen 
						name="TeacherList" 
						component={TeacherList}
						options={({route})=>({
							headerTitleStyle:[styles.headerTitle],
							title:route.params.name,
							headerRight:()=>(<></>),
							headerBackground: ()=>background,
							headerBackTitleVisible:false,
							headerTintColor: 'black',
							headerTitleAlign: 'center'
							//headerLeft: null,
						})}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}

export default More;