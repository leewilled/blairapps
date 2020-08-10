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

const ClubElement = ({item}) => {
  console.log(item)
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
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('https://84a7c514cb57.ngrok.io/api/en/clubs',{
      headers: {
        'Cache-Control': 'no-cache'
      } })
      .then((response) => {
        //console.log(response.text());
        return response.text();
      })
      .then((json) => {
        console.log(json);
        this.setState({ data: JSON.parse(json) });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading} = this.state;

    return (
      <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
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