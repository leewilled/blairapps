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
  TouchableHighlight,
  Linking
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
import { SearchBar } from 'react-native-elements';
import styles from './styles/liststyles'
import morestyles from './styles/morestyles'
import { url } from './resources/fetchInfo.json'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from './i18n';

const Stack = createStackNavigator();

/*export const StaffInfo = ({route}) => {
  const item = route.params;

  console.log(item);

  return (
    <View style = {{padding: 10, backgroundColor: 'white', height: '100%'}}>
      {item.emails.map(email =>
        <View style ={[styles.infoContainer, {flexDirection: 'row', alignItems: 'center'}]}>
          <View style={{display: 'flex', justifyContent: 'center'}}>
            <Ionicons name='mail-outline' size={28} style={{marginRight: 15}}/>
          </View>
          <View style={{}}>
            <Text style = {{fontSize:16}}>{email}</Text>
          </View>
        </View>
      )}
    </View>
    <ScrollView style={{paddingTop:'5%',paddingHorizontal:'10%', backgroundColor: 'white', height: '100%'}}>
      <View style={{backgroundColor: 'white',borderRadius: 150, height: 300, width: 300, alignSelf: 'center', shadowColor: 'red', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 7}}>
        <Image style={{resizeMode: 'cover',borderRadius: 150, height: 300, width: 300, alignSelf: 'center'}} source = {{/* CHANGE }} /> 
      </View>
      <Text style={{fontSize:28,marginTop:'5%',textAlign:'center'}}>{item.name}</Text>
      <Text style={{fontSize:20,textAlign:'center', fontWeight: '200'}}>{item.position || ""}</Text>
      
      {item.emails &&
        <View style={{display: 'flex', padding:'2%', borderRadius: 8, marginTop:'5%'}}>
          <View style={{display:'flex', flexDirection: 'row'}}>
            <Ionicons name='mail-outline' size={28} style={{marginRight: 15}}/>
            <View style = {{display: 'flex', flexDirection: 'row', width: '85%', justifyContent: 'space-between', paddingHorizontal:'2%',}}>
              <Text style={{fontSize: 20,  alignSelf: 'center'}}>{"Email"}</Text>
            </View>
          </View>
          <Text style = {{marginLeft: 50, paddingHorizontal: '2%', paddingBottom: '2%'}}>
            {item.emails.map(email =>
              <Text key={email}>{email}</Text>
            )}
          </Text>
        </View>
      }
      
      {item.phone &&
        <View style={{display: 'flex', padding:'2%', borderRadius: 8, marginTop:'5%'}}>
          <View style={{display:'flex', flexDirection: 'row'}}>
            <Ionicons name='call-outline' size={28} style={{marginRight: 15}}/>
            <View style = {{display: 'flex', flexDirection: 'row', width: '85%', justifyContent: 'space-between', paddingHorizontal:'2%',}}>
              <Text style={{fontSize: 20,  alignSelf: 'center'}}>{"Phone"}</Text>
            </View>
          </View>
          <Text style = {{marginLeft: 50, paddingHorizontal: '2%', paddingBottom: '2%'}}>
          {item.phone.map(num =>
            <Text key={num}>{num}</Text>
          )}
          </Text>
        </View>
      }
    </ScrollView>
  )
}*/
function StaffElement (props) {
  const item = props.item;
  const [expand, setExpand] = useState(false);

  return(
    <View>
        <TouchableOpacity style={styles.listItem} onPress={()=>setExpand(!expand)}>
            <View style={styles.container2}>
                <Ionicons name="ios-nutrition-outline" size={36} color={'#323232'} style={{marginRight: 15}} />
                <View style = {styles.accordian}>
                    <Text style={styles.title}>{item.name}</Text>
                    {expand?<LinearGradient start={{x: 0, y: 0.25}} end={{x: .5, y: 1}} colors={['red', '#FF7373']} style={{borderRadius: 24, alignSelf: 'center'}}><Image source = {require('./assets/collapse.png')} style={{tintColor: 'white'}}/></LinearGradient>:<Image source = {require('./assets/expand.png')} style={{tintColor: '#b2b2b2', alignSelf: 'center'}}/>}
                </View>
            </View>
            {expand?
            <View style={{marginLeft: 50}}>
                <Text style={styles.accordianHeader}>Email</Text>
                <Text style={styles.accordianText}>{item.email}</Text>
                <Text style={styles.accordianHeader}>{'\n'}Phone Number</Text>
                <Text style={[styles.accordianText, {paddingBottom: '4%'}]}>{item.phone}</Text>
                <Text syle={styles.accordianHeader}>{'\n'}Position</Text>
                <Text style={[styles.accordianText, {paddingBottom: '4%'}]}>{item.position}</Text>
            </View>:<></>}
        </TouchableOpacity>
    </View>
  )
}

const background = (<LinearGradient
  colors={['#f99', 'white']}
  style = {{flex:1,borderBottomColor:'black',borderBottomWidth:0.5}}
  />)

function Staff () {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name = "Staff"
          component = {Staffs}
          options={({
            headerShown: true,
            headerTitleStyle:morestyles.headerTitle,
            headerBackground: ()=>background,
            //headerleft: null,
            title:I18n.t('app.staff'),
            headerBackTitleVisible:false,
            headerTintColor: 'black',
            headerTitleAlign: 'center'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) 
}

class Staffs extends React.Component {
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
	  fetch(`${url}/api/`+String(I18n.locale).split('-')[0]+`/teachers`,{
      headers: {
        'Cache-Control': 'no-cache'
      } })
      .then((response) => {
        return response.text();
      })
      .then((json) => {
        const data = JSON.parse(json)
        data.sort((a,b)=>a.id-b.id)
        this.setState({data: data});
        this.setState({dataSearch: data});
      })
      .catch((error) => console.error(error))
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
    const { data , dataSearch,search} = this.state;
    if (this.state.isLoading) {
      return <View/>
    } else {
    return (
      <SafeAreaView style={styles.moreDefault}>
        <SearchBar
        lightTheme
        placeholder={I18n.t('staff.searchStaff')}
        onChangeText={this.updateSearch}
        onCancel={this.clearSearch}
        onClear={this.clearSearch}
        value={this.state.search}/>
      <FlatList
        data={dataSearch}
        renderItem={({item}) => <StaffElement item={item} name={item.name} navigation={this.props.navigation}/>}
        keyExtractor={item => JSON.stringify(item)}
      />
    </SafeAreaView>
    
    );}
  }
}

export default Staff;