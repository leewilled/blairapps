import React, { useState } from 'react';
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

import { url } from './resources/fetchInfo.json'
import styles from './styles/liststyles'

const TeacherElement = ({item}) => {
  const [visible, setVisible] = useState(0)
  const extra = [...item.item.emails.map(email=>(<Text key={email}>Email: {email}</Text>))]
  return(
	<View>
	  <TouchableOpacity style={styles.item} onPress={()=>setVisible(!visible)} activeOpacity={0.8}>
		<Text style={styles.title}>{item.item.name}</Text>
		{visible?extra:<></>}
	  </TouchableOpacity>
	</View>
  )
}

class Staff extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true
		}
	}
	
	componentDidMount() {
		fetch(`${url}/api/en/teachers`,{
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
		.finally(()=>this.setState({isLoading:false}))
	}
	
	render() {
		if(this.state.isLoading) return (<View/>)
		
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.data}
					renderItem={item=><TeacherElement item={item} />}
					keyExtractor={(item,index)=>JSON.stringify(item)+index}
				/>
			</View>
		)
	}
}

export default Staff;