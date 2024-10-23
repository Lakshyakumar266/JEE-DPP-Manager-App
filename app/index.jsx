import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const HomePage = () => {
  const router = useRouter();


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Champ Daily Practice Set</Text>
        <Text style={styles.subHeaderText}>Gear up for JEE with practice sets!</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/cdps?subject=Physics')}
        >
          <Text style={styles.cardTitle}>Physics</Text>
          <Text style={styles.cardDescription}>Master the concepts and solve physics problems effectively.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/cdps?subject=Chemistry', { subject: 'Chemistry' })}
        >
          <Text style={styles.cardTitle}>Chemistry</Text>
          <Text style={styles.cardDescription}>Deepen your understanding with hands-on chemistry practice.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/cdps?subject=Mathematics', { subject: 'Mathematics' })}
        >
          <Text style={styles.cardTitle}>Mathematics</Text>
          <Text style={styles.cardDescription}>Solve complex math problems and sharpen your skills.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Your future starts today!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
    padding: 20,
  },
  header: {
    marginTop: 35,
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#8d99ae',
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 1,
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2b2d42',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#4a4e69',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#2b2d42',
    fontStyle: 'italic',
  },
});

export default HomePage;
