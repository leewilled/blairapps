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
import AsyncStorage from '@react-native-community/async-storage'

const STORAGE_KEY = "teacherAnnouncements"

const Announcement = ({item}) => {
	const date = new Date
	const dateStr = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
	const dateInfo = dateStr===item.item.date&&item.item.time!==undefined?item.item.time:item.item.date;
	return (
		<View style={styles.item1}>
			{dateInfo!==undefined?<Text style={styles.date}>{dateInfo}</Text>:<></>}
			<Text style={{fontSize:20}}>{item.item.message}</Text>
		</View>
	)
}

export const TeacherList = ({route}) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={route.params.data}
				renderItem={item=><Announcement item={item}/>}
				keyExtractor={item=>JSON.stringify(item)}
			/>
		</View>
	)
}

function TeacherButton(props) {
	const [color, setColor] = useState(props.color?props.color:'lightgrey')
	return (
		<View style={[styles.item1,{flexDirection:'row'}]}>
		  <TouchableOpacity style={{flex:1}} onPress={()=>{props.navigation.navigate('TeacherList',{data:props.data,name:props.name})}} activeOpacity={0.8}>
			<Text style={styles.title}>{props.name}</Text>
		  </TouchableOpacity>
		  {props.icon?<Icon.Button color={color} name="star" size={30} style={{alignSelf:'center'}} backgroundColor="white" onPress={()=>{setColor(color=='#dba309'?'lightgrey':'#dba309');props.addFavorite(props.name)}}/>:<></>}
		</View>
	)
}

class Announcements extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			teacherNames: [],
			favoriteNames: [],
			isLoading:true
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
		if (this.state.isLoading) return <></>
		return (
			<View style={[styles.container]}>
				<TeacherButton data={this.state.data.filter(x=>x.teacher==null||x.teacher.trim()==='')} name="No Teacher" navigation={this.props.navigation} />
				<FlatList
					data={this.state.favoriteNames.concat(this.state.teacherNames.filter(x=>this.state.favoriteNames.map(({name})=>name).indexOf(x.name) < 0))}
					renderItem={({item})=><TeacherButton color={this.state.favoriteNames.indexOf(item) >= 0?'#dba309':'lightgrey'} item={item} data={this.state.data.filter(x=>x.teacher===item.name)} name={item.name} navigation={this.props.navigation} icon={true} addFavorite={this.addFavorite}/>}
					keyExtractor={(item,index)=>item.name+index}
				/>
			</View>
		)
	}
}

export default Announcements;