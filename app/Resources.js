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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from './styles/morestyles';
class Resources extends React.Component {
	render() {
		return (
			<ScrollView>
        <View style = {styles.resourceContainer}>
          <Text onPress={() => Linking.openURL('https://classroom.mcpsmd.org/')}>
            <Image source ={require('./assets/canvaslogo.png')} style = {styles.image}/>
            <View style = {styles.textContainer}>
              <Text style = {styles.resourceText}>
                MyMCPS Classroom
              </Text> 
            </View>
          </Text>  
        </View>
        <View style = {styles.resourceContainer}>
          <Text onPress={() => Linking.openURL('https://md-mcps-psv.edupoint.com/Home_PXP2.aspx')}>
            <Image source ={require('./assets/studentvue.jpg')} style = {styles.image}/>
            <View style = {styles.textContainer}>
              <Text style = {styles.resourceText}>
                StudentVUE
              </Text> 
            </View>
          </Text>  
        </View>
        <View style = {styles.resourceContainer}>
          <Text onPress={() => Linking.openURL('https://mbhs.edu/newsevents/Announcements/Montgomery%20Blair%20High%20School%20Final%20Bell%20Schedule%20.pdf')}>
            <Image source ={require('./assets/schedule.jpg')} style = {styles.image}/>
            <View style = {styles.textContainer}>
              <Text style = {styles.resourceText}>
                1st Semester Schedule
              </Text> 
            </View>
          </Text>
        </View>
        <View style = {styles.resourceContainer}>
          <Text onPress={() => Linking.openURL('https://student.naviance.com/mbhs')}>
            <Image source ={require('./assets/naviance.png')} style = {styles.image}/>
            <View style = {styles.textContainer}>
              <Text style = {styles.resourceText}>
                Naviance
              </Text> 
            </View>
          </Text>
        </View>
        <View style = {styles.resourceContainer}>
          <Text onPress={() => Linking.openURL('https://blairblazersathletics.com/')}>
            <Image source ={require('./assets/athletics.jpg')} style = {styles.image}/>
            <View style = {styles.textContainer}>
              <Text style = {styles.resourceText}>
                Blair Athletics
              </Text> 
            </View>
          </Text>
        </View>
        <View style = {styles.resourceContainer}>
          <Text onPress={() => Linking.openURL('https://classroom.google.com/u/0/h')}>
            <Image source ={require('./assets/googleclassroom.jpg')} style = {styles.image}/>
            <View style = {styles.textContainer}>
              <Text style = {styles.resourceText}>
                Google Classroom
              </Text> 
            </View>
          </Text>
        </View>
        
			</ScrollView>
		)
	}
}

export default Resources;