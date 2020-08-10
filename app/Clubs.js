import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator, 
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SearchBar } from 'react-native-elements';

const ClubElement = ({item}) => {
  //console.log(item)
  return(
  <View style={styles.item}>
    <Text style={styles.title}>{item.item.name}</Text>
    <Text>Location: {item.item.loc} {"\n"}Sponsor: {item.item.sponsor}</Text>
  </View>
  )
}
class Clubs extends React.Component {

  
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
    
    fetch('https://6dc2642ae9b3.ngrok.io/api/en/clubs',{
      headers: {
        'Cache-Control': 'no-cache'
      } })
      .then((response) => {
        //console.log(response.text());
        return response.text();
      })
      .then((json) => {
        //onsole.log("done bitch?")
        //console.log(json);
        this.setState({data: JSON.parse(json)});
        this.setState({dataSearch:JSON.parse(json)});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
      
  }
  updateSearch = (search) => {
    this.setState({ search:search });
    ds = this.state.dataSearch.filter((thing)=>{return thing.name.startsWith(search)})
    this.setState({dataSearch: ds})
  };
  clearSearch  = (search)=>{
    ds = this.state.data;
    this.setState({dataSearch:ds})
  }
  render() {
    const { data , dataSearch, isLoading,search} = this.state;

    return (
      

      <SafeAreaView style={styles.container}>
        <SearchBar
        lightTheme
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        onClear={this.clearSearch}
        value={this.state.search}/>
      <FlatList
        data={dataSearch}
        renderItem={item => <ClubElement item={item}/>}
        keyExtractor={item => JSON.stringify(item)}
      />
    </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#bababa',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default Clubs;