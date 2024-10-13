import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const Profile = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="user" size={100} color="#3b3b3b" />
                <Text style={styles.name}>Lakshya Kumar</Text>
                <Text style={styles.bio}>Aspiring Developer | JEE Aspirant</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <MaterialIcons name="email" size={24} color="#737373" />
                    <Text style={styles.detailText}>lakshya@codingprogamer.tech</Text>
                </View>
                <View style={styles.detailRow}>
                    <MaterialIcons name="phone" size={24} color="#737373" />
                    <Text style={styles.detailText}>+123 456 7890</Text>
                </View>
                <View style={styles.detailRow}>
                    <MaterialIcons name="location-on" size={24} color="#737373" />
                    <Text style={styles.detailText}>Ranchi, Jharkhand</Text>
                </View>
            </View>

            <View style={styles.aboutContainer}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <Text style={styles.aboutText}>
                    I am a passionate developer with a keen interest in building web and mobile applications.
                    I am currently preparing for the JEE exams and love to solve complex problems.
                </Text>
            </View>

            <View style={styles.skillsContainer}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsRow}>
                    <Text style={styles.skill}>JavaScript</Text>
                    <Text style={styles.skill}>React Native</Text>
                    <Text style={styles.skill}>Python</Text>
                </View>
                <View style={styles.skillsRow}>
                    <Text style={styles.skill}>HTML & CSS</Text>
                    <Text style={styles.skill}>Node.js</Text>
                    <Text style={styles.skill}>SQL</Text>
                </View>
            </View>

            <View style={styles.achievementsContainer}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <Text style={styles.achievement}>🏆 Completed a full-stack web development course</Text>
                <Text style={styles.achievement}>🎓 Completed App development course on Java/React Native.</Text>
                <Text style={styles.achievement}>💡 Developed many apps for different purposes</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edf2f4', // Use same background color as HomePage
        padding: 20,
        marginTop: 30,
    },
    header: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2b2d42', // Same color as card title in HomePage
        marginTop: 10,
    },
    bio: {
        fontSize: 16,
        color: '#8d99ae', // Similar color to subheader text
        textAlign: 'center',
        marginVertical: 5,
    },
    detailsContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        color: '#737373',
        marginLeft: 10,
    },
    aboutContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2b2d42', // Same color as card title
        marginBottom: 10,
    },
    aboutText: {
        fontSize: 16,
        color: '#737373',
    },
    skillsContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        marginBottom: 20,
    },
    skillsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    skill: {
        fontSize: 16,
        color: '#737373',
        backgroundColor: '#e0f7fa', // Light background for skill badges
        padding: 10,
        borderRadius: 5,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 5,
    },
    achievementsContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        marginBottom: 90,
    },
    achievement: {
        fontSize: 16,
        color: '#737373',
        marginBottom: 6,
    },
});

export default Profile;
