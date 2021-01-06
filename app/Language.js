/*import React, { Component } from 'react';
import { DevSettings } from 'react-native';
import { Platform, StyleSheet, TouchableOpacity, Text, ScrollView, View } from 'react-native';
import I18n from './i18n';
import AsyncStorage from '@react-native-community/async-storage'

const STORAGE_KEY = "language"

const language = [
      {lang: <Text>{I18n.t('language.English')}</Text>, code: "en"},
      {lang: <Text>{I18n.t('language.Spanish')}</Text>, code: "es"},
    ]

export default class extends Component {
  constructor() {
    super();
    this.state = {
      languages: [],
      value: false,
      
      select: I18n.t('language.SelectLanguage'),
    }
    this.onLanguage=this.onLanguage.bind(this);
  }

  onSelectLanguage() {
    return(
      language.map((data, i)=>{
        return (
           <View key={i} style={{backgroundColor: "#f99", padding: 10}}>
             <TouchableOpacity onPress={()=>this.onSelectedLang(data)}>
               <Text style={{paddingTop: 2, color: "#fff", fontSize: 18}}>{data.lang}</Text>
             </TouchableOpacity>
           </View>
        )
      })
    )
  }

  onSelectedLang(text) {
    this.setState({
      value: false,
      select: text.lang,
    }),

    I18n.locale = text.code
    AsyncStorage.setItem('language', text.code)
    DevSettings.reload()
  }
  onLanguage() {
    this.setState({
      value: true,
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white', padding: 24}}>
        <Text style ={{marginBottom: 5}}>{I18n.t('language.note')}</Text>
        <View>
          <TouchableOpacity onPress={this.onLanguage}>
            <View style={{backgroundColor: "red", padding: 10}}>
              <Text style={{color: "white", fontSize: 18, fontWeight: 'bold'}}>{this.state.select}</Text>
            </View>
          </TouchableOpacity>
          <View>
            {(this.state.value) ? this.onSelectLanguage() : null}
          </View>
          
        </View>
     </View>
   );
  }
}*/