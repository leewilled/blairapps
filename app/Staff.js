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
  TouchableOpacity
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
  console.log(item)
  const [visible, setVisible] = useState(0)
  const extra = visible?(<Text>{'\n'}Email: {item.item.emails}</Text>):(<></>);
  return(
	<View>
	  <TouchableOpacity style={styles.item} onPress={()=>setVisible(!visible)} activeOpacity={0.8}>
		<Text style={styles.title}>{item.item.name}</Text>
		{extra}
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
      isLoading: true,
      search:""
    };
  }

  componentDidMount() {
    
    fetch(`${url}/api/en/teachers`,{
      headers: {
        'Cache-Control': 'no-cache'
      } })
      .then((response) => {
        return response.text();
      })
      .then((json) => {
        this.setState({data: JSON.parse(json).data[0].staff});
        this.setState({dataSearch:JSON.parse(json).data[0].staff});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
      
  }
  updateSearch = (search) => {
    this.setState({ search:search });
	const searchPool = search.startsWith(this.state.search)?this.state.dataSearch:this.state.data;
    const ds = searchPool.filter((thing)=>{return thing.name.toLowerCase().startsWith(search.toLowerCase())})
    this.setState({dataSearch: ds})
  };
  clearSearch  = (search)=>{
    const ds = this.state.data;
    this.setState({dataSearch:ds})
  }
  render() {
    const { data , dataSearch, isLoading,search} = this.state;
    console.log(data)

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