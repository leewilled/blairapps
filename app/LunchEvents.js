import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import styles from './styles/liststyles'
import { url } from './resources/fetchInfo.json'
const Stack = createStackNavigator();

export const LunchInfo = ({route}) => {
    const item = route.params;
    return (
      <View style = {{padding: 10, backgroundColor: 'white', height: '100%'}}>
        <View style ={styles.infoContainer}>
            <Text style = {styles.title1}>Description: </Text>
            <Text style = {styles.title}>{item.text}</Text>
        </View>
        <View style ={styles.infoContainer}>
            <Text style = {styles.title1}>Location: </Text>
            <Text style = {styles.title}>{item.loc}</Text>
        </View>
      </View>
    )
}

function LunchEvent (props) {
    const item = props.item
    return(
        <View>
            <TouchableOpacity style={styles.item1} onPress={()=>props.navigation.navigate('LunchInfo', {data:props.data,name:item.title,text:item.text,loc:item.loc})} activeOpacity={0.8}>
            <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image source = {require('./assets/lunch.png')} style = {{height: 40, width: 40, marginRight: 10}}/>
                <Text style={styles.title3}>{item.title}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

class LunchEvents extends React.Component {
    
    constructor(props) {
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
    }
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => <LunchEvent item={item} name={this.props.title} navigation={this.props.navigation}/>}
                    keyExtractor={item=>JSON.stringify(item)}
                />
            </View>
        )
    }
}

export default LunchEvents;

