import React, {useState} from 'react';
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
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import styles from './styles/liststyles'
import { url } from './resources/fetchInfo.json'
import morestyles from './styles/morestyles'

const Stack = createStackNavigator();

const getCurrentDate=()=>{
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return new Date(year, month, date);
}
export const EventInfo = ({route}) => {
  const item = route.params;
  const itemDate = new Date(item.date)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December',]
  const dayOfWeek = days[itemDate.getDay()]
  const month = months[itemDate.getMonth()]
  const date = itemDate.getDate()
  
  return (
    <View style = {{backgroundColor: 'white', flex:1}}>
      <View style={{padding: '5%'}}>
        <View style={{marginBottom: '7%'}}>
          <Text style={[styles.title, {fontWeight: 'bold', marginBottom: '2%'}]}>Info</Text>
          <Text style={[styles.title, {fontWeight: '200'}]}>{item.text}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: '5%'}}>
          <Ionicons name='location-outline' size={28} color={'#323232'}style={{marginRight: 15, alignSelf: 'center'}}/>
          <View style={{display: 'flex'}}>
            <Text style={{fontSize: 16}}>Location</Text>
            <Text style={[styles.title, {fontSize: 16, fontWeight: '200'}]}>{item.location}</Text>
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: '5%'}}>
          <Ionicons name='time-outline' size={28} color={'#323232'}style={{marginRight: 15, alignSelf: 'center'}}/>
          <View style={{display: 'flex'}}>
            <Text style={{fontSize: 16}}>Date</Text>
            <Text style={[styles.title, {fontSize: 16, fontWeight: '200'}]}>{dayOfWeek}, {month} {date}</Text>
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Ionicons name='person-circle-outline' size={28} color={'#323232'}style={{marginRight: 15, alignSelf: 'center'}}/>
          <View style={{display: 'flex'}}>
            <Text style={{fontSize: 16}}>Organizer</Text>
            <Text style={[styles.title, {fontSize: 16, fontWeight: '200'}]}>{item.name}</Text>
            <Text style={[styles.title, {fontSize: 16, fontWeight: '200', textDecorationLine: 'underline'}]}>{item.emails}</Text>
          </View>
        </View>
      </View>
      
      
    </View>
  )
}
const Event = (props) => {
  const item = props.item
  const date = item.item.date.split('-')

  return (
    <View>
      <TouchableOpacity style={[styles.listItem, {padding: '2%'}]} onPress={()=>props.navigation.navigate('EventInfo', {data:props.data,name:props.name, title: item.item.title,text:item.item.text,location:item.item.location,date:item.item.date, name:item.item.name, emails: item.item.emails})} activeOpacity={0.8}>
        <View style = {[styles.container2, {justifyContent: 'space-between'}]}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Ionicons name='calendar' size={32} color={'#323232'} style={{marginRight: 15}}/>
            <View style = {{display: 'flex', alignContent: 'center', width: '80%'}}>
              <Text style={styles.title}>{item.item.title}</Text>
              <View style={{paddingBottom: '2%'}}><Text style = {{fontSize: 12, fontWeight: '200'}}>{`${date[1]}/${date[2]}/${date[0]}`}</Text></View>
            </View>
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

function CalendarEvents () {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name = "Calendar"
          component = {Calendar}
          options={({
            headerShown: true,
            headerTitleStyle:morestyles.headerTitle,
            headerBackground: ()=>background,
            headerleft: null,
            headerTitleAlign: 'center'
          })}
        />
        
        <Stack.Screen 
          name = "EventInfo"
          component = {EventInfo}
          options={({route})=>({
            title:route.params.title,
            headerTitleStyle:morestyles.headerTitle,
            headerBackground: ()=>background,
            headerleft: null,
            headerTitleAlign: 'center'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) 
}

class Calendar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
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
		fetch(`${url}/api/en/events`,{
		  headers: {
			'Cache-Control': 'no-cache'
		  } })
		  .then((response) => {
			return response.text();
		  })
		  .then((json) => {
			const data = JSON.parse(json).data
      data.sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime())
      console.log(data);
			this.setState({data: data});
		  })
		  .catch((error) => console.error(error))
	}

	render() {
    const todayDate = getCurrentDate()
    const weekPastDate = new Date();
    var pastDate = weekPastDate.getDate() - 7;
    weekPastDate.setDate(pastDate);
    const weekFutureDate = new Date();
    var futureDate = weekFutureDate.getDate() + 7;
    weekFutureDate.setDate(futureDate);
    const today = []
    const past = []
    const future = []
    var todayBoolean = true
    var pastBoolean = true
    var futureBoolean = true
    
    for (var i =0; i < this.state.data.length; i++) {
      const itemDate = new Date(this.state.data[i].date)
      if (itemDate == todayDate) {
        today.push(this.state.data[i])
      }
      else if (itemDate > todayDate && itemDate <= weekFutureDate) {
        future.push(this.state.data[i])
      }
      //else if (itemDate >= weekPastDate && itemDate < todayDate) {
      else if (itemDate < todayDate) {
        past.push(this.state.data[i])
      }
    }
    if (today.length === 0) todayBoolean = false
    if (past.length === 0) pastBoolean = false
    if (future.length === 0) futureBoolean = false
    var noAnn = (todayBoolean||pastBoolean||futureBoolean)
		return (
			<ScrollView style={{flex:1, backgroundColor: 'white'}}>
        {todayBoolean?<View>
          <LinearGradient start={{x: 0.25, y: .5}} end={{x: 1, y: 1}} colors={['#FF8484', '#FF1111']} style={{backgroundColor: 'red', width: '20%', padding: '2%', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginVertical: '2%'}}>
            <Text style={[styles.title, {color: 'white', fontWeight: 'bold'}]}>Today</Text>
          </LinearGradient>
          <FlatList
            data={today}
            renderItem={item=><Event item={item} name={item.name} navigation={this.props.navigation}/>} 
            keyExtractor={item=>JSON.stringify(item)}
          />
        </View>: <></>}
        {pastBoolean?<View>
          <LinearGradient start={{x: 0.25, y: .5}} end={{x: 1, y: 1}} colors={['#FF8484', '#FF1111']} style={{backgroundColor: 'red', width: '20%', padding: '2%', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginVertical: '2%'}}>
            <Text style={[styles.title, {color: 'white', fontWeight: 'bold'}]}>Past</Text>
          </LinearGradient>
          <FlatList
            data={past}
            renderItem={item=><Event item={item} name={item.name} navigation={this.props.navigation}/>} 
            keyExtractor={item=>JSON.stringify(item)}
          />
        </View>:<></>}
        {futureBoolean?<View>
          <LinearGradient start={{x: 0.25, y: .5}} end={{x: 1, y: 1}} colors={['#FF8484', '#FF1111']} style={{backgroundColor: 'red', width: '20%', padding: '2%', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginVertical: '2%'}}>
            <Text style={[styles.title, {color: 'white', fontWeight: 'bold'}]}>Future</Text>
          </LinearGradient>
          <FlatList
            data={future}
            renderItem={item=><Event item={item} name={item.name} navigation={this.props.navigation}/>} 
            keyExtractor={item=>JSON.stringify(item)}
          />
        </View>:<></>}
        {!noAnn?<Text style={{textAlign: 'center', fontSize: 20, paddingTop: '2%'}}>No Events</Text>:<></>}
      </ScrollView>
		)
  }
}

export default CalendarEvents;