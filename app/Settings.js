import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  TouchableHighlight,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from './styles/morestyles'


class Settings extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			data: [],
			isLoading:true
		}
	}
  
	render() {
		return (
      <View>

      </View>
		)
	}
}
export default Settings;