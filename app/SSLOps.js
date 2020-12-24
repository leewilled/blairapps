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
		<View style = {{padding: 10, backgroundColor: 'white', height: '100%'}}>
			<View style={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
				<View style={{width: '15%', display: 'flex', justifyContent: 'center'}}>
					<Image source={require('./assets/desc.png')} style={{height: 50, width: 50}}/>
				</View>
				<View style={{width: '85%'}}>
					<Text style = {styles.title}>{item.text}</Text>
				</View>
			</View>
			<View style={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
				<View  style={{width: '15%', display: 'flex', justifyContent: 'center'}}>
					<Image source={require('./assets/unknown.png')} style={{height: 50, width: 50}}/>
				</View>
				<View style={{width: '85%'}}>
					<Text style = {styles.title}>{item.teacher}</Text>
				</View>
			</View>
			<View style={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
				<View style={{width: '15%', display: 'flex', justifyContent: 'center'}}>
					<Image source={require('./assets/location.png')} style={{height: 50, width: 50}}/>
				</View>
				<View style={{width: '85%'}}>
					<Text style={{fontSize:20}}>{item.loc}</Text>
				</View>
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
					<Text style={styles.title3}>{item.item.title}</Text>
				</View>
			</TouchableOpacity>
		</View>
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

export default SSLOps;