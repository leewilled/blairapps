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

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import I18n from './i18n';
import Language from './Language'

const Stack = createStackNavigator()

class SettingSwitch extends React.Component {
	constructor(props) {
		super(props)
		this.props = props
	}
	
	render() {
		return (
			<View style={{flex:1,backgroundColor:'red'}}>
				<FlatList
					data={[
						{name:"Language",key:"language"},
					]}
					renderItem={({item})=>
						<TouchableOpacity style={styles.moreitem} onPress={()=>this.props.navigation.navigate(item.key)}>
							<Text style={styles.moretext}>{I18n.t('settings.' + item.key)}</Text>
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

class Settings extends React.Component {
	render() {
		return (
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen 
						name="Chooser" 
						component={SettingSwitch}
						options={{
							title:'Settingss',
							headerTitleStyle:styles.headerTitle,
							headerBackground: ()=>background
						}}
					/>
					<Stack.Screen 
						name="language" 
						component={Language}
						options={{
							title:'Language',
							headerTitleStyle:[styles.headerTitle,{alignSelf:'center'}],
							headerLeft:null,
							headerBackground: ()=>background
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}

export default Settings;