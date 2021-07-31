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
  Dimensions
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
import LinearGradient from 'react-native-linear-gradient';
const Stack = createStackNavigator();

export const LunchInfo = ({route}) => {
    const item = route.params;
    return (
      <View style = {{padding: 10, backgroundColor: 'white', height: '100%'}}>
        <View style={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
            <View style={{width: '15%', display: 'flex', justifyContent: 'center'}}>
                <Image source={require('./assets/desc.png')} style={{height: 50, width: 50}}/>
            </View>
            <View style={{width: '85%'}}>
                <Text style = {styles.title}>{item.text}</Text>
            </View>
        </View>
        <View style={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
            <View style={{width: '15%', display: 'flex', justifyContent: 'center'}}>
                <Image source={require('./assets/location.png')} style={{height: 50, width: 50}}/>
            </View>
            <View style={{width: '85%'}}>
                <Text style={{fontSize:20}}>{item.loc}</Text>
            </View>
        </View>
      </View>
    )
}

function LunchEvent (props) {
    const item = props.item
    const [expand, setExpand] = useState(false);
    return(
        <View>
            <TouchableOpacity style={styles.listItem} onPress={()=>setExpand(!expand)}>
                <View style={styles.container2}>
                    <Image source = {require('./assets/lunch.png')} style = {styles.sideImage}/>
                    <View style = {styles.accordian}>
                        <Text style={styles.title}>{item.title}</Text>
                        {expand?<LinearGradient start={{x: 0, y: 0.25}} end={{x: .5, y: 1}} colors={['red', '#FF7373']} style={{borderRadius: 24, alignSelf: 'center'}}><Image source = {require('./assets/collapse.png')} style={{tintColor: 'white'}}/></LinearGradient>:<Image source = {require('./assets/expand.png')} style={{tintColor: '#b2b2b2', alignSelf: 'center'}}/>}
                    </View>
                </View>
                {expand?<View style={{marginLeft: 50}}><Text style={styles.accordianHeader}>Information</Text><Text style={styles.accordianText}>{item.text}</Text><Text style={styles.accordianHeader}>{'\n'}Location</Text><Text style={[styles.accordianText, {paddingBottom: '4%'}]}>{item.loc}</Text></View>:<></>}
            </TouchableOpacity>
        </View>
    )
}
/*<TouchableOpacity style={styles2.moreitem} onPress={()=>props.navigation.navigate('LunchInfo', {data:props.data,name:item.title,text:item.text,loc:item.loc})} activeOpacity={0.8}>
    <Image source = {require('./assets/lunch.png')} style = {{height: 40, width: 40, marginRight: 10, tintColor: '#323232'}}/>
    <View style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '85%'}}>
        <Text style={{fontSize: 20}}>{item.title}</Text>
        <Image source = {require('./assets/expand.png')} style={{tintColor: '#b2b2b2'}}/>
    </View>
</TouchableOpacity>*/

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
            <ScrollView style={styles.moreDefault}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => <LunchEvent item={item} name={this.props.title} navigation={this.props.navigation}/>}
                    keyExtractor={item=>JSON.stringify(item)}
                />
            </ScrollView>
        )
    }
}

export default LunchEvents;

