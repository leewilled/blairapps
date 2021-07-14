import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  TouchableHighlight,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styles from './styles/morestyles'
import LinearGradient from 'react-native-linear-gradient'
import Images from './Images'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
//import I18n from './i18n';
//import Language from './Language'
//import Notifications from './Notifications'

const Stack = createStackNavigator()




class placeHoldingForNow extends React.Component{
	constructor(props) {
		super(props)
		this.props = props
	}
	render() {
		return (
			<View style={{flex:1,backgroundColor:'red'}}>
				<Text>
					Coming Soon...
				</Text>
			</View>
		)
	}
}
/*class SettingSwitch extends React.Component {
	constructor(props) {
		super(props)
		this.props = props
	}
	
	render() {
		return (
			<View style={{flex:1,backgroundColor:'red'}}>
				<FlatList
					data={[
						//{name:"Language",key:"language", img:Images.lang}
						//{name:"Notifications",key:"notifications", img:Images.notifs},
					]}
					renderItem={({item})=>
						<TouchableOpacity style={styles.moreitem} onPress={()=>this.props.navigation.navigate(item.key)}>
							<Image source = {item.img} style = {{height: 40, width: 40, marginRight: 10, tintColor: '#e3e3e3'}}/>
							<Text style={styles.moretext}>{I18n.t('settings.' + item.key)}</Text>
						</TouchableOpacity>
					}
				/>
			</View>
		)
	}
}
*/
const background = (<LinearGradient
                    colors={['#f99', 'white']}
                    style = {{flex:1,borderBottomColor:'black',borderBottomWidth:0.5}}
                    />)

class Settings extends React.Component {
	render() {
		return (
			<View style={{flex:1,backgroundColor:'red'}}>
				<Text>
					Coming Soon...
				</Text>
			</View>
			/*<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen 
						name="Chooser" 
						component={placeHoldingForNow}
						options={{
							title:'Settings',
							headerTitleStyle:styles.headerTitle,
							headerBackground: ()=>background
						}}
					/>
					{/*<Stack.Screen 
						name="language" 
						component={Language}
						options={{
							title:'Language',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background
						}}
					/>}*/
					/*{<Stack.Screen 
						name="notifications" 
						component={Notifications}
						options={{
							title:'Notifications',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background
						}}
					/>}
				</Stack.Navigator>
			</NavigationContainer>*/
		)
	}
}

export default Settings;