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
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from './styles/morestyles';

function ResourceLink(props) { 
	return (
		<TouchableOpacity style={styles.resourceContainer} onPress={() => Linking.openURL(props.url)}>
          <Image source={props.img} style={styles.image}/>
		      <View style={styles.textContainer}>
            <Text style={styles.resourceText}>{props.name}</Text> 
          </View>		  
        </TouchableOpacity>
	)
}

class Resources extends React.Component {
	render() {
		return (
			<ScrollView style = {{backgroundColor: 'white'}}>
				<ResourceLink url='https://classroom.mcpsmd.org/' img={require('./assets/canvaslogo.png')} name='MyMCPS Classroom'/>
				<ResourceLink url='https://md-mcps-psv.edupoint.com/Home_PXP2.aspx' img={require('./assets/studentvue.jpg')} name='StudentVUE'/>
				<ResourceLink url='https://mbhs.edu/newsevents/Announcements/Montgomery%20Blair%20High%20School%20Final%20Bell%20Schedule%20.pdf' img={require('./assets/schedule.jpg')} name='1st Semester Schedule'/>
				<ResourceLink url='https://student.naviance.com/mbhs' img={require('./assets/naviance.png')} name='Naviance'/>
				<ResourceLink url='https://blairblazersathletics.com/' img={require('./assets/athletics.jpg')} name='Blair Athletics'/>
				<ResourceLink url='https://classroom.google.com/u/0/h' img={require('./assets/googleclassroom.jpg')} name='Google Classroom'/>
			</ScrollView>
		)
	}
}

export default Resources;