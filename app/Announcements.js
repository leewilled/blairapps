import React from 'react';
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

const Announcement = ({item}) => {
	const date = new Date
	const dateStr = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
	const dateInfo = dateStr===item.item.date&&item.item.time!==undefined?item.item.time:item.item.date;
	console.log(dateStr)
	return (
		<View style={styles.item}>
			{dateInfo!==undefined?<Text style={styles.date}>{dateInfo}</Text>:<></>}
			<Text style={styles.title}>{item.item.message}</Text>
		</View>
	)
}

export const TeacherList = ({route}) => {
	return <View style={styles.container}>
		<FlatList
			data={route.params.data}
			renderItem={item=><Announcement item={item}/>}
			keyExtractor={item=>JSON.stringify(item)}
		/>
	</View>
}

function TeacherButton(props) {
	return (
		<View>
		  <TouchableOpacity style={styles.item} onPress={()=>props.navigation.navigate('TeacherList',{data:props.data,name:props.name})} activeOpacity={0.8}>
			<Text style={styles.title}>{props.name}</Text>
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
			isLoading:true
		}
	}
	
	componentDidMount() {
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
			<View style={styles.container}>
				<TeacherButton data={this.state.data.filter(x=>x.teacher==null||x.teacher.trim()==='')} name="No Teacher" navigation={this.props.navigation}/>
				<FlatList
					data={this.state.teacherNames}
					renderItem={({item})=><TeacherButton item={item} data={this.state.data.filter(x=>x.teacher===item.name)} name={item.name} navigation={this.props.navigation}/>}
					keyExtractor={(item,index)=>item.name+index}
				/>
			</View>
		)
	}
}

export default Announcements;