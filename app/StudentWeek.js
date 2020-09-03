import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { url } from './resources/fetchInfo.json'

class StudentWeek extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true
		}
	}
	
	componentDidMount() {
		fetch(`${url}/api/en/student`,{
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
		console.log(this.state.data)
		if (this.state.isLoading) {
			return <View/>
		} else {
			return (
				<View style={{paddingTop:'5%',paddingLeft:'10%',paddingRight:'10%'}}>
					<Text style={{fontSize:32,marginBottom:'10%',textAlign:'center'}}>{this.state.data.name}</Text>
					<Image style = {{height: '50%', width:'100%'}}source={this.state.data.icon} />
					<View style = {{paddingTop:'5%'}}>
						<Text style={{fontSize: 20}}>Grade {this.state.data.year}</Text>
						<Text style={{fontSize: 20}}>{"\n"}Hobbies: {this.state.data.hobbies}</Text>
						<Text style={{fontSize: 20}}>{"\n"}Achievements: {this.state.data.achievements}</Text>
					</View>
					
				</View>
			)
		}
	}
}

export default StudentWeek;