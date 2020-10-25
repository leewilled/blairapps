import React, { useState } from 'react';
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
import styles from './styles/liststyles';
import { url } from './resources/fetchInfo.json';

const Stack = createStackNavigator();

export const SSLInfo = ({route}) => {
	const item = route.params;
	console
	return (
		<View style = {{padding: 10}}>
			<Text style = {styles.eventTitle}>{item.name}</Text>
			<View style ={styles.infoContainer}>
				<Text style = {styles.title1}>Description: </Text>
				<Text style = {styles.title}>{item.text}</Text>
			</View>
			<View style ={styles.infoContainer}>
				<Text style = {styles.title1}>Who: </Text>
				<Text style = {styles.title}>{item.teacher}</Text>
			</View>
					<View style ={styles.infoContainer}>
				<Text style = {styles.title1}>Where: </Text>
					<Text style = {styles.title}>{item.loc}</Text>
			</View>
		</View>
	)
  }

function SSLElement (props) {
	const item = props.item;
	return(
		<View>
			<TouchableOpacity style={styles.item1} onPress={()=>props.navigation.navigate('SSLInfo', {data: props.data, name: item.item.title, text: item.item.text, loc:item.item.loc, teacher: item.item.teacher})} activeOpacity={0.8}>
				<View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
					<Image source = {require('./assets/sslopps.png')} style = {{height: 40, width: 40, marginRight: 10}}/>
					<Text style={styles.title}>{item.item.title}</Text>
				</View>
			</TouchableOpacity>
		</View>
    )
}
function SSLOpp () {
	return (
	  <NavigationContainer independent={true}>
		<Stack.Navigator>
		  <Stack.Screen 
			name = "SSLOps"
			component = {SSLOps}
			options={({
			  headerShown: false
			})}
		  />
		  <Stack.Screen 
			name = "SSLInfo"
			component = {SSLInfo}
			options={({route})=>({
			  title:route.params.title
			})}
		  />
		</Stack.Navigator>
	  </NavigationContainer>
	) 
  }

class SSLOps extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	
	componentDidMount() {
		fetch(`${url}/api/en/sslOps`,{
			headers: {
				'Cache-Control': 'no-cache'
			}
			}
		)
		.then((response) => {
			return response.text();
		})
		.then((json) => {
			this.setState({data: JSON.parse(json).ops});
		})
		.catch((error) => console.error(error))
	}
	
	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.data}
					renderItem={item=><SSLElement item={item} name={item.title} navigation={this.props.navigation}/>}
					keyExtractor={item=>JSON.stringify(item)}
				/>
			</View>
		)
	}
}

export default SSLOpp;