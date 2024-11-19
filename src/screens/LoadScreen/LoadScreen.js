import React from 'react';
import { Image } from "expo-image";
import {  View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './styles';

import SplashIcon from '../../../assets/images/splash.png';

const LoadScreen = () => {
    return (
        <LinearGradient
            style={styles.SplashScreen}
            locations={[0, 1]}
            colors={["#13aff1", "#fff"]}>

            <View style={styles.animationSplash}>
                <View style={[styles.icon, styles.iconPosition]}>
                    <Image
                        style={[styles.banner, styles.iconPosition]}
                        contentFit="cover"
                        source={SplashIcon}
                    />
                </View>
            </View>

        </LinearGradient>
    );
};

export default LoadScreen;
