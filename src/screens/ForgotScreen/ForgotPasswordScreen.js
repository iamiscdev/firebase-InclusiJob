import React, { useState } from 'react';
import { Image } from "expo-image";
import { View, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { sendPasswordResetEmail } from "firebase/auth";

import { auth, db } from "../../firebase/config";

import styles from './styles';
import LoadingModal from "../../utils/LoadingModal";


export default function ForgotForgotScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState("");

    const [isShowingPage1, setIsShowingPage1] = useState(true);
    const [isShowingPage2, setIsShowingPage2] = useState(false);
    const [isShowingPage3, setIsShowingPage3] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(1); // Initial timer value in seconds

    const onSetPage2 = () => {
        setIsShowingPage1(false);
        setIsShowingPage2(true);
        setIsShowingPage3(false);
    };

    const onSetPage3 = () => {
        setIsShowingPage1(false);
        setIsShowingPage2(false);
        setIsShowingPage3(true);
    };

    const onFooterLinkPress = () => {
        navigation.navigate('SignIn');
    }

    const onResetPress = async () => {
        setIsLoading(true);
        try {
            if (!email) {
                setErrorMessage("Email is required.");
                return;
            }

            // Proceed with password reset
            setErrorMessage(""); // Clear error message

            await sendPasswordResetEmail(auth, email);
            setIsShowingPage1(false);
            setIsShowingPage2(true);
            setIsShowingPage3(false);

            // Start the resend timer
            setResendTimer(60); // Reset the timer
            const timerInterval = setInterval(() => {
                setResendTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            // After timer expires, trigger the resend action
            setTimeout(() => {
                clearInterval(timerInterval); // Stop the timer
                // Trigger resend action here
            }, 60000); // 60 seconds

        } catch (error) {
            setErrorMessage(error.message);
            clearInterval(timerInterval); // Clear the timer interval if an error occurs
        } finally {
            setIsLoading(false);
        }
        
    }

    if (isShowingPage1) {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust padding for iOS, height for Android
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200} // Optional offset
            >
                <LinearGradient
                    style={styles.background}
                    colors={["#FFFFFF", "#E0F3FF"]}
                    locations={[0.7, 1]}>

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <SafeAreaView style={styles.container2}>

                            <Image
                                source={require('../../../assets/images/icon.png')}
                                style={styles.image}
                            />

                            <Text style={styles.title}>Forgot Password?</Text>
                            <Text style={styles.subtitle}>Make sure to authenticate your email or mobile number to reset password</Text>

                            <Image
                                source={require('../../../assets/images/man-lock.png')}
                                contentFit='contain'
                                style={styles.imageCenter} />

                            <Text style={styles.labelText}>Email</Text>
                            <View style={styles.inputContainerEmail}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    keyboardType="email-address" />

                                <TouchableOpacity onPress={() => {
                                }} style={styles.iconContainer}>
                                    <Icon name="cancel" size={19} color="#000" />
                                </TouchableOpacity>

                            </View>


                            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                            <TouchableOpacity onPress={(onResetPress)}>
                                <LinearGradient
                                    colors={['#000000', '#1a2a6c']} // Gradient colors (dark to blue)
                                    start={{ x: 0, y: 0 }} // Start gradient from the left
                                    end={{ x: 1, y: 0 }}   // End gradient at the right
                                    style={styles.signupConButton}>

                                    <Text style={styles.signupConButtonText}>RESET PASSWORD</Text>

                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.googleButton} onPress={(onFooterLinkPress)}>
                                <Text style={styles.googleButtonText}>BACK TO LOGIN</Text>
                            </TouchableOpacity>
                            <LoadingModal isVisible={isLoading} />
                        </SafeAreaView>
                    </ScrollView>
                </LinearGradient>
            </KeyboardAvoidingView>
        );
    } else if (isShowingPage2) {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust padding for iOS, height for Android
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200} // Optional offset
            >
                <LinearGradient
                    style={styles.background}
                    colors={["#FFFFFF", "#E0F3FF"]}
                    locations={[0.7, 1]}>

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <SafeAreaView style={styles.container2}>

                            <Image
                                source={require('../../../assets/images/icon.png')}
                                style={styles.image}
                            />

                            <Text style={styles.title}>Check Your Email</Text>
                            <Text style={styles.subtitle}>We have sent the reset password to the email address <Text style={styles.emailHighlight}>{email}</Text></Text>

                            <Image
                                source={require('../../../assets/images/mail-man.png')}
                                contentFit='contain'
                                style={styles.imageCenter} />


                            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                            <TouchableOpacity onPress={(onSetPage3)}>
                                <LinearGradient
                                    colors={['#000000', '#1a2a6c']} // Gradient colors (dark to blue)
                                    start={{ x: 0, y: 0 }} // Start gradient from the left
                                    end={{ x: 1, y: 0 }}   // End gradient at the right
                                    style={styles.signupPrevButton}>

                                    <Text style={styles.signupConButtonText}>EMAIL CHECKED</Text>

                                </LinearGradient>
                            </TouchableOpacity>

                            {resendTimer > 1 ? (
                                <Text style={styles.signInText}>
                                    Email not received? <Text style={styles.signInLink}>
                                        <Text>{resendTimer}s</Text>
                                    </Text>
                                </Text>
                            ) : (
                                <TouchableOpacity onPress={(onResetPress)}>
                                    <Text style={styles.signInText}>
                                        Email not received? <Text style={styles.signInLink}>Resend
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            )}

                        </SafeAreaView>
                        <LoadingModal isVisible={isLoading} />
                    </ScrollView>
                </LinearGradient>
            </KeyboardAvoidingView>
        );
    } else if (isShowingPage3) {

    }
}