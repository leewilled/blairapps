import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import I18n from './i18n';
import { url } from './resources/fetchInfo.json'
import LinearGradient from 'react-native-linear-gradient';

class StudentWeek extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			hobbyExpanded: false,
			achievementExpanded: false,
			messageExpanded: false,
			hobbyArrow:require('./assets/expand.png'),
			achievementArrow:require('./assets/expand.png'),
			messageArrow:require('./assets/expand.png')
		}
	}

	clickHobby() {
		if (!this.state.hobbyExpanded) this.setState({hobbyExpanded:true, hobbyArrow: require('./assets/collapse.png')});
		else this.setState({hobbyExpanded: false,hobbyArrow:require('./assets/expand.png')});
	}
	clickAchievements() {
		if (!this.state.achievementExpanded) this.setState({achievementExpanded:true, achievementArrow: require('./assets/collapse.png')});
		else this.setState({achievementExpanded: false, achievementArrow:require('./assets/expand.png')});
	}
	clickMessages() {
		if (!this.state.messageExpanded) this.setState({messageExpanded:true, messageArrow: require('./assets/collapse.png')});
		else this.setState({messageExpanded: false, messageArrow:require('./assets/expand.png')});
	}
	
	
	componentDidMount() {
		fetch(`${url}/api/`+String(I18n.locale).split('-')[0]+`/student`,{
		  headers: {
			'Cache-Control': 'no-cache'
		  }}
		).then((response) => {
			return response.text();
		}).then((json) => {
			const data = JSON.parse(json)
			data.sort((a,b)=>a.id-b.id)
			this.setState({data: data,isLoading:false});
			console.log(this.state.data)
		}).catch((error) => console.error(error))
	}
	
	render() {
		if (this.state.isLoading) {
			return <View/>
		} else {
			console.log(this.state.data[this.state.data.length-1].image)
			const iconURI = this.state.data[this.state.data.length-1].image !== undefined?`data:image/png;charset=utf-8;base64,${this.state.data[this.state.data.length-1].image}`:'';
			const hobbyText = (<Text style = {{marginLeft: 50, paddingHorizontal: '2%', paddingBottom: '2%'}}>{this.state.data[this.state.data.length-1].hobbies}</Text>)
			const achievementText = (<Text style = {{marginLeft: 50, paddingHorizontal: '2%', paddingBottom: '2%'}}>{this.state.data[this.state.data.length-1].achievements}</Text>)
			const messageText = (<Text style = {{marginLeft: 50, paddingHorizontal: '2%', paddingBottom: '2%'}}>{this.state.data[this.state.data.length-1].messages}</Text>)
			return (
				<ScrollView style={{paddingTop:'5%',paddingHorizontal:'10%', backgroundColor: 'white', height: '100%'}}>
					<View style={{backgroundColor: 'white',borderRadius: 150, height: 300, width: 300, alignSelf: 'center', shadowColor: 'red', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 7}}>
						<Image style={{resizeMode: 'cover',borderRadius: 150, height: 300, width: 300, alignSelf: 'center'}} source = {{iconURI}} /> 
					</View>
					<Text style={{fontSize:28,marginTop:'5%',textAlign:'center'}}>{this.state.data[this.state.data.length-1].name}</Text>
					<Text style={{fontSize:20,textAlign:'center', fontWeight: '200'}}>{I18n.t('student.Grade')} {this.state.data[this.state.data.length-1].grade}</Text>
					<View>
						<View style={{display: 'flex', padding:'2%', borderRadius: 8, marginTop:'5%'}}>
							<TouchableOpacity onPress = {this.clickHobby.bind(this)}>
								<View style={{display:'flex', flexDirection: 'row'}}>
									<Image source = {require('./assets/hobbies.png')} />
									<View style = {{display: 'flex', flexDirection: 'row', width: '85%', justifyContent: 'space-between', paddingHorizontal:'2%',}}>
										<Text style={{fontSize: 20,  alignSelf: 'center'}}>{I18n.t('student.Hobbies')}</Text>
										{this.state.hobbyExpanded?<LinearGradient start={{x: 0, y: 0.25}} end={{x: .5, y: 1}} colors={['red', '#FF7373']} style={{borderRadius: 24, alignSelf: 'center'}}><Image source = {require('./assets/collapse.png')} style={{tintColor: 'white'}}/></LinearGradient>:<Image source = {require('./assets/expand.png')} style={{tintColor: '#b2b2b2', alignSelf: 'center'}}/>}
									</View>
								</View>
								{this.state.hobbyExpanded?hobbyText:<></>}
							</TouchableOpacity>
							<TouchableOpacity onPress = {this.clickAchievements.bind(this)}>
								<View style={{display: 'flex', borderTopWidth: 1, borderTopColor: '#8D8D8D', shadowColor: 'black', flexDirection: 'row'}}>
									<Image source = {require('./assets/achievements.png')} />
									<View style = {{display: 'flex', flexDirection: 'row', width: '85%', justifyContent: 'space-between', paddingHorizontal:'2%',}}>
										<Text style={{fontSize: 20, alignSelf: 'center'}}>{I18n.t('student.Achievements')}</Text>
										{this.state.achievementExpanded?<LinearGradient start={{x: 0, y: 0.25}} end={{x: .5, y: 1}} colors={['red', '#FF7373']} style={{borderRadius: 24, alignSelf: 'center'}}><Image source = {require('./assets/collapse.png')} style={{tintColor: 'white'}}/></LinearGradient>:<Image source = {require('./assets/expand.png')} style={{tintColor: '#b2b2b2', alignSelf: 'center'}}/>}
									</View>
								</View>
								{this.state.achievementExpanded?achievementText:<></>}
							</TouchableOpacity>
							<TouchableOpacity onPress = {this.clickMessages.bind(this)}>
								<View style={{display: 'flex', borderTopWidth: 1, borderTopColor: '#8D8D8D', shadowColor: 'black', flexDirection: 'row'}}>
									<Image source = {require('./assets/message.png')} />
									<View style = {{display: 'flex', flexDirection: 'row', width: '85%', justifyContent: 'space-between', paddingHorizontal:'2%',}}>
										<Text style={{fontSize: 20, alignSelf: 'center'}}>{I18n.t('student.Messages')}</Text>
										{this.state.messageExpanded?<LinearGradient start={{x: 0, y: 0.25}} end={{x: .5, y: 1}} colors={['red', '#FF7373']} style={{borderRadius: 24, alignSelf: 'center'}}><Image source = {require('./assets/collapse.png')} style={{tintColor: 'white'}}/></LinearGradient>:<Image source = {require('./assets/expand.png')} style={{tintColor: '#b2b2b2', alignSelf: 'center'}}/>}
									</View>
								</View>
								{this.state.messageExpanded?messageText:<></>}
							</TouchableOpacity>
						</View>
						
					</View>
					
				</ScrollView>
			)
		}
	}
}

export default StudentWeek;