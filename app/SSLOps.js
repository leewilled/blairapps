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
  Image,
  Dimensions
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
import styles from './styles/liststyles';
import { url } from './resources/fetchInfo.json';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from './i18n';

const Stack = createStackNavigator();

{/*export const SSLInfo = ({route}) => {
	const item = route.params;
	console
	return (
		<View style = {{padding: 10, backgroundColor: 'white', height: '100%'}}>
			<View style={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
				<View style={{width: '15%', display: 'flex', justifyContent: 'center'}}>
					<Image source={require('./assets/desc.png')} style={{height: 50, width: 50}}/>
				</View>
				<View style={{width: '85%'}}>
					<Text style = {styles.title}>{item.text}</Text>
				</View>
			</View>
			<View style={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
				<View  style={{width: '15%', display: 'flex', justifyContent: 'center'}}>
					<Image source={require('./assets/unknown.png')} style={{height: 50, width: 50}}/>
				</View>
				<View style={{width: '85%'}}>
					<Text style = {styles.title}>{item.teacher}</Text>
				</View>
			</View>
			<View style={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
				<View style={{width: '15%', display: 'flex', justifyContent: 'center'}}>
					<Image source={require('./assets/location.png')} style={{height: 50, width: 50}}/>
				</View>
				<View style={{width: '85%'}}>
					<Text style={{fontSize:20}}>{item.loc}</Text>
				</View>
			</View>
		</View>
	)
  }*/}

function SSLElement (props) {
	const item = props.item;
	const [expand, setExpand] = useState(false);
	return(
		<View>
			<TouchableOpacity style={styles.listItem} onPress={()=>setExpand(!expand)}>
				<View style = {styles.container2}>
					<Ionicons name="school-outline" size={36} color={'#323232'} style={{marginRight: 15}} />
					<View style = {styles.accordian}>
                        <Text style={styles.title}>{item.item.title}</Text>
                        {expand?<LinearGradient start={{x: 0, y: 0.25}} end={{x: .5, y: 1}} colors={['red', '#FF7373']} style={{borderRadius: 24, alignSelf: 'center'}}><Image source = {require('./assets/collapse.png')} style={{tintColor: 'white'}}/></LinearGradient>:<Image source = {require('./assets/expand.png')} style={{tintColor: '#b2b2b2', alignSelf: 'center'}}/>}
                    </View>
				</View>
				{expand?<View style={{marginLeft: 50}}><Text style={styles.accordianHeader}>{I18n.t('ssl.information')}</Text><Text style={styles.accordianText}>{item.item.text}</Text><Text style={styles.accordianHeader}>{'\n'}{I18n.t('ssl.sponsor')}</Text><Text style={styles.accordianText}>{item.item.teacher}</Text><Text style={styles.accordianHeader}>{'\n'}{I18n.t('ssl.location')}</Text><Text style={[styles.accordianText, {paddingBottom: '4%'}]}>{item.item.loc}</Text></View>:<></>}
			</TouchableOpacity>
		</View>
    )
}

class SSLOps extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	
	componentDidMount() {
		fetch(`http://localhost:8000/data/en/sslOps.json`,{
		//fetch(`${url}/api/en/sslOps`,{	
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
			<ScrollView style={styles.moreDefault}>
				<FlatList
					data={this.state.data}
					renderItem={item=><SSLElement item={item} name={item.title} navigation={this.props.navigation}/>}
					keyExtractor={item=>JSON.stringify(item)}
				/>
			</ScrollView>
			
		)
	}
}

export default SSLOps;