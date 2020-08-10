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
	}
});

export default styles;