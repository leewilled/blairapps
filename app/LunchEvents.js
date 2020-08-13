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

const LunchEvent = ({item}) => {
	const [visible, setVisible] = useState(0)
	const extra = visible?(<Text>{'\n'}{item.item.text}{'\n\n'}Location: {item.item.loc}</Text>):(<></>);
	return(
		<View>
			<TouchableOpacity style={styles.item} onPress={()=>setVisible(!visible)} activeOpacity={0.8}>
				<Text style={styles.title}>{item.item.title}</Text>
				{extra}
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
					renderItem={item=><LunchEvent item={item}/>}
					keyExtractor={item=>JSON.stringify(item)}
				/>
			</View>
		)
	}
}

export default LunchEvents;
