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

export default Calendar;