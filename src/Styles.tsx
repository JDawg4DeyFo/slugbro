import {StyleSheet} from 'react-native';
// NOTE: Rem units assume 16px root font size.

// Color Variables
// Higher number = darker


export const Colors = {
	// Neutrals
	Black			: '#000000',
	DarkestGrey		: '#21252A',
	Grey12        	: '#343A40',
	Grey10        	: '#495057',
	Grey8         	: '#868E96',
	Grey6         	: '#ADB5BD',
	Grey4         	: '#CFD4DA',
	Grey3        	: '#E0E3E7',
	Grey1         	: '#F1F3F5',
	White			: '#FFFFFF',

	// Primaries

	// Derivatives

	// Reds

	// Greens

	// Yellows
};

export const TextSize  = {
	Rem3	: 48,
	Rem2	: 32,

	Regular	: 15,
	Small	: 11,
}


const Styles = StyleSheet.create({
	// One container to rule them all...
	RootContainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Colors.Grey1,
		paddingHorizontal: 20,
		paddingTop: 12,
	},
	
	// Home page header, holds settings and profile icon
	HomeHeader: {
		flex: 1,
		flexDirection: 'row',
		justifyContent:'flex-end',
		alignItems: 'center',
	},

});

export default Styles;

