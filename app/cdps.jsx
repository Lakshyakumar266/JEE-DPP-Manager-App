import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Chemistry from '../components/subjects/chemistry';
import Physics from '../components/subjects/physics';
import Maths from '../components/subjects/maths';


const CDPS = () => {
    const router = useRouter();
    // const { subject } = router.query; // Extracting the 'subject' parameter
    const { subject } = useLocalSearchParams();
    console.log(subject);
    

    if (subject === 'Physics') {
        return (<Physics/>)
    } else if (subject === 'Chemistry') {
        return (<Chemistry />)
    } else if (subject === 'Mathematics') {
        return (<Maths />)
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {subject ? `${subject} CDPS` : 'Loading...'}
                </Text>
                <Text style={styles.description}>
                    {subject ? `Here you can find the daily practice sets for ${subject}.` : 'Please wait while we load the content.'}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default CDPS;
