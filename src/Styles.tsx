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
	MainPrimary		: '#1295D8',
	
	// Derivatives

	// Reds

	// Greens

	// Yellows
};

export const TextSizes  = {
	Rem3	: 48,
	Rem2	: 32,

	Regular	: 15,
	Small	: 11,
}
// This is the order that style properties should be listed
// ExampleOrder: {
// 	flexStuff: 312321,

// 	sizeStuff: 123213,

// 	styleStuff: 123213,
// 		color:1231231,
// 		borderRadius:31321
// 		fontFamily:312313,


// 	padding:13213,
// 	margin: 13231,
// }


const StylesObj = StyleSheet.create({
	// One container to rule them all...
	RootContainer: {
		flex: 1,
		flexDirection: 'column',

		backgroundColor: Colors.Grey1,

		paddingTop: 40,	// Probably need different padding for IOS.
	},

	// Tabs
	TabBar: {
		flexDirection: 'row',
		justifyContent: 'space-around',

		backgroundColor: Colors.Grey4,
	},
		// Icons

	
	// Feed page header, holds settings and profile icon
	FeedHeader: {
		flexDirection: 'row',
		justifyContent:'space-between',
		alignItems: 'center',

		paddingHorizontal: 20,
	},
		// Profile container
	ProfileContainer: {
		flexDirection: 'row',

		width: 140,
		height: 49,

		borderColor: Colors.Grey4,
		borderWidth: 1,
		borderRadius: 10,

		backgroundColor: Colors.White,

		padding: 7,
	},
		// Profile Picture
	ProfileIcon: {
		borderRadius: 10,

		width: 35,
		height: 35,

		marginRight: 3,
	},
		// Container of Name and slogan
		// Needs to be reworked. Looks like expletive.
	ProfileNameSloganContainer: {
		flex:1,
		flexDirection: 'column',

		padding:0,
	},
			// Profile Name
	ProfileName: {
		fontSize: TextSizes.Regular,
		color: Colors.DarkestGrey,
	},
			// Profile Slogan
	ProfileSlogan: {
		fontSize: TextSizes.Small,
		color: Colors.Grey12,
	},


	// Feed content
	FeedContent: {
		flex: 1,
		alignItems: 'center',

		paddingHorizontal: 20,
		marginTop: 16,
	},
		// For all the bros in the feed
	BroContainer: {
		height: 105,
		width: 353,

		borderRadius: 10,
		borderColor: Colors.Grey6,
		borderWidth: 2,

		backgroundColor: Colors.Grey4,

		marginVertical: 10,
	},
			// Main Bro
	MainBro: {
		flex: 1,

		backgroundColor: Colors.White,
		
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
				// Text for main bro
	MainBroText: {
		fontSize: TextSizes.Rem3,
		color: Colors.DarkestGrey,
	},
				// Footer for MainBro
	MainBroFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',

		height: 29,

		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,

		backgroundColor: Colors.Grey4,

		paddingHorizontal: 5,
	},
					// Footer text
	MBFooterTxt: {
		fontSize: TextSizes.Regular,
		color: Colors.DarkestGrey,
	},



});

export default {StylesObj, Colors};
