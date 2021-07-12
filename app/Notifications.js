import React, { Component, useState } from 'react';
import { 
    Platform, 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    ScrollView, 
    View, 
    Switch 
} from 'react-native';
import I18n from './i18n';
import AsyncStorage from '@react-native-community/async-storage'

const STORAGE_KEY_ANNOUNCEMENT = "announcementNotifs"
const STORAGE_KEY_EVENT = "eventNotifs"

function parseBoolean (val) {

    if (val == "true") {
        return true;
    }
    else if (val == "false") {
        return false;
    }
}

function AnnouncementNotifs() {
    
    const [ isEnabled, setIsEnabled ] = React.useState()

    React.useEffect(() => {
        const checkAsync = async () => {
            const value = await AsyncStorage.getItem('announcementNotifs')
            if (value !== undefined || value !== null){
                
                setIsEnabled(parseBoolean(value))
            } else {
                setIsEnabled(false)
                AsyncStorage.setItem('announcementNotifs', JSON.stringify('false'))
            }
        }
        checkAsync()
    }, [])
    
    const toggleSwitch = () => {
        AsyncStorage.getItem('announcementNotifs')
        .then((token) => {
            const temp = parseBoolean(token)
            AsyncStorage.setItem('announcementNotifs', JSON.stringify(!temp))
            setIsEnabled(!isEnabled)
        })
    }
    return (
        <View style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignContent: 'center'}}>
            <Text style = {{fontSize: 22}}>{I18n.t('notifications.announcements')}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "red" }}
                thumbColor= "white"
                ios_backgroundColor="white"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />    
        </View>
    )
}

function EventNotifs() {
    const [ isEnabled, setIsEnabled ] = React.useState()

    React.useEffect(() => {
        const checkAsync = async () => {
            const value = await AsyncStorage.getItem('eventNotifs')
            if (value !== undefined || value !== null){
                
                setIsEnabled(parseBoolean(value))
            } else {
                setIsEnabled(false)
                AsyncStorage.setItem('eventNotifs', JSON.stringify('false'))
            }
        }
        checkAsync()
    }, [])
    
    const toggleSwitch = () => {
        AsyncStorage.getItem('eventNotifs')
        .then((token) => {
            const temp = parseBoolean(token)
            AsyncStorage.setItem('eventNotifs', JSON.stringify(!temp))
            setIsEnabled(!isEnabled)
        })
    }

    return (
        <View style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignContent: 'center'}}>
            <Text style = {{fontSize: 22}}>{I18n.t('notifications.events')}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "red" }}
                thumbColor= "white"
                ios_backgroundColor="white"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}

class Notifications extends Component {
    

  render() {

    return (
        <View>
            <Text>
                Notifs
            </Text>
        </View>
        /*<View style = {{flex: 1, backgroundColor: 'white', padding: 20}}>
            <AnnouncementNotifs />
            <EventNotifs />
        </View>*/
   );
  }
}

export default Notifications