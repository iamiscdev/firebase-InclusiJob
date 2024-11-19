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

    image: {
        width: 200,
        height: 200,
        marginBottom: 0, // Add some spacing below the logo
    },

    title: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: FontFamily.interBold,
        textAlign: 'center',
        color: '#333',
        marginBottom: 5, // Adjust spacing between title and subtitle
    },

    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
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

    inputContainerPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%", // Ensure inputs fill available space
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#F0F0F0',
        backgroundColor: '#F0F0F0',
        marginBottom: 7,
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
        fontSize: 16,
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

    loginButton: {
        width: 280,
        height: 42,
        backgroundColor: '#000', // black color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
    },

    loginButtonText: {
        color: '#FFFFFF',
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

    forgotPassword: {
        color: '#000',
        fontSize: 16,
        textAlign: 'right',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end', // Align to the right within the container
        marginBottom: 20,
    },

    signUpText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50, // Add spacing above the sign-up text
        color: '#000',
    },

    signUpLink: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    error: {
        color: 'red',
        marginBottom: 12,
    }

});