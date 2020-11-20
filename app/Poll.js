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