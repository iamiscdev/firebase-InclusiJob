import React, { useState } from 'react';
import { Image } from "expo-image";
import { View, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for the camera icon
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { auth, db } from "../../firebase/config";
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from './styles';
import LoadingModal from "../../utils/LoadingModal";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSectorValue, setSectorSelectedValue] = useState(null);

    const sectorValue = [
        { label: 'Persons with Disabilities', value: 'Persons with Disabilities' },
        { label: 'Senior Citizen', value: 'Senior Citizen' },
        { label: 'Youth', value: 'Youth' },
        { label: 'Marginalized Sector', value: 'Marginalized Sector' },
    ];

    const handleSelectItem = (value) => {
        setSectorSelectedValue(value);
        setDropdownOpen(false);
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [showSignupScreenPage1, setShowSignupScreenPage1] = useState(true); // State to toggle views
    const [showSignupScreenPage2, setShowSignupScreenPage2] = useState(false); // State to toggle views
    const [showSignupScreenPage3, setShowSignupScreenPage3] = useState(false); // State to toggle views
    const [showSignupScreenPage4, setShowSignupScreenPage4] = useState(false); // State to toggle views
    const [showSignupScreenPage5, setShowSignupScreenPage5] = useState(false); // State to toggle views


    const previousCreate = () => {

        setShowSignupScreenPage1(true);
        setShowSignupScreenPage2(false);
        setShowSignupScreenPage3(false);
        setShowSignupScreenPage4(false);
        setShowSignupScreenPage5(false);
    }

    const previousAdditional = () => {

        setShowSignupScreenPage1(false);
        setShowSignupScreenPage2(true);
        setShowSignupScreenPage3(false);
        setShowSignupScreenPage4(false);
        setShowSignupScreenPage5(false);
    }

    const previousSector = () => {

        setShowSignupScreenPage1(false);
        setShowSignupScreenPage2(false);
        setShowSignupScreenPage3(true);
        setShowSignupScreenPage4(false);
        setShowSignupScreenPage5(false);
    }

    const previousProfile = () => {

        setShowSignupScreenPage1(false);
        setShowSignupScreenPage2(false);
        setShowSignupScreenPage3(false);
        setShowSignupScreenPage4(true);
        setShowSignupScreenPage5(false);
    }

    const continueAdditional = () => {

        if (!email && !password && !fullName) {
            setErrorMessage("All field are required.");
            return; // Exit the function if fields are empty
        }

        // Proceed with login or any other action
        setErrorMessage(""); // Clear error message
        setShowSignupScreenPage1(false);
        setShowSignupScreenPage2(true);
        setShowSignupScreenPage3(false);
        setShowSignupScreenPage4(false);
        setShowSignupScreenPage5(false);
    }

    const continueSector = () => {

        if (!phoneNumber && !address && !postalCode && !birthDate) {
            setErrorMessage("All field are required.");
            return; // Exit the function if fields are empty
        }

        // Proceed with login or any other action
        setErrorMessage(""); // Clear error message
        setShowSignupScreenPage1(false);
        setShowSignupScreenPage2(false);
        setShowSignupScreenPage3(true);
        setShowSignupScreenPage4(false);
        setShowSignupScreenPage5(false);
    }

    const continueProfile = () => {

        if (!selectedSectorValue) {
            setErrorMessage("Choose sector first");
            return; // Exit the function if fields are empty
        }

        // Proceed with login or any other action
        setErrorMessage(""); // Clear error message
        setShowSignupScreenPage1(false);
        setShowSignupScreenPage2(false);
        setShowSignupScreenPage3(false);
        setShowSignupScreenPage4(true);
        setShowSignupScreenPage5(false);
    }

    const onFooterLinkPress = () => {
        navigation.navigate('SignIn');
    }

    const continueCreated = async () => {
        if (!fullName && !email && !birthDate && !selectedSectorValue) {
            setErrorMessage("All field are required.");
            return; // Exit the function if fields are empty
        }

        // Proceed with login or any other action
        setErrorMessage(""); // Clear error message

        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const data = {
                id: uid,
                email,
                fullName,
                birthDate,
                phoneNumber,
                address,
                postalCode,
                selectedSectorValue,
            };

            await setDoc(doc(db, 'users', uid), data);

            setShowSignupScreenPage1(false);
            setShowSignupScreenPage2(false);
            setShowSignupScreenPage3(false);
            setShowSignupScreenPage4(false);
            setShowSignupScreenPage5(true);

        } catch (error) {
            alert(error.message);

        } finally {
            setIsLoading(false);
        }
    }

    if (showSignupScreenPage1) {
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

                            <Text style={styles.title}>Create an Account</Text>
                            <Text style={styles.subtitle}>PERSONAL INFORMATION</Text>


                            <Text style={styles.labelText}>Full name</Text>
                            <View style={styles.inputContainerEmail}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="e.g Isaac Rei"
                                    value={fullName}
                                    onChangeText={text => setFullName(text)}
                                    keyboardType="default" />

                                <TouchableOpacity onPress={() => {
                                }} style={styles.iconContainer}>
                                    <Icon name="cancel" size={19} color="#000" />
                                </TouchableOpacity>

                            </View>

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
                                    <Icon name="visibility" size={19} color="#000" />
                                </TouchableOpacity>

                            </View>


                            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                            <TouchableOpacity onPress={(continueAdditional)}>
                                <LinearGradient
                                    colors={['#000000', '#1a2a6c']} // Gradient colors (dark to blue)
                                    start={{ x: 0, y: 0 }} // Start gradient from the left
                                    end={{ x: 1, y: 0 }}   // End gradient at the right
                                    style={styles.signupConButton}>

                                    <Text style={styles.signupConButtonText}>CONTINUE</Text>

                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.googleButton} onPress={() => { }}>
                                <Image
                                    source={require("../../../assets/icons/google-icon.png")}
                                    style={styles.googleIcon} />

                                <Text style={styles.googleButtonText}>CONTINUE WITH GOOGLE</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={(onFooterLinkPress)}>
                                <Text style={styles.signInText}>
                                    Already have an account? <Text style={styles.signInLink}>Log In</Text>
                                </Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </ScrollView>
                </LinearGradient>
            </KeyboardAvoidingView>
        );
    } else if (showSignupScreenPage2) {
        return (<KeyboardAvoidingView
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

                        <Text style={styles.title}>Additional Information</Text>
                        <Text style={styles.subtitleUnderProg}>PERSONAL INFORMATION</Text>

                        <Image
                            source={require('../../../assets/images/progress-bar-0.png')}
                            style={styles.progressBar}
                            contentFit="contain"
                        />

                        <Text style={styles.labelText}>Phone number</Text>
                        <View style={styles.inputContainerText}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g: (+63) 123-456-7890"
                                value={phoneNumber}
                                onChangeText={number => setPhoneNumber(number)}
                                keyboardType="number-pad" />

                            <TouchableOpacity onPress={() => {
                            }} style={styles.iconContainer}>
                                <Icon name="cancel" size={19} color="#000" />
                            </TouchableOpacity>

                        </View>

                        <Text style={styles.labelText}>Address</Text>
                        <View style={styles.inputContainerText}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g: 938 Aurora Boulevard, Cubao, Quezon City"
                                value={address}
                                onChangeText={text => setAddress(text)}
                                keyboardType="default" />

                            <TouchableOpacity onPress={() => {
                            }} style={styles.iconContainer}>
                                <Icon name="cancel" size={19} color="#000" />
                            </TouchableOpacity>

                        </View>

                        <Text style={styles.labelText}>Postal code</Text>
                        <View style={styles.inputContainerText}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g: 1010"
                                value={postalCode}
                                onChangeText={text => setPostalCode(text)}
                                keyboardType="number-pad" />

                            <TouchableOpacity onPress={() => {
                            }} style={styles.iconContainer}>
                                <Icon name="cancel" size={19} color="#000" />
                            </TouchableOpacity>

                        </View>

                        <Text style={styles.labelText}>Date of birth</Text>
                        <View style={styles.inputContainerText}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="(mm/dd/yyyy)"
                                value={birthDate}
                                onChangeText={text => setBirthDate(text)}
                                keyboardType="number-pad" />

                            <TouchableOpacity onPress={() => {
                            }} style={styles.iconContainer}>
                                <Icon name="event" size={19} color="#5F5F5F" />
                            </TouchableOpacity>

                        </View>

                        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                        <TouchableOpacity style={styles.signupPrevButton} onPress={(previousCreate)}>
                            <Text style={styles.signupPrevButtonText}>PREVIOUS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(continueSector)}>
                            <LinearGradient
                                colors={['#000000', '#1a2a6c']} // Gradient colors (dark to blue)
                                start={{ x: 0, y: 0 }} // Start gradient from the left
                                end={{ x: 1, y: 0 }}   // End gradient at the right
                                style={styles.signupConButton}>

                                <Text style={styles.signupConButtonText}>CONTINUE</Text >

                            </LinearGradient>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
        );
    } else if (showSignupScreenPage3) {
        return (
            <LinearGradient
                style={styles.background}
                colors={["#FFFFFF", "#E0F3FF"]}
                locations={[0.7, 1]}>

                <SafeAreaView style={styles.container2}>

                    <View style={styles.container3}>
                        <Image
                            source={require('../../../assets/images/icon.png')}
                            style={styles.image2}
                        />

                        <Image
                            source={require('../../../assets/images/sector_icon.png')}
                            contentFit="contain"
                            style={styles.image3}
                        />
                    </View>



                    <Text style={styles.title}>Choose Sector</Text>
                    <Text style={styles.subtitleUnderProg}>Make sure to choose which group you classify</Text>

                    <Image
                        source={require('../../../assets/images/progress-bar-1.png')}
                        style={styles.progressBar}
                        contentFit="contain"
                    />


                    <View style={styles.selectSectorContainer}>

                        <TouchableOpacity
                            onPress={() => setDropdownOpen(!dropdownOpen)}
                            style={styles.textInput}
                        >

                            <Text style={styles.selectSectorText}>{selectedSectorValue ? `Selected: ${selectedSectorValue}` : 'Select'}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                        }} style={styles.iconContainer}>
                            <Icon name="keyboard-arrow-down" size={19} color="#5F5F5F" />
                        </TouchableOpacity>

                    </View>

                    {dropdownOpen && (
                        <View style={styles.cardContainer}>
                            <FlatList
                                data={sectorValue}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handleSelectItem(item.value)}
                                        style={styles.cardItem}
                                    >
                                        <Text style={styles.cardItemText}>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.value}
                            />
                        </View>
                    )}

                    {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                    <TouchableOpacity style={styles.signupSectorPrevButton} onPress={(previousAdditional)}>
                        <Text style={styles.signupPrevButtonText}>PREVIOUS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={(continueProfile)}>
                        <LinearGradient
                            colors={['#000000', '#1a2a6c']} // Gradient colors (dark to blue)
                            start={{ x: 0, y: 0 }} // Start gradient from the left
                            end={{ x: 1, y: 0 }}   // End gradient at the right
                            style={styles.signupConButton}>

                            <Text style={styles.signupConButtonText}>CONTINUE</Text>

                        </LinearGradient>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        );
    } else if (showSignupScreenPage4) {
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

                            <Text style={styles.title}>Profile</Text>
                            <Text style={styles.subtitleUnderProg}>Finalization and a summary of your profile</Text>

                            <Image
                                source={require('../../../assets/images/progress-bar-2.png')}
                                style={styles.progressBar}
                                contentFit="contain"
                            />

                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.containerProfie}>
                                    {/* Profile Picture */}
                                    <Image
                                        source={{
                                            uri: "https://lh3.googleusercontent.com/a/ACg8ocL7Qolb0XP4DhMXv1YWf6OP1TmSAnmqm4Z_iOA7gk2UQXtjNQ=s288-c-no", // Replace with the actual image URL
                                        }}
                                        style={styles.profileImage}
                                    />

                                    {/* Camera Icon Overlay */}
                                    <TouchableOpacity style={styles.cameraIcon}>
                                        <Ionicons name="camera" size={20} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>

                            <Text style={styles.labelText}>Full name</Text>
                            <View style={styles.inputContainerEmail}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="e.g Isaac Rei"
                                    value={fullName}
                                    onChangeText={text => setFullName(text)}
                                    keyboardType="default" />

                                <TouchableOpacity onPress={() => {
                                }} style={styles.iconContainer}>
                                    <Icon name="cancel" size={19} color="#000" />
                                </TouchableOpacity>

                            </View>

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

                            <Text style={styles.labelText}>Date of birth</Text>
                            <View style={styles.inputContainerText}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="(mm/dd/yyyy)"
                                    value={birthDate}
                                    onChangeText={text => setBirthDate(text)}
                                    keyboardType="number-pad" />

                                <TouchableOpacity onPress={() => {
                                }} style={styles.iconContainer}>
                                    <Icon name="event" size={19} color="#5F5F5F" />
                                </TouchableOpacity>

                            </View>

                            <Text style={styles.labelText}>Sector</Text>
                            <View style={styles.inputContainerText}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="e.g: Youth"
                                    value={selectedSectorValue}
                                    onChangeText={text => setSectorSelectedValue(text)}
                                    keyboardType="default" />

                                <TouchableOpacity onPress={() => {
                                }} style={styles.iconContainer}>
                                    <Icon name="cancel" size={19} color="#000" />
                                </TouchableOpacity>

                            </View>


                            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                            <TouchableOpacity style={styles.signupPrevButton} onPress={(previousSector)}>
                                <Text style={styles.signupPrevButtonText}>PREVIOUS</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={(continueCreated)}>
                                <LinearGradient
                                    colors={['#000000', '#1a2a6c']} // Gradient colors (dark to blue)
                                    start={{ x: 0, y: 0 }} // Start gradient from the left
                                    end={{ x: 1, y: 0 }}   // End gradient at the right
                                    style={styles.signupConButton}>

                                    <Text style={styles.signupConButtonText}>CONTINUE</Text >

                                </LinearGradient>
                            </TouchableOpacity>
                        </SafeAreaView>
                        <LoadingModal isVisible={isLoading} />
                    </ScrollView>
                </LinearGradient>
            </KeyboardAvoidingView>
        );
    } else if (showSignupScreenPage5) {
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

                            <Text style={styles.title}>Account Created</Text>
                            <Text style={styles.subtitleUnderProg}>Your account has been successfully created! Find your future here at InclusiJob!</Text>

                            <Image
                                source={require('../../../assets/images/mail-man.png')}
                                style={styles.imageCenter} />

                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <LinearGradient
                                    colors={['#000000', '#1a2a6c']} // Gradient colors (dark to blue)
                                    start={{ x: 0, y: 0 }} // Start gradient from the left
                                    end={{ x: 1, y: 0 }}   // End gradient at the right
                                    style={styles.signupConButton}>

                                    <Text style={styles.signupConButtonText}>LOGIN</Text >

                                </LinearGradient>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </ScrollView>
                </LinearGradient>
            </KeyboardAvoidingView>
        );
    }
}
