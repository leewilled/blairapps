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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styles from './styles/liststyles'
import { url } from './resources/fetchInfo.json'
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import I18n from './i18n';

const STORAGE_KEY = "teacherAnnouncements"

const getCurrentDate=()=>{
	var date = new Date().getDate();
	var month = new Date().getMonth();
	var year = new Date().getFullYear();

	return new Date(year, month, date);
}

const Announcement = ({item}) => {
	const todayDate = getCurrentDate()
	const itemDate = new Date(item.item.date)
	const dateInfo = todayDate.getTime()===itemDate.getTime()&&item.item.time!==undefined?item.item.time:(item.item.date+", " + item.item.time)
	return (
		<View style={{borderWidth: 1, borderColor: '#323232', padding: '2%', marginHorizontal: '2%', marginBottom: '2%', borderRadius: 12}}>
			<View style = {{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
				<View style = {{width: '100%'}}>
					<Text style={styles.title}>{item.item.message}</Text>
				</View>
				{dateInfo!==undefined?<Text style={{fontSize: 12, fontWeight: '200'}}>{dateInfo}</Text>:<></>}
			</View>
		</View>
	)
}

function NewTeacherList(props) {
	return (
	  <View>
		<LinearGradient start={{x: 0.25, y: .5}} end={{x: 1, y: 1}} colors={['#FF8484', '#FF1111']} style={{backgroundColor: 'red', width: '20%', padding: '2%', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginVertical: '2%'}}>
		  <Text style={[styles.title, {color: 'white', fontWeight: 'bold'}]}>{I18n.t('dates.'+props.name)}</Text>
		</LinearGradient>
		<FlatList
		  data={props.list}
		  renderItem={item=><Announcement item={item}/>} 
		  keyExtractor={item=>JSON.stringify(item)}
		/>
	  </View>
	)
  }

export const TeacherList = ({route}) => {
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
	
	for (var i = 0; i < route.params.data.length; i++) {
		const itemDate = new Date(route.params.data[i].date)
		if (itemDate.getTime() == todayDate.getTime()) {
			today.push(route.params.data[i])
		}
		else if (itemDate.getTime() > todayDate.getTime() && itemDate.getTime() <= weekFutureDate.getTime()) {
			future.push(route.params.data[i])
		}
		//else if (itemDate >= weekPastDate && itemDate < todayDate) {
		else if (itemDate.getTime() < todayDate.getTime()) {
			past.push(route.params.data[i])
		}
	}
	if (today.length === 0) todayBoolean = false
	if (past.length === 0) pastBoolean = false
	if (future.length === 0) futureBoolean = false
	var noAnn = (todayBoolean||pastBoolean||futureBoolean)

	return (
		<ScrollView style={{flex:1, backgroundColor: 'white'}}>
			{todayBoolean?<NewTeacherList name = 'today' list = {today} />:<></>}
			{pastBoolean?<NewTeacherList name = 'past' list = {past} />:<></>}
			{futureBoolean?<NewTeacherList name = 'future' list = {future} />:<></>}
			{!noAnn?<Text style={{textAlign: 'center', fontSize: 20, paddingTop: '2%'}}>{I18n.t('announcements.noAnnouncements')}</Text>:<></>}
		</ScrollView>
	)
}

function TeacherButton(props) {
	const [color, setColor] = useState(props.color?props.color:'lightgrey')
	return (
		<View>
			<TouchableOpacity style={styles.listItem} onPress={()=>{props.navigation.navigate('TeacherList',{data:props.data,name:props.name})}} activeOpacity={0.8}>
				<View style={styles.container2}>
					<Ionicons name="megaphone-outline" size={36} color={'#323232'}style={{marginRight: 15}}/>
					<View style={styles.accordian}>
						<Text style={[styles.title, {alignSelf:'center'}]}>{props.name}</Text>
						{props.icon?<Icon name="pushpino" size={24} color={color} onPress={()=>{setColor(color=='red'?'lightgrey':'red');props.addFavorite(props.name)}}/>:<></>}
					</View>
				</View>
		  </TouchableOpacity>
		</View>
	)
}

class Announcements extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			teacherNames: [],
			favoriteNames: []
		}
	}
	
	addFavorite = (name) => {
		const favoriteNames = this.state.favoriteNames.slice().map(({name})=>name)
		const index = favoriteNames.indexOf(name)
		if (index < 0) {
			favoriteNames.push(name)
		}
		else {
			favoriteNames.splice(index,1)
		}
		favoriteNames.sort()
		this.setState({favoriteNames:favoriteNames.map(name=>({name:name}))})
		AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(favoriteNames)).catch(console.log).done()
	}
	
	componentDidMount() {
		this.getData()
		AsyncStorage.getItem(STORAGE_KEY)
			.then(value=>value==null?[]:JSON.parse(value).map(x=>({name:x})))
			.then(names=>this.setState({favoriteNames:names}))
			.catch(console.log)
			.done()
	}
	
	getData() {
		fetch(`${url}/api/en/announcements`,{
			headers: {
				'Cache-Control': 'no-cache'
			}
			}
		)
		.then((response) => {
			return response.text()
		})
		.then((txt) => {
			const data = JSON.parse(txt).data;
			const teacherNames = [...new Set(data.filter(x=>x.teacher!=null&&x.teacher.trim()!=='').map(x=>x.teacher))];
			teacherNames.sort()
			this.setState({data: data, teacherNames: teacherNames.map(x=>({name:x})),isLoading:false});
		})
		.catch((error) => console.error(error))
	}
	
	render() {
		return (
			<ScrollView style={styles.moreDefault}>
				<TeacherButton data={this.state.data.filter(x=>x.teacher==null||x.teacher.trim()==='')} name="No Teacher" navigation={this.props.navigation} />
				<FlatList
					data={this.state.favoriteNames.concat(this.state.teacherNames.filter(x=>this.state.favoriteNames.map(({name})=>name).indexOf(x.name) < 0))}
					renderItem={({item})=><TeacherButton color={this.state.favoriteNames.indexOf(item) >= 0?'red':'lightgrey'} item={item} data={this.state.data.filter(x=>x.teacher===item.name)} name={item.name} navigation={this.props.navigation} icon={true} addFavorite={this.addFavorite}/>}
					keyExtractor={(item,index)=>item.name+index}
				/>
			</ScrollView>
		)
	}
}

export default Announcements;