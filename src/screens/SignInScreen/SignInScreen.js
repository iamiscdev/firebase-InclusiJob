import React, { useState } from 'react';
import { Image } from "expo-image";
import { View, KeyboardAvoidingView, Platform, ScrollView , Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signInWithEmailAndPassword } from "firebase/auth";

import {auth, db} from "../../firebase/config";
import {doc, getDoc} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from './styles';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoadingModal from "../../utils/LoadingModal";


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onFooterLinkPress = () => {
        navigation.navigate('SignUp');
    }

    const onLoginPress = async () => {
        setIsLoading(true);
        try {

            if (!email || !password) {
                setErrorMessage("Email and password are required.");
                return; // Exit the function if fields are empty
            }

            // Proceed with login or any other action
            setErrorMessage(""); // Clear error message

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            const userDoc = await getDoc(doc(db, 'users', uid));

            if (!userDoc.exists()) {
                alert("User does not exist anymore.");
                return;
            }
            const userData = userDoc.data();
            await AsyncStorage.setItem('user', JSON.stringify(userData));  // Save user data
            navigation.navigate('Tabs', {
                screen: 'Home',
                params: { userData },
            });
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust padding for iOS, height for Android
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200} // Optional offset
        >
            <LinearGradient
                style={styles.background}
                colors={["#FFFFFF", "#E0F3FF"]}
                locations={[0, 1]}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView style={styles.container}>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={styles.image}
                            contentFit="contain"
                        />

                        <Text style={styles.title}>Welcome Back</Text>

                        <Text style={styles.labelText}>Email</Text>
                        <View style={styles.inputContainerEmail}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                value={email}
                                onChangeText={text => setEmail(text)}
                                keyboardType="email-address"/>

                            <TouchableOpacity onPress={() => {
                            }} style={styles.iconContainer}>
                                <Icon name="cancel" size={19} color="#000"/>
                            </TouchableOpacity>

                        </View>

                        <Text style={styles.labelText}>Password</Text>
                        <View style={styles.inputContainerPassword}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Password"
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry
                            />

                            <TouchableOpacity onPress={() => {
                            }} style={styles.iconContainer}>
                                <Icon name="visibility" size={19} color="#000"/>
                            </TouchableOpacity>

                        </View>

                        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                        <TouchableOpacity style={{width: "100%"}} onPress={() => {
                        }}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={(onLoginPress)}>
                            <LinearGradient
                                colors={['#000000', '#1a2a6c']} // Gradient colors (dark to blue)
                                start={{x: 0, y: 0}} // Start gradient from the left
                                end={{x: 1, y: 0}}   // End gradient at the right
                                style={styles.loginButton}>

                                <Text style={styles.loginButtonText}>LOGIN</Text>

                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
                            <Image
                                source={require("../../../assets/images/google_logo.png")}
                                style={styles.googleIcon}/>

                            <Text style={styles.googleButtonText}>CONTINUE WITH GOOGLE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={( onFooterLinkPress )}>
                            <Text style={styles.signUpText}>
                                Don’t have an account yet? <Text style={styles.signUpLink}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                    <LoadingModal isVisible={isLoading} />
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>

    );
}
