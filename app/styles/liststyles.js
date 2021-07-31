import {StyleSheet, StatusBar, Dimensions} from 'react-native';

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
  moreDefault: {
    flex: 1,
    backgroundColor:'white', 
    paddingHorizontal: '5%'
  },
  listItem: {
    display: 'flex', 
    borderBottomColor:'#D5D5D5',
    borderBottomWidth:.5
  },
  container2: {
    display: 'flex', 
    flexDirection: 'row', 
    height: Dimensions.get('window').height*0.075,
    alignItems: 'center'
  },
  sideImage: {
    height: 40,
    width: 40, 
    marginRight: 10,
    tintColor: '#323232'
  },
  accordian: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%'
  },
	accordianHeader: {
		paddingBottom: '2%',
		fontSize:16
	},
  accordianText: {
    paddingBottom: '2%',
		fontSize:16,
    fontWeight: '200',
  },
  item1: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 2,
    borderColor: '#bababa',
    width: '100%',
  },
  title: {
    fontSize: 20,
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
  homeTitle: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  title3: {
    fontSize: 28,
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
    shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.3,
		shadowRadius: 3,
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