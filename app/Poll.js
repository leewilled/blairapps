/*import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import { Linking } from 'react-native';
import { url } from './resources/fetchInfo.json'
//import I18n from './i18n';

class Poll extends React.Component {

  /*constructor(props) {
    super(props)
    this.state = {
        data: []
    }
}

componentDidMount() {
    fetch(`${url}/api/en/lunchEvents`,{
        headers: {
            'Cache-Control': 'no-cache'
        }
        }
    )
    .then((response) => {
        return response.text();
    })
    .then((json) => {
        this.setState({data: JSON.parse(json)});
    })
    .catch((error) => console.error(error))
}*/
/*
	render() {
		return (
      <View style = {{backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white', height: '100%', display: 'flex', alignItems: 'center'}}>
          <TouchableOpacity  onPress={()=>Linking.openURL("https://google.com")}>
            <Image source={require('./assets/polls.png')} style={{marginTop: 50, height: 300, width: 300, tintColor: 'red'}}/>
          </TouchableOpacity>
          <Text style ={{fontSize: 20, marginTop: 30}}>Take A Poll!</Text>
        </View>
      </View>
		)
	}
}

export default Poll;*/
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
import {WebView} from 'react-native-webview';
import I18n from 'i18n-js';

class Poll extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			data:[]
		}
	}
  componentDidMount() {
		fetch(`${url}/api/`+String(I18n.locale).split('-')[0]+`/polls`,{
		  headers: {
			'Cache-Control': 'no-cache'
		  }}
		).then((response) => {
			return response.text();
		}).then((json) => {
      const data = JSON.parse(json)
      data.sort((a,b)=>a.id-b.id)
			this.setState({data: data});
		}).catch((error) => console.error(error))
	}

	render() {
    if (this.state.isLoading) {
			return <View/>
		} else {
			if (this.state.data.length==0) {
				return (
          <View style={{alignItems:'center',paddingiorizontal:'10%', height: '100%', backgroundColor: 'white', justifyContent: 'center', padding: '2%'}}>
            <Text style={{fontSize: 32, fontWeight: 'bold', marginBottom: '10%', color: 'red', textAlign: 'center'}}>No Poll</Text>
          </View>
				)
			} else {
				return (
					<WebView
            source = {{uri: this.state.data[this.state.data.length-1].url}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            style={{marginTop: 0}}
            cacheEnabled={true}
          />
				)
			}
		}
	}
}

export default Poll;