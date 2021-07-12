/*import React, {useState} from 'react';
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

import LinearGradient from 'react-native-linear-gradient';
//import I18n from './i18n';
import styles from './styles/liststyles'
import { url } from './resources/fetchInfo.json'

const getCurrentDate=()=>{
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return year + ',' + month + ',' + date;
}
const getWeekDate=()=>{
  var date = new Date().getDate()-8;
  var month = new Date().getMonth()+1;
  var year = new Date().getFullYear();

  return year + ',' + month + ',' + date;
}

const Event = ({item}) => {
	const [visible, setVisible] = useState(false)
  const today = new Date(getCurrentDate())
  const itemDate = new Date(item.item.date)
  const week = new Date(getWeekDate())
	const extra = (
		<>
			<Text style={{fontSize:20, paddingHorizontal: '1%'}}>{item.item.text}</Text>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: '10%', display: 'flex', justifyContent: 'center'}}>
          <Image source={require('./assets/location.png')} style={{height: 22, width: 22}}/>
        </View>
        <View style={{width: '90%'}}>
          <Text style={{fontSize:20}}>{item.item.location}</Text>
        </View>
        
      </View>
			
		</>
  )

  if (itemDate.getTime() >= today.getTime()) {
    return (
      <TouchableOpacity style={styles.item1} onPress={()=>setVisible(!visible)} activeOpacity={0.8}>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center', width: '60%'}}>
          <Image source ={require('./assets/calendar.png')}  style = {{height: 40, width: 40, marginRight: 15}}/>
          <Text style={styles.title3}>{item.item.title}</Text>
        </View>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
          <Text style = {{fontSize: 16, alignSelf: 'center'}}>{item.item.date}</Text>
        </View>
      </View>
        {visible?extra:<></>}
		  </TouchableOpacity>
    )
  }
  else if (itemDate.getTime() >= week.getTime()){
    return (
		<TouchableOpacity style={{backgroundColor: '#e3e3e3', padding: 15, borderBottomWidth: 1, borderColor: 'black', width: '100%',}} onPress={()=>setVisible(!visible)} activeOpacity={0.8}>
			<View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center', width: '60%'}}>
          <Image source ={require('./assets/calendar.png')}  style = {{height: 40, width: 40, marginRight: 15}}/>
          <Text style={styles.title3}>{item.item.title}</Text>
        </View>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
          <Text style = {{fontSize: 16, alignSelf: 'center'}}>{item.item.date}</Text>
        </View>
      </View>
			{visible?extra:<></>}
		</TouchableOpacity>
	  )
  }
  else {
    return (
      null
    )
  }
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
		return (
			<View>
        <View style = {{height: 90, display: 'flex'}}>
          <LinearGradient
            colors={['#f99', 'white']}
            style = {{height: '100%', borderBottomColor:'black', borderBottomWidth:0.5, display: 'flex', justifyContent: 'flex-end', paddingBottom: '2.5%'}}
          >
            <Text style = {{fontSize: 24, fontWeight: 'bold', alignSelf: 'center'}}>Calendar Events</Text>
          </LinearGradient>
         
        </View>
				<FlatList
					data={this.state.data}
					renderItem={item=><Event item={item}/>}
					keyExtractor={item=>JSON.stringify(item)}
				/>
			</View>
		)
  }
}

export default Calendar;*/

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

import LinearGradient from 'react-native-linear-gradient';
import I18n from './i18n';
import styles from './styles/liststyles'
import { url } from './resources/fetchInfo.json'

const getCurrentDate=()=>{
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return year + '-' + month + '-' + date;
}

const Event = ({item}) => {
	const [visible, setVisible] = useState(false)
  const date = item.item.date.split('-')
  const today = new Date(getCurrentDate())
  const week = new Date().setDate(new Date().getDate() - 8)
  const itemDate = new Date(item.item.date)

	const extra = (
		<>
			<Text style={{fontSize:20}}>{item.item.text}</Text>
			<Text style={{fontSize:20}}>Location: {item.item.location}</Text>
		</>
  )
  if (itemDate >= today) {
    
    return (
      <TouchableOpacity style={styles.item1} onPress={()=>setVisible(!visible)} activeOpacity={0.8}>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center', width: '60%'}}>
          <Image source ={require('./assets/calendar.png')}  style = {{height: 40, width: 40, marginRight: 15}}/>
          <Text style={styles.title3}>{item.item.title}</Text>
        </View>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
          <Text style = {{fontSize: 16, alignSelf: 'center'}}>{`${date[1]}/${date[2]}/${date[0]}`}</Text>
        </View>
      </View>
        {visible?extra:<></>}
		  </TouchableOpacity>
    )
  }
  else if (itemDate >= week){
    return (
		<TouchableOpacity style={{backgroundColor: '#e3e3e3', padding: 15, borderBottomWidth: 1, borderColor: 'black', width: '100%',}} onPress={()=>setVisible(!visible)} activeOpacity={0.8}>
			<View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center', width: '60%'}}>
          <Image source ={require('./assets/calendar.png')}  style = {{height: 40, width: 40, marginRight: 15}}/>
          <Text style={styles.title3}>{item.item.title}</Text>
        </View>
        <View style = {{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
          <Text style = {{fontSize: 16, alignSelf: 'center'}}>{`${date[1]}/${date[2]}/${date[0]}`}</Text>
        </View>
      </View>
			{visible?extra:<></>}
		</TouchableOpacity>
	  )
  }
  else {
    return (
      null
    )
  }
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
		return (
			<View>
        <View style = {{height: global.headerHeight, display: 'flex'}}>
          <LinearGradient
            colors={['#f99', 'white']}
            style = {{height: '100%', borderBottomColor:'black', borderBottomWidth:0.5, display: 'flex', justifyContent: 'flex-end', paddingBottom: '2.5%'}}
          >
            <Text style = {{fontSize: 24, fontWeight: 'bold', alignSelf: 'center'}}>{I18n.t('calendar.calendarEvents')}</Text>
          </LinearGradient>
         
        </View>
				<FlatList
					data={this.state.data}
					renderItem={item=><Event item={item}/>}
					keyExtractor={item=>JSON.stringify(item)}
				/>
			</View>
		)
  }
}

export default Calendar;