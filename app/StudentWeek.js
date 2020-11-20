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
		if (this.state.isLoading) {
			return <View/>
		} else {
			const iconURI = this.state.data.icon !== undefined?`data:image/png;charset=utf-8;base64,${this.state.data.icon}`:'';
			return (
				<View style={{paddingTop:'5%',paddingHorizontal:'10%', backgroundColor: 'white', height: '100%'}}>
					<View style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
						<View>
							<Text style={{fontSize:28,marginBottom:'10%',textAlign:'center'}}>{this.state.data.name}</Text>	
							<Text style={{fontSize:20}}>{'\t'}Grade {this.state.data.year}</Text>
						</View>
						<View style = {{height: 150, width: 150}}>
							<Image style = {{height: '100%', width:'100%', borderRadius: 6}}source={{iconURI}} />
						</View>
						
					</View>
					
					<View style = {{paddingTop:'10%', height: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
						<View>
							<Text style={{fontSize: 20, fontWeight: 'bold'}}>{"\n"}Hobbies</Text>
							<Text style={{fontSize: 20}}>{'\t'}{this.state.data.hobbies}</Text>
						</View>
						<View>
							<Text style={{fontSize: 20, fontWeight: 'bold'}}>{"\n"}Achievements </Text>
							<Text style={{fontSize: 20}}>{'\t'}{this.state.data.achievements}</Text>
						</View>
						<View>
							<Text style={{fontSize: 20, fontWeight: 'bold'}}>{"\n"}Message</Text>
							<Text style={{fontSize: 20}}>{'\t'}{this.state.data.messages}</Text>
						</View>
					</View>
					
				</View>
			)
		}
	}
}

export default StudentWeek;