import {StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

console.log(Dimensions.get('window'))

const styles=StyleSheet.create({
	moreitem: {
		backgroundColor:'white',
		borderBottomColor:'#D5D5D5',
		borderBottomWidth:.5,
		height: Dimensions.get('window').height*0.075,
		paddingLeft: '3%',
		fontSize: 32,
		display: 'flex', 
		flexDirection: 'row',
		alignItems: 'center',
	},
	moretext: {
		fontSize:20,
	},
	headerTitle: {
		fontWeight: 'bold',
		fontSize:24,
		alignSelf: 'center'
	},
	resourceContainer: {
		alignItems: 'center',
    	marginTop: '3%',
	},
	openPage: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	linearGradient: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		height: '100%',
		width: '100%',
	},
	tabBarIcon: {
		height: 50,
		width: 50,
	},
	popup: {
		height: '90%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: "center",
		alignItems: "center",
	  },
	modal: {
		marginHorizontal: 20,
		marginTop: '20%',
		height: '100%',
		backgroundColor: "white",
		borderRadius: 20,
		padding: 15,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.5,
		shadowRadius: 7,
	},
	modalText: {
		marginVertical: '10%',
		textAlign: "center",
		fontSize: 20,
	}
});

export default styles;