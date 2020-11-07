import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator, 
  FlatList,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SearchBar } from 'react-native-elements';
import styles from './styles/liststyles'
import { url } from './resources/fetchInfo.json'

const StaffElement = ({item}) => {
  const [visible, setVisible] = useState(false)
  const extra = [...item.item.emails.map(email=>(<Text key={email}>{'\n'}Email: <Text style={styles.linktext} onPress={()=>Linking.openURL("mailto:"+email)}>{email}</Text></Text>))]
  return(
	<View>
	  <TouchableOpacity style={styles.item1} onPress={()=>setVisible(!visible)} activeOpacity={0.8}>
    <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Image source = {require('./assets/staff.png')} style = {{height: 40, width: 40, marginRight: 10}}/>
      <Text style={styles.title}>{item.item.name}</Text>
    </View>
		{visible?extra:<></>}
	  </TouchableOpacity>
	</View>
  )
}
class Staff extends React.Component {

  
	constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataSearch:[],
      search:""
    };
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
	  fetch(`${url}/api/en/teachers`,{
      headers: {
        'Cache-Control': 'no-cache'
      } })
      .then((response) => {
        return response.text();
      })
      .then((json) => {
        this.setState({data: JSON.parse(json).data});
        this.setState({dataSearch:JSON.parse(json).data});
      })
      .catch((error) => console.error(error))
  }
  
  updateSearch = (search) => {
    this.setState({ search:search });
	const searchPool = search.startsWith(this.state.search)?this.state.dataSearch:this.state.data;
    const ds = searchPool.filter((thing)=>{return thing.name.toLowerCase().split(' ').some(x=>x.startsWith(search.toLowerCase()))})
    this.setState({dataSearch: ds})
  };
  clearSearch  = (search)=>{
    const ds = this.state.data;
    this.setState({dataSearch:ds})
  }
  render() {
    const { data , dataSearch,search} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
        lightTheme
        placeholder="Search Staff"
        onChangeText={this.updateSearch}
        onCancel={this.clearSearch}
        onClear={this.clearSearch}
        value={this.state.search}/>
      <FlatList
        data={dataSearch}
        renderItem={item => <StaffElement item={item}/>}
        keyExtractor={item => JSON.stringify(item)}
      />
    </SafeAreaView>
    );
  }
}

export default Staff;