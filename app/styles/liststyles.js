import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#bababa',
    padding: 20,
    marginHorizontal: 16,
    borderBottomWidth: 1.5,
    borderColor: 'black',
    borderRadius: 12,
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
  }
});

export default styles;