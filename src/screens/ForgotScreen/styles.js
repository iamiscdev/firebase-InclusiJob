import { StyleSheet } from 'react-native';

/* fonts */
export const FontFamily = {
    interSemiBold: "Inter-SemiBold",
    interBold: "Inter-Bold",
    DMSansSemiBold: "DMSans-SemiBold",
    DMSansBold: "DMSans-Bold",
    DMSansRegular: "DMSans-Regular",
};

export default StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center", // Center content vertically
        paddingHorizontal: 20,
    },

    container2: {
        flex: 1,
        alignItems: "center",
        marginTop: -20,
        paddingHorizontal: 20,
    },

    image: {
        width: 60,
        height: 50,
        left: -135,
        marginTop: 65,
        marginBottom: 0, // Add some spacing below the logo
    },

    image2: {
        width: 60,
        height: 50,
        left: -105,
        marginTop: 65,
        marginBottom: 0, // Add some spacing below the logo
    },


    image3: {
        width: 60,
        height: 50,
        right: -100,
        marginTop: 65,
        marginBottom: 0, // Add some spacing below the logo
    },

    imageCenter: {
        width: 125,
        height: 109,
        position: "fixed",
        marginTop: 10,
        marginBottom: 10, // Add some spacing below the logo
    },

    progressBar: {
        width: "100%",
        height: 50,
        left: 10,
        marginRight: 10,
        marginBottom: 0, // Add some spacing below the logo
    },

    title: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: FontFamily.interBold,
        textAlign: 'center',
        top: 10,
        color: '#333',
        marginTop: 30,
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: FontFamily.DMSansRegular,
        color: '#333',
        marginBottom: 40,
    },

    subtitleUnderProg: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: FontFamily.DMSansRegular,
        color: '#333',
        marginBottom: 10,
    },

    inputContainerText: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%", // Ensure inputs fill available space
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#F0F0F0',
        backgroundColor: '#F0F0F0',
        marginBottom: 15,
        paddingHorizontal: 10,

        // Elevation for shadow effect
        elevation: 3, // Only for Android

        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    inputContainerEmail: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%", // Ensure inputs fill available space
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#F0F0F0',
        backgroundColor: '#F0F0F0',
        marginBottom: 50,
        paddingHorizontal: 10,

        // Elevation for shadow effect
        elevation: 3, // Only for Android

        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    inputContainerPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%", // Ensure inputs fill available space
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#F0F0F0',
        backgroundColor: '#F0F0F0',
        marginBottom: 50,
        paddingHorizontal: 10,

        // Elevation for shadow effect
        elevation: 3, // Only for Android

        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    inputSpinner: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%", // Ensure inputs fill available space
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#F0F0F0',
        backgroundColor: '#F0F0F0',
        marginTop: 100,
        marginBottom: 100,
        paddingHorizontal: 10,

        // Elevation for shadow effect
        elevation: 3, // Only for Android

        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    textInput: {
        flex: 1,
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        paddingVertical: 10,
    },

    iconContainer: {
        paddingLeft: 10,
    },

    button: {
        backgroundColor: '#4A148C',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: "100%", // Full width for button
        marginBottom: 15,
    },

    signupConButton: {
        width: 280,
        height: 42,
        backgroundColor: '#000', // black color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
    },

    signupPrevButton: {
        width: 280,
        height: 42,
        backgroundColor: '#C6C6C6', // black color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 45,
        marginBottom: 15,
    },

    signupSectorPrevButton: {
        width: 280,
        height: 42,
        backgroundColor: '#C6C6C6', // black color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 85,
        marginBottom: 15,
    },

    selectSectorText: {
        color: '#000000',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: FontFamily.DMSansRegular,
    },

    signupConButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: FontFamily.DMSansRegular,
    },

    signupPrevButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: FontFamily.DMSansRegular,
    },

    googleButton: {
        width: 280,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderElevation: 25,
    },

    googleIcon: {
        width: 20,
        height: 20,
        right: 50,
    },

    googleButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: FontFamily.DMSansRegular,
    },

    labelText: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'flex-start', // Align to the right within the container
        marginStart: 7,
        marginBottom: 3,
    },

    selectSectorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%", // Ensure inputs fill available space
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#F0F0F0',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 10,

        // Elevation for shadow effect
        elevation: 3, // Only for Android

        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    cardContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        maxHeight: 200,
        overflow: 'hidden',
    },
    spinnerContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardItem: {
        padding: 15,
        width: "200%",
        paddingVertical: 15,
        paddingHorizontal: 10,
    },

    cardItemText: {
        fontSize: 16,
        color: '#000',
    },

    signInText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 15, // Add spacing above the sign-up text
        color: '#000',
    },

    signInLink: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    emailHighlight: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },

    containerProfie: {
        position: "relative", // Ensures proper overlay positioning
        width: 100, // Adjust to your desired size
        height: 100, // Same as width for a perfect circle
    },

    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 50, // Half of width/height to make it circular
        borderWidth: 2, // Optional: Add a border for styling
        borderColor: "#ccc",
    },
    cameraIcon: {
        position: "absolute",
        bottom: 5, // Align near the bottom
        right: 5, // Align near the right
        backgroundColor: "#000", // Black background for contrast
        borderRadius: 15, // Circular button
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3, // Adds shadow on Android
        shadowColor: "#000", // Shadow for iOS
        shadowOpacity: 0.3,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },

    error: {
        color: 'red',
        marginTop: 5,
    }
});