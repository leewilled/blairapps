import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator, 
  FlatList,
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
import { SearchBar } from 'react-native-elements';
import styles from './styles/morestyles';
import { url } from './resources/fetchInfo.json';
import LinearGradient from 'react-native-linear-gradient';

class OpenPage extends React.Component{
    render() {
        return (
            <View style = {styles.openPage}>
                <LinearGradient
                    colors={['red', 'white']}
                    style = {styles.linearGradient}
                >
                    <Image source = {require('./assets/blair_logo.png')} />
                    <Text style = {{fontSize: 52, fontWeight: 'bold'}}>MBHS</Text>
                </LinearGradient>
                
            </View>
        )
    }
    
}

export default OpenPage;