import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useFonts } from "expo-font";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NotificationScreen, BookmarkScreen, HomeScreen2, SignInScreen, SignUpScreen } from './src/screens';
import ForgotForgotScreen from './src/screens/ForgotScreen/ForgotPasswordScreen';
import LoadScreen from './src/screens/LoadScreen/LoadScreen';

import {decode, encode} from 'base-64';

import BellIcon from './assets/icons/bell.png';
import HomeIcon from './assets/icons/home.png';
import BookmarkIcon from './assets/icons/bookmark.png';
import { Image } from 'react-native';
import {Text, View} from "react-native";

if (!global.btoa) {
    global.btoa = encode
}
if (!global.atob) {
    global.atob = decode
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const auth = getAuth();
const db = getFirestore();

export default function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const [fontsLoaded, error] = useFonts({
        "Inter-SemiBold": require("./assets/fonts/inter/Inter-SemiBold.ttf"),
        "Inter-Bold": require("./assets/fonts/inter/Inter-Bold.ttf"),
        "DMSans-SemiBold": require("./assets/fonts/dm_sans/DMSans-SemiBold.ttf"),
        "DMSans-Bold": require("./assets/fonts/dm_sans/DMSans-Bold.ttf"),
        "DMSans-Regular": require("./assets/fonts/dm_sans/DMSans-Regular.ttf"),
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = doc(db, 'users', user.uid);
                    const docSnapshot = await getDoc(userDoc);
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setUser(userData);
                    } else {
                        setUser(null); // User document doesn't exist
                    }
                } catch (error1) {
                    console.error('Error fetching user data:', error1);
                }
            } else {
                setUser(null); // No authenticated user
            }

            if(fontsLoaded) {
                const timer = setTimeout(() => {
                    setLoading(false); // Hide splash screen after fonts are loaded
                }, 3000); // 3 seconds duration
    
                return () => clearTimeout(timer); // Cleanup timer
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();

    }, [fontsLoaded]);

    if (error) {
        return <Text>Error: {error.message}</Text>; // Display error message
    }

    if (loading) {
        return <LoadScreen />; // or a loading indicator
    }

    function SearchScreen() {
        return (
            <View>
                <Text>Search Screen</Text>
            </View>
        );
    }

    function ProfileScreen() {
        return (
            <View>
                <Text>Profile Screen</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              // If the user is authenticated, show the bottom tabs
              <>
                <Stack.Screen
                  name="Tabs"
                  options={{ headerShown: false }}
                >
                  {() => (
                    <Tab.Navigator
                      initialRouteName="Home"
                      screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                          let source;
                          if (route.name === 'Home') {
                            source = HomeIcon;
                          } else if (route.name === 'Notification') {
                            source = BellIcon;
                          } else if (route.name === 'Bookmark') {
                            source = BookmarkIcon;
                          }
    
                          return (
                            <Image
                              source={source}
                              style={{
                                width: size,
                                height: size,
                                tintColor: color, // Apply color tint
                              }}
                              resizeMode="contain"
                            />
                          );
                        },
                        tabBarLabel: () => null, // Disable the label (text)
                        tabBarSize: 24, // Customize tab icon size
                        tabBarHideOnKeyboard: true, // Hide tab bar on keyboard
                        tabBarStyle: {
                          backgroundColor: '#FFFFFF', // Customize tab bar background color
                          borderTopColor: '#A49EB5', // Customize border color
                          borderTopWidth: 1, // Customize border width
                        },
                        tabBarActiveTintColor: '#002974', // Customize active tab icon color
                        tabBarInactiveTintColor: '#A49EB5', // Customize inactive tab icon color
                      })}
                    >
                      <Tab.Screen name="Notification" component={ NotificationScreen } options={{ headerShown: false }} />
                      <Tab.Screen name="Home" options={{ headerShown: false }}>
                        {props => <HomeScreen2 {...props} extraData={user} />}
                      </Tab.Screen>
                      <Tab.Screen name="Bookmark" component={ BookmarkScreen } options={{ headerShown: false }}/>
                    </Tab.Navigator>
                  )}
                </Stack.Screen>

                <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotForgotScreen} options={{ headerShown: false }} />
              </>
            ) : (
              // If the user is not authenticated, show the login screens
              <>
                <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotForgotScreen} options={{ headerShown: false }} />

                <Stack.Screen
                  name="Tabs"
                  options={{ headerShown: false }}
                >
                  {() => (
                    <Tab.Navigator
                      initialRouteName="Home"
                      screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                          let source;
                          if (route.name === 'Home') {
                            source = HomeIcon;
                          } else if (route.name === 'Notification') {
                            source = BellIcon;
                          } else if (route.name === 'Bookmark') {
                            source = BookmarkIcon;
                          }
    
                          return (
                            <Image
                              source={source}
                              style={{
                                width: size,
                                height: size,
                                tintColor: color, // Apply color tint
                              }}
                              resizeMode="contain"
                            />
                          );
                        },
                        tabBarLabel: () => null, // Disable the label (text)
                        tabBarSize: 24, // Customize tab icon size
                        tabBarHideOnKeyboard: true, // Hide tab bar on keyboard
                        tabBarStyle: {
                          backgroundColor: '#FFFFFF', // Customize tab bar background color
                          borderTopColor: '#A49EB5', // Customize border color
                          borderTopWidth: 1, // Customize border width
                        },
                        tabBarActiveTintColor: '#002974', // Customize active tab icon color
                        tabBarInactiveTintColor: '#A49EB5', // Customize inactive tab icon color
                      })}
                    >
                      <Tab.Screen name="Notification" component={SearchScreen} />
                      <Tab.Screen name="Home" options={{ headerShown: false }}>
                        {props => <HomeScreen2 {...props} extraData={user} />}
                      </Tab.Screen>
                      <Tab.Screen name="Bookmark" component={ProfileScreen} />
                    </Tab.Navigator>
                  )}
                </Stack.Screen>
                
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      );
}