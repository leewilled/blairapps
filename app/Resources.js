import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from './styles/morestyles';

const windowWidth = Dimensions.get('window').width*.80/3.5;

function ResourceLink(props) { 
	return (
		<TouchableOpacity style={styles.resourceContainer, {paddingHorizontal: '5%', paddingBottom: '5%'}} onPress={() => Linking.openURL(props.url)}>
      <View style={{display: 'flex', textAlign: 'center', width: windowWidth}}>
        <View style={{aspectRatio: 1}}>
          <Image source={props.img} style={{width: '100%', height: '100%', borderRadius: 30}}/>
        </View>
        <Text style={{fontColor: 'black', alignSelf: 'center', marginTop: '2%', fontSize: 16}}>{props.name}</Text>
      </View>
    </TouchableOpacity>
	)
}

class Resources extends React.Component {
	render() {
		return (
      <ScrollView style = {{backgroundColor: 'white'}}>
        <View style = {{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingVertical: '5%'}}>
          <ResourceLink url='https://classroom.mcpsmd.org/' img={require('./assets/canvas.jpeg')} name='MyMCPS Classroom'/>
          <ResourceLink url='https://md-mcps-psv.edupoint.com/Home_PXP2.aspx' img={require('./assets/studentvue.png')} name='StudentVUE'/>
          <ResourceLink url='https://student.naviance.com/mbhs' img={require('./assets/naviance.png')} name='Naviance'/>
          <ResourceLink url='https://classroom.google.com/u/0/h' img={require('./assets/gc.png')} name='Google Classroom'/>
          <ResourceLink url='https://mbhs.edu/' img={require('./assets/blair_logo.png')} name='MBHS'/>
          <ResourceLink url='https://sites.google.com/mcpsmd.net/mbhs-schoolcounseling-team/home/mbhs-school-counseling-team' img={require('./assets/counselor.jpeg')} name='Counseling Team'/>
          <ResourceLink url='http://bnconline.net/c/infoflow/' img={require('./assets/infoflow.jpeg')} name='Infoflow'/>
          <ResourceLink url='https://silverchips.mbhs.edu/' img={require('./assets/sco.jpeg')} name='Silver Chips Online'/>
			  </View>
      </ScrollView>
			
		)
	}
}

export default Resources;