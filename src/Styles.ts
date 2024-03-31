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
	MainDerivative	: '#00A3AD',

	// Reds
	MainRed			: '#DC3030',

	// Greens
	MainGreen 		: '#0FD965',

	// Yellows
	MainYellow 		: '#FFD200',
};

export const TextSizes  = {
	Rem3	: 48,
	Rem2	: 32,

	Med		: 24,
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

		fontFamily: 'Inter-SemiBold',

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
		// flex:1,
		flexDirection: 'column',

		padding:0,
	},
				// Profile Name
	ProfileName: {
		fontSize: TextSizes.Regular,
		color: Colors.DarkestGrey,
		fontFamily: 'Inter-SemiBold',
	},
				// Profile Slogan
	ProfileSlogan: {
		fontSize: TextSizes.Small,
		fontFamily: 'Inter-SemiBold',
		color: Colors.Grey12,
	},
		// Setting icon
	SettingsIcon: {
		width: 35,
		height: 35,
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
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
				// Text for main bro
	MainBroText: {
		fontSize: TextSizes.Rem3,
		fontFamily: 'Inter-SemiBold',
		color: Colors.DarkestGrey,

		paddingLeft: 21,
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
		fontFamily: 'Inter-SemiBold',
		color: Colors.DarkestGrey,
	},



	// Leaderboard container
	// note everything below would be nested in this...
	// i don't feel like doing that much indentation tho
	LBContainer: {
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'flex-start',
	},
	// LeaderBoard title
	LBTitle: {
		paddingTop: 25,
		paddingBottom: 5,
		paddingLeft: 21,

		fontSize: TextSizes.Rem2,
		fontFamily: 'Inter-SemiBold',
		color: Colors.DarkestGrey,
	},
	// Leaderboard Header
	LBHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		
		alignContent: 'center',

		height: 35,

		backgroundColor: Colors.Grey3,

		borderColor: Colors.Grey8,
		borderWidth: 1,

		paddingHorizontal: 21,
	},
		// Header text
	LBHeadText: {
		fontSize: TextSizes.Regular,
		fontFamily: 'Inter-Regular',
		color: Colors.Grey12,
	},
	// Entry Container
	LBE_Container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1,

		alignContent: 'center',	// this isn't centering bros sent either.

		height: 54,

		borderColor: Colors.Grey8,
		borderBottomWidth: 1,

		paddingHorizontal: 21,		
	},
		// Name PFP container
	LBE_NamePFP: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		maxWidth: '80%',
		alignItems: 'center',	// idk why this isn't centering on y axis
	},
			// PFP
	LBE_PFP: {
		height: 35,
		width: 35,

		marginRight: 8,

		borderRadius: 10,
	},
			// Name
	LBE_Name: {
		color: Colors.Black,

		fontSize: TextSizes.Regular,
		fontFamily: 'Inter-SemiBold',
	},
		// Bros sent
	LBE_BrosSent: {
		color: Colors.Black,

		fontSize: TextSizes.Regular,
		fontFamily: 'Inter-SemiBold',
	},


	// BroPage
	// Unbro // note this is nested within LBE entry style
	UnbroContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		height: 23,
		width: 83,

		backgroundColor: Colors.White,
		
		borderColor: Colors.MainRed,
		borderRadius: 7,
		borderWidth: 1,
	},
		// unbro text
	UnbroText: {
		fontSize: TextSizes.Regular,
		fontFamily: 'Inter-SemiBold',
		color: Colors.MainRed,

		padding: 0,
		margin: 0,
	},



	// FOR PROFILE PAGE
	// Profile Header
	ProfileHeader: {
		backgroundColor: Colors.White,
		
		marginBottom: 8,
		paddingHorizontal: 16,
	},
		// Name, Profile picture, and action button container
	PH_NamePFPAction: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingVertical: 8,
	},
			// pfp in profile header
	PH_PFP: {
		height: 52,
		width: 52,

		borderRadius: 10,

		marginRight: 14,
	},
			// Name Action container (these two need to be together)
	PH_PFPName: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		maxWidth: '80%'
	},
				// Name in profile header
	PH_Name: {
		fontFamily: 'Inter-SemiBold',
		fontSize: TextSizes.Rem2,
	},
				// Action button in profile header (edit or addbro or unbro)
	PH_Action: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		width: 70,
		height: 30,

		backgroundColor: Colors.White,

		borderColor: Colors.MainPrimary,
		borderWidth: 1,
		borderRadius: 7,
	},
					// text of action button
	PH_ActionText: {
		color: Colors.MainPrimary,

		fontSize: TextSizes.Regular,
		fontFamily: 'Inter-SemiBold',
	},
				// destructive action container (unbro)
	PH_DestructiveAction: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		width: 70,
		height: 30,

		borderColor: Colors.MainRed,
		borderWidth: 1,
		borderRadius: 7,
	},
					// text of action button (unbro)
	PH_DestructiveActionText: {
		color: Colors.MainRed,

		fontSize: TextSizes.Regular,
		fontFamily: 'Inter-SemiBold',
	},
			// Row with stuff
	PH_InfotainerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5,
		marginBottom: 5,
	},
				// style for the actual text
	PH_InfotainerText: {
		fontFamily: 'Inter-SemiBold',
		fontSize: TextSizes.Regular,
	},
	// style for paragraphs
	PH_InfotainerParagraph: {
		fontFamily: 'Inter-Regular',
		fontSize: TextSizes.Regular,
		color: Colors.Black,
		// flex: 1,
	},
			// Row for IG
	PH_IGRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginTop: 4,
		marginBottom: 8
	},
				// Style for logo
	PH_IGLogo: {
		height: 19,
		width: 19,

		marginRight: 8,
	},
				// Style for text
	PH_IGText: {
		fontFamily: 'Inter-SemiBold',
		fontSize: TextSizes.Regular,
		marginTop: -2,
		marginBottom: 2
	},
	PH_EditText: {
		borderColor: Colors.Grey4,
		borderWidth: 1,
		borderRadius: 4,
		marginTop: -4,
		marginBottom: -4,
		backgroundColor: Colors.White,
		minWidth: 100,
		paddingLeft: 4,
		paddingRight: 4
	},



	// Login page
	// Header (Slugbro title) container
	LoginHeader: {
		justifyContent: 'center',
		alignItems: 'center',

		height: 80,
		width: '100%',
	},
		// Header text (slugbro)
	LoginHeaderText: {
		fontSize: TextSizes.Rem2,
		fontFamily: 'Inter-SemiBold',
	},
	// MainLogin Container, contain buttons and text input and title text
	MainLogin: {
		alignItems: 'flex-start',
		alignContent: 'space-between',

		paddingHorizontal: 70,
		marginTop: 90,
	},
		// "login, or sign up"
	MainLoginTitle: {
		fontSize: TextSizes.Med,
		fontFamily: 'Inter-SemiBold',

		marginBottom: 14,
	},
		// Hold "email" and "@ucsc.edu email required"
	TextInputTitleRow: {
		flexDirection: 'row',
	},
			// "email" or "password"
	TextInputTitle: {
		fontSize: TextSizes.Regular,
		fontFamily: 'Inter-SemiBold',

		marginRight: 8,
	},
			// "@ucsc.edu email required"
	TextInputInfo: {
		fontSize: TextSizes.Regular,
		fontFamily: 'Inter-SemiBold',
		color: Colors.Grey10,
	},
		// Actuall text input box
	LoginTextInput: {
		height: 40,
		width: '100%',
		
		borderColor: Colors.Grey4,
		borderWidth: 1,
		borderRadius: 10,

		backgroundColor: Colors.White,

		padding: 10,
		marginBottom: 8,
	},
		// container for login/sign up buttons
	LoginActionRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',

		marginTop: 12,
	},
			// container for login/signup
	LoginActionButton: {
		width: 95,
		height: 40,

		backgroundColor: Colors.White,
		
		borderColor: Colors.MainPrimary,
		borderRadius: 7,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
				// text of button
	LoginActionButtonText: {
		fontSize: TextSizes.Regular,
		fontFamily: 'Inter-SemiBold',

		color: Colors.MainPrimary,
	},

	BroButton: {
		backgroundColor: '#1295D8',
		borderColor: '#E0E3E6',
		borderWidth: 6,
		borderRadius: 30,
		width: '26%',
		position: 'absolute',
		transform: [{translateX: -8}, {translateY: -117}]
	},
	DisabledBroButton: {
		backgroundColor: '#def',
		borderColor: '#E0E3E6',
		borderWidth: 6,
		borderRadius: 30,
		width: '26%',
		position: 'absolute',
		transform: [{translateX: -8}, {translateY: -117}]
	},
	BroText: {
		fontSize: TextSizes.Rem2,
		fontFamily: 'Inter-Bold',
		color: Colors.White,
	},


	InfoRootContainer: {
		flex: 1,
		flexDirection: 'column',

		backgroundColor: Colors.Grey1,
	},
	InformationSection: {
		backgroundColor: Colors.White,

		paddingHorizontal: 16,
		marginBottom: 8,
	},
		//
	InformationHeader: {
		fontSize: TextSizes.Rem2,
		fontFamily: 'Inter-Bold',
	}
});

export default {StylesObj, Colors};
