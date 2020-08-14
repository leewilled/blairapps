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
				<View style={{alignItems:'center',paddingTop:'5%',paddingLeft:'10%',paddingRight:'10%'}}>
					<Text style={{fontSize:32,marginBottom:'10%',textAlign:'center'}}>{this.state.data.title}</Text>
					<Text style={{textAlign:'center'}}>{this.state.data.text}</Text>
				</View>
			)
		}
	}
}

export default ChallengeWeek;