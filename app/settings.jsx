import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const Settings = () => {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <TouchableOpacity style={styles.option}
                onPress={() => router.push('/profile')}>
                <MaterialIcons name="person" size={24} color="#2b2d42" />
                <Text style={styles.optionText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <MaterialIcons name="notifications" size={24} color="#2b2d42" />
                <Text style={styles.optionText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <MaterialIcons name="security" size={24} color="#2b2d42" />
                <Text style={styles.optionText}>Security</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <MaterialIcons name="language" size={24} color="#2b2d42" />
                <Text style={styles.optionText}>Language</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <MaterialIcons name="feedback" size={24} color="#2b2d42" />
                <Text style={styles.optionText}>Feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
                <MaterialIcons name="help" size={24} color="#2b2d42" />
                <Text style={styles.optionText}>Help</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}
                onPress={() => router.push('/profile')}>
                <MaterialIcons name="info" size={24} color="#2b2d42" />
                <Text style={styles.optionText}>About</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edf2f4', // Matches the HomePage background
        padding: 20,
    },
    header: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2b2d42', // Matches the HomePage header text color
        marginBottom: 5,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    optionText: {
        fontSize: 19,
        color: '#2b2d42', // Matches the HomePage card title color
        marginLeft: 15,
    },
});

export default Settings;
