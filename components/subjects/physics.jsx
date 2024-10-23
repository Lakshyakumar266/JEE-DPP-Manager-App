import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { firebase } from '../../config';

const Physics = () => {
  const [CDPS, setCDPS] = useState([]);
  const [selectedCDP, setSelectedCDP] = useState(null); // To track the selected CDPS
  const [selectedImage, setSelectedImage] = useState(null); // To track the full-screen image
  const [loading, setLoading] = useState(true); // Loading state to show a loading screen

  const handleCDPPress = (cdp) => {
    setSelectedCDP(cdp); // Show all images for the selected CDPS
  };

  const handleImagePress = (image) => {
    setSelectedImage(image); // Show the clicked image in full-screen
  };

  const handleCloseImage = () => {
    setSelectedImage(null); // Close the full-screen image modal
  };

  const handleCloseCDPModal = () => {
    setSelectedCDP(null); // Close the CDPS images modal
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      firebase
        .database()
        .ref('subjects')
        .on('value', (snapshot) => {
          const subjectsData = snapshot.val()['Physics'];
          if (subjectsData) {
            // Map the data to the desired format
            const fetchedCDPS = Object.keys(subjectsData).map((key, index) => {
              const subject = subjectsData[key];
              return {
                id: index + 1, // Provide an incremented ID
                title: subject.title,
                cdpList: subject.cdpList.map((cdp, cdpIndex) => ({
                  id: cdpIndex + 1, // Provide an incremented ID for each CDPS
                  name: cdp.name,
                  images: cdp.images.map((imageUrl) => {
                    // You need to handle images carefully depending on how they are stored
                    return { uri: imageUrl }; // Assuming images are URLs from Firebase
                  }),
                })),
              };
            });
            setCDPS(fetchedCDPS); // Set the data in the state
            setLoading(false); // Set loading to false once data is loaded
          }
        });
    };

    fetchData();

    // Clean up the Firebase listener when the component unmounts
    return () => firebase.database().ref('subjects').off();
  }, []);

  const handleImageLoaded = () => {
    setLoading(false); // Set loading to false when images have loaded
  };

  if (loading) {
    // Show a loading spinner while data is loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading CDPS...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Physics CDPS</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Subject List */}
        {CDPS.map((subject) => (
          <View key={subject.id} style={styles.subjectContainer}>
            <Text style={styles.subjectTitle}>{subject.title}</Text>

            {/* CDPS List for the subject */}
            {subject.cdpList.map((cdp) => (
              <TouchableOpacity
                key={cdp.id}
                style={styles.cdpButton}
                onPress={() => handleCDPPress(cdp)}
              >
                <Text style={styles.cdpName}>{cdp.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Modal for showing all images of selected CDPS */}
      {selectedCDP && (
        <Modal visible={true} transparent={true} onRequestClose={handleCloseCDPModal}>
          <TouchableWithoutFeedback onPress={handleCloseCDPModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseCDPModal}>
                <Entypo style={styles.closeButtonText} name="cross" color="#fff" />
              </TouchableOpacity>
              <TouchableWithoutFeedback>
                <View style={styles.cdpContentContainer}>
                  <Text style={styles.modalTitle}>{selectedCDP.name}</Text>
                  <ScrollView contentContainerStyle={styles.imagesGrid}>
                    {selectedCDP.images.map((image, index) => (
                      <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
                        <Image source={image} style={styles.cdpImageThumbnail} onLoad={handleImageLoaded} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/* Full-screen image modal */}
      {selectedImage && (
        <Modal visible={true} transparent={true} onRequestClose={handleCloseImage}>
          <TouchableWithoutFeedback onPress={handleCloseImage}>
            <View style={styles.fullScreenImageContainer}>
              <Image source={selectedImage} style={styles.fullScreenImage} resizeMode="contain" />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#edf2f4', // Match HomePage background
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b2d42', // Match HomePage header color
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  subjectContainer: {
    marginBottom: 20,
  },
  subjectTitle: {
    fontSize: 20,
    color: '#2b2d42', // Match HomePage subject color
    marginBottom: 10,
  },
  cdpButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  cdpName: {
    fontSize: 16,
    color: '#2b2d42', // Match HomePage CDPS color
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 5,
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cdpImageThumbnail: {
    width: 100,
    height: 100,
    margin: 10,
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  fullScreenImage: {
    width: '90%',
    height: '80%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default Physics;
