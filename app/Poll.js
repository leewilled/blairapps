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
import {WebView} from 'react-native-webview';
class Poll extends React.Component {
	render() {
		return (
			<WebView
        source = {{uri: 'https://docs.google.com/forms/d/e/1FAIpQLSfR0XP2yo3TV3egz7aMok56wnP9kG4FQt2v3rHrrayf8uC7Vw/viewform?usp=sf_link'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={{marginTop: 20}}
        cacheEnabled={true}
        
      />
      
		)
	}
}

export default Poll;