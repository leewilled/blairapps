import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
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

const Event = ({item}) => {
	const [visible, setVisible] = useState(false)
	const date = item.item.date.split('-')
	const extra = (
		<>
			<Text style={{fontSize:20}}>{item.item.text}</Text>
			<Text style={{fontSize:20}}>Location: {item.item.location}</Text>
			<Text style={{fontSize:20}}>Date: {`${date[1]}/${date[2]}/${date[0]}`}</Text>
		</>
	)
	return (
		<TouchableOpacity style={styles.item1} onPress={()=>setVisible(!visible)} activeOpacity={0.8}>
			<Text style={styles.title}>{item.item.title}</Text>
			{visible?extra:<></>}
		</TouchableOpacity>
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
			this.setState({data: data});
		  })
		  .catch((error) => console.error(error))
	}
	
	render() {
		return (
			<View>
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