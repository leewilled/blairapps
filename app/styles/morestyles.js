import {StyleSheet, Dimensions} from 'react-native';

const styles=StyleSheet.create({
	moreitem: {
		backgroundColor:'red',
		borderColor:'white',
		borderWidth:0.5,
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
	}
});

export default styles;