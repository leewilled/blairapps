import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  TouchableHighlight,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from './styles/morestyles'

const Images = {
    sslopps: require('./assets/sslopps.png'),
    lunch: require('./assets/lunch.png'),
    settings:require('./assets/settings.png'),
    challenge:require('./assets/challenge.png'),
    student:require('./assets/student.png'),
    announcements:require('./assets/announcements.png'),
    resources:require('./assets/resources.png'),
    polls:require('./assets/polls.png'),
    notifs:require('./assets/notifs.png'),
    lang:require('./assets/lang.png'),
}

export default Images;