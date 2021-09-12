import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking,
  Animated,
  TouchableOpacity,
  Image
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
import I18n from 'i18n-js';

class ChallengeWeek extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			flip: true,
			data:[]
		}
	}
	
	componentDidMount() {
		fetch(`${url}/api/`+String(I18n.locale).split('-')[0]+`/challenge`,{
		  headers: {
			'Cache-Control': 'no-cache'
		  }}
		).then((response) => {
			return response.text();
		}).then((json) => {
			const data = JSON.parse(json)
			data.sort((a,b)=>a.id-b.id)
			this.setState({data: data,isLoading:false});
		}).catch((error) => console.error(error))
	}
	
	render() {
		if (this.state.isLoading) {
			return <View/>
		} else {
			if (this.state.data[this.state.data.length-1]==undefined) {	
				return (
					<View style={{alignItems:'center',paddingiorizontal:'10%', height: '100%', backgroundColor: 'white', justifyContent: 'center', padding: '2%'}}>
						<Text style={{fontSize: 32, fontWeight: 'bold', marginBottom: '10%', color: 'red', textAlign: 'center'}}>No challenge</Text>
					</View>
				)
			} else {
				return (
					<View style={{alignItems:'center',paddingiorizontal:'10%', height: '100%', backgroundColor: 'white', justifyContent: 'center', padding: '2%'}}>
						<Text style={{fontSize: 32, fontWeight: 'bold', marginBottom: '10%', color: 'red', textAlign: 'center'}}>{this.state.data[this.state.data.length-1].title}</Text>
						<Text style={{textAlign:'center', fontSize: 24, marginBottom: '5%', textAlign: 'center', fontWeight: '200'}}>{this.state.data[this.state.data.length-1].text}</Text>
						<Text style={{textAlign:'center', fontSize: 20, textDecorationLine: 'underline', textDecorationStyle: "solid", textDecorationColor: "#000"}} onPress={() => Linking.openURL(this.state.data[this.state.data.length-1].link)}>{I18n.t("challenge.link")}</Text>
					</View>
				)
			}
		}
	}
}

export default ChallengeWeek;