import React, { useState, useEffect } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
//Example Usage: <Snackbar visible={true/false} message={"Customer Added Succesfully"} type="success/error" duration={300}/>
const Snackbar = ({ visible, message, type = 'success', duration = 3000 }) => {
    const [show, setShow] = useState(visible);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (visible) {
            setShow(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => setShow(false));
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible, duration, fadeAnim]);

    if (!show) return null;

    const backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';

    return (
        <Animated.View style={[
            styles.container,
            { backgroundColor, opacity: fadeAnim },
            {
                transform: [{
                    translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0]
                    })
                }]
            }
        ]}>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        alignItems: 'center',
    },
    message: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Snackbar;