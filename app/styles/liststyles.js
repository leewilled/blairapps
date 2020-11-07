import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1.5,
    borderColor: 'black'
  },
  item1: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 2,
    borderColor: '#bababa',
    width: '100%',
  },
  title: {
    fontSize: 28,
  },
  date: {
	  fontSize:12,
	  marginBottom:'-3%',
	  alignSelf:'flex-end',
	  marginTop:'-3%',
	  marginRight:'-3%'
  },
  title1: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    textDecorationLine: 'underline',
    textDecorationStyle: "solid",
    textDecorationColor: "red",
  },
  link: {
    fontSize: 28,
    textDecorationLine: 'underline',
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
  },
  eventTitle: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 5,
    marginBottom: 10,
  },
  linktext: {
	  color:'blue',
	  textDecorationLine: 'underline'
  }
});

export default styles;