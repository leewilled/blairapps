import React from 'react';
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

	render() {
		return (
      <View style = {{backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white', height: '100%', display: 'flex', alignItems: 'center'}}>
          <TouchableOpacity  onPress={()=>Linking.openURL("https://google.com")}>
            <Image source={require('./assets/polls.png')} style={{marginTop: 50, height: 300, width: 300, tintColor: 'red'}}/>
          </TouchableOpacity>
          <Text style ={{fontSize: 20, marginTop: 30}}>Press the image to take the poll!</Text>
        </View>
      </View>
		)
	}
}

export default Poll;