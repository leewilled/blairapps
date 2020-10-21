import {StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles=StyleSheet.create({
	moreitem: {
		backgroundColor:'red',
		borderBottomColor:'white',
		borderBottomWidth:0.5,
		height: Dimensions.get('window').height*0.075,
		justifyContent:'center',
		paddingLeft: '3%',
		fontSize: 32,
	},
	moretext: {
		color:'#eee',
		fontSize:20,
	},
	headerTitle: {
		fontWeight: 'bold',
		fontSize:24,
	},
	resourceContainer: {
		alignItems: 'center',
    	marginTop: '3%',
	},
	image: {
		height: 100,
		width: 400,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
	},
	textContainer: {
		backgroundColor: 'black',
		width: 400,
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
	},
	resourceText: {
		fontWeight: 'bold',
		color: 'white',
		fontSize:32,
		textAlign:'center',
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
	}
});

export default styles;