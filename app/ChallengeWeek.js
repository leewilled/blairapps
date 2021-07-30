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

class ChallengeWeek extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			flip: true
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

		this.animatedValue=new Animated.Value(0);
		this.value=0;
		this.animatedValue.addListener(({value}) => {
			this.value=value;
		})
		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange:[0,180],
			outputRange:['0deg', '180deg'],
		})
		this.backInterpolate = this.animatedValue.interpolate({
			inputRange:[0,180],
			outputRange: ['180deg','360deg']
		})
	}

	flipCard() {
		if (this.value >= 90) {
			Animated.spring(this.animatedValue, {
				toValue:0,
				friction:8,
				tension: 10
			}).start();
		}
		else {
			Animated.spring(this.animatedValue, {
				toValue:180,
				friction: 8,
				tension: 10
			}).start();
		}
		this.setState({flip:!this.state.flip})
	}
	
	render() {
		const frontAnimatedStyle = {
			transform: [
				{rotateY:this.frontInterpolate}
			]
		}
		const backAnimatedStyle = {
			transform: [
				{rotateY:this.backInterpolate}
			]
		}
		var styling={}
		var styling2={}
		if (this.state.flip) {
			styling=({height: '100%', width: '100%', backgroundColor: 'white', borderRadius: 20, textAlign: 'center', display: 'flex', alignContent: 'center', padding: '5%', paddingTop: '15%', borderColor: 'red', borderWidth: 1})
			styling2=({display:'none'})
		}
		else {
			styling=({display:'none'})
			styling2=({height: '100%', width: '100%', backgroundColor: 'white', borderRadius: 20, textAlign: 'center', display: 'flex', alignContent: 'center', padding: '5%', paddingTop: '15%', borderColor: 'red', borderWidth: 1})
		}
		
		if (this.state.isLoading) {
			return <View/>
		} else {
			return (
				<View style={{alignItems:'center',paddingiorizontal:'10%', height: '100%', backgroundColor: 'white', justifyContent: 'center'}}>
					<TouchableOpacity onPress={()=>this.flipCard()} style={{height: '70%', width: '80%', borderRadius: 20, shadowColor: 'red', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 7, alignSelf: 'center'}}>
						<Animated.View style={{backfaceVisibility: 'hidden'}, frontAnimatedStyle}>
							<View style={styling}>
								<View>{this.state.flip?<Text style={{textAlign: 'center', fontSize: 28}}>{this.state.data.title}</Text>:<></>}</View>
								<Image source={require('./assets/blair_logo.png')} style = {{height: 200, width: 200, alignSelf: 'center', position: 'absolute', bottom: '20%'}}/>
								<Image source={require('./assets/arrow_right.png')} style = {{alignSelf: 'center', position: 'absolute', bottom: '5%'}}/>
							</View>
						</Animated.View>
						<Animated.View style={backAnimatedStyle}>
							<View style={styling2}>
								{!this.state.flip?<Text style={{textAlign: 'center', fontSize: 28}}>{this.state.data.text}</Text>:<></>}
								<Text style={{textAlign:'center', fontSize: 20, textDecorationLine: 'underline', textDecorationStyle: "solid", textDecorationColor: "#000",}} onPress={() => Linking.openURL(this.state.data.link)}>{'\n'}Link</Text>
							</View>
							
						</Animated.View>
					</TouchableOpacity>
					
				</View>
			)
		}
	}
}

export default ChallengeWeek;