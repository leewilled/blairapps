import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
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
	const dateStr = `${date.getMonth()+1}/${date.getUTCDate()}/${date.getFullYear()}`
	const dateInfo = dateStr===item.item.date&&item.item.time!==undefined?item.item.time:item.item.date;
	return (
		<View style={styles.item}>
			{dateInfo!==undefined?<Text style={styles.date}>{dateInfo}</Text>:<></>}
			<Text style={styles.title}>{item.item.message}</Text>
		</View>
	)
}

class Announcements extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			data: []
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
			return response.text();
		})
		.then((json) => {
			this.setState({data: JSON.parse(json).data});
		})
		.catch((error) => console.error(error))
	}
	
	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.data}
					renderItem={item=><Announcement item={item}/>}
					keyExtractor={item=>JSON.stringify(item)}
				/>
			</View>
		)
	}
}

export default Announcements;