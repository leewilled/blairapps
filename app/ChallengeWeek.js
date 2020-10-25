import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from './styles/liststyles';
import { url } from './resources/fetchInfo.json'

class ChallengeWeek extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true
		}
	}
	
	componentDidMount() {
		fetch(`${url}/api/en/challenge`,{
		  headers: {
			'Cache-Control': 'no-cache'
		  }}
		).then((response) => {
			return response.text();
		}).then((json) => {
			this.setState({data: JSON.parse(json),isLoading:false});
		}).catch((error) => console.error(error))
	}
	
	render() {
		if (this.state.isLoading) {
			return <View/>
		} else {
			return (
				<View style={{alignItems:'center',paddingTop:'5%',paddingiorizontal:'10%', height: '100%', backgroundColor: 'white'}}>
					<Text style={{fontSize: 32, fontWeight: 'bold', marginBottom: '10%', color: 'red'}}>{this.state.data.title}</Text>
					<Text style={{textAlign:'center', fontSize: 24, marginBottom: '5%'}}>{this.state.data.text}</Text>
					<Text style={{textAlign:'center', fontSize: 20, textDecorationLine: 'underline', textDecorationStyle: "solid", textDecorationColor: "#000",}} onPress={() => Linking.openURL(this.state.data.link)}>{this.state.data.link}</Text>
				</View>
			)
		}
	}
}

export default ChallengeWeek;