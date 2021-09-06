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
  Image,
  TouchableHighlight,
  Linking
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
import { SearchBar } from 'react-native-elements';
import styles from './styles/liststyles'
import morestyles from './styles/morestyles'
import { url } from './resources/fetchInfo.json'
import LinearGradient from 'react-native-linear-gradient';
import I18n from './i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export const ClubInfo = ({route}) => {
  const item = route.params;
  return (
    <ScrollView style = {{backgroundColor: 'white', flex:1, padding: '5%', paddingRight: '10%'}}>
      <View style={{display: 'flex', flexDirection: 'row', marginBottom: '5%'}}>
        <Ionicons name='location-outline' size={28} color={'#323232'}style={{marginRight: 15, alignSelf: 'center'}}/>
        <View style={{display: 'flex', marginLeft: -15, paddingHorizontal: '5%'}}>
          <Text style={{fontSize: 16}}>Meeting Location </Text>
          <Text style={[styles.title, styles.linktext, {fontSize: 16, fontWeight: '200'}]} onPress={() => Linking.openURL(item.link)}>{item.link}</Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', marginBottom: '5%'}}>
        <Ionicons name='time-outline' size={28} color={'#323232'}style={{marginRight: 15, alignSelf: 'center'}}/>
        <View style={{display: 'flex'}}>
          <Text style={{fontSize: 16}}>Meeting Date</Text>
          <Text style={[styles.title, {fontSize: 16, fontWeight: '200'}]}>{item.meeting}</Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Ionicons name='person-circle-outline' size={28} color={'#323232'}style={{marginRight: 15, alignSelf: 'center'}}/>
        <View style={{display: 'flex'}}>
          <Text style={{fontSize: 16}}>Sponsor</Text>
          <Text style={[styles.title, {fontSize: 16, fontWeight: '200'}]}>{item.sponsor}</Text>
        </View>
      </View>
    </ScrollView>
  )
}
function ClubElement (props) {
  const item = props.item;
  return(
	<View>
      <TouchableOpacity style={[styles.listItem]} onPress={()=>props.navigation.navigate('ClubInfo', {data:props.data,name:props.name,meeting:item.meeting,link:item.link,sponsor:item.sponsor})} activeOpacity={0.8}>
        <View style = {[styles.container2, {justifyContent: 'space-between'}]}>
          <View style={{display: 'flex', flexDirection: 'row'}}> 
            <Ionicons name = "ios-people-circle-outline" size={36} color={'#323232'} style={{marginRight: 15}} />
            <Text style={[styles.title, {alignSelf:'center'}]}>{props.item.name}</Text>
          </View>
          <Image source = {require('./assets/forward.png')} style={{tintColor: '#b2b2b2'}}/>
        </View>
      </TouchableOpacity>
	</View>
  )
}

const background = (<LinearGradient
  colors={['#f99', 'white']}
  style = {{flex:1,borderBottomColor:'black',borderBottomWidth:0.5}}
  />)

function Club () {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name = "Clubs"
          component = {Clubs}
          options={({
            headerShown: true,
            headerTitleStyle:morestyles.headerTitle,
            headerBackground: ()=>background,
            //headerleft: null,
            headerTitleAlign: 'center',
            headerBackTitleVisible:false,
            headerTintColor: 'black',
            title:I18n.t('app.clubs'),
          })}
        />
        <Stack.Screen 
          name = "ClubInfo"
          component = {ClubInfo}
          options={({route})=>({
            title:route.params.name,
            headerTitleStyle:[morestyles.headerTitle,{alignSelf:'center'}],
            headerBackground: ()=>background,
            headerBackTitleVisible:false,
            headerTintColor: 'black',
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) 
}

class Clubs extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataSearch:[],
      search:""
    };
  }

  componentDidMount() {
    this.getData()
	this.props.navigation.addListener(
			'focus',
			() => {
				this.getData()
			}
		);
  }
  
  getData() {
	  fetch(`${url}/api/en/clubs`,{
      headers: {
        'Cache-Control': 'no-cache'
      } })
      .then((response) => {
        return response.text();
      })
      .then((json) => {
        this.setState({data: JSON.parse(json).clubs,dataSearch:JSON.parse(json).clubs });
      })
      .catch((error) => console.error(error))
  }
  
  updateSearch = (search) => {
    this.setState({ search:search });
	const searchPool = search.startsWith(this.state.search)?this.state.dataSearch:this.state.data;
    const ds = searchPool.filter((thing)=>{return thing.name.toLowerCase().startsWith(search.toLowerCase())})
    this.setState({dataSearch: ds})
  };
  clearSearch  = (search)=>{
    const ds = this.state.data;
    this.setState({dataSearch:ds})
  }
  render() {
    const { data , dataSearch,search} = this.state;

    return (
      <SafeAreaView style={styles.moreDefault}>
        <SearchBar
        lightTheme
        placeholder={I18n.t('clubs.searchClubs')}
        onChangeText={this.updateSearch}
        onCancel={this.clearSearch}
        onClear={this.clearSearch}
        value={this.state.search}/>
      <FlatList
        data={dataSearch}
        renderItem={({item}) => <ClubElement item={item} name={item.name} navigation={this.props.navigation}/>}
        keyExtractor={item => JSON.stringify(item)}
      />
    </SafeAreaView>
    
    );
  }
}

export default Club;