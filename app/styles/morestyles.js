import {StyleSheet, Dimensions} from 'react-native';

const styles=StyleSheet.create({
	moreitem: {
		backgroundColor:'red',
		borderBottomColor:'white',
		borderBottomWidth:0.5,
		height: Dimensions.get('window').height*0.075,
		justifyContent:'center'
	},
	moretext: {
		color:'#eee',
		fontSize:20,
	},
	headerTitle: {
		fontWeight:'bold',
		fontSize:24
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
});

export default styles;