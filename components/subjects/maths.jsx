import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as FileSystem from 'expo-file-system'; // Import expo-file-system

import { firebase } from '../../config'; // Make sure firebase is properly initialized in your project

const Maths = () => {
  const [CDPS, setCDPS] = useState([]); // State to store fetched CDPS
  const [selectedCDP, setSelectedCDP] = useState(null); // State to track selected CDPS
  const [selectedImage, setSelectedImage] = useState(null); // State to track the full-screen image
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch data from Firebase on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      firebase
        .database()
        .ref('subjects')
        .on('value', (snapshot) => {
          const subjectsData = snapshot.val()['Mathematics'];
          if (subjectsData) {
            const fetchedCDPS = Object.keys(subjectsData).map((key, index) => {
              const subject = subjectsData[key];
              return {
                id: index + 1,
                title: subject.title,
                cdpList: subject.cdpList.map((cdp, cdpIndex) => ({
                  id: cdpIndex + 1,
                  name: cdp.name,
                  images: cdp.images.map((imageUrl) => {
                    return { uri: imageUrl };
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
    return () => firebase.database().ref('subjects').off();
  }, []);

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

  // Function to download all images of selected CDPS
  const downloadCDPSImages = async () => {
    if (!selectedCDP) return;

    const downloadPromises = selectedCDP.images.map(async (image) => {
      const uri = image.uri;
      const fileUri = FileSystem.documentDirectory + uri.split('/').pop(); // Generate a file name based on the image URL

      try {
        // Set the directory path inside the app's document directory
        const directoryUri = `${FileSystem.documentDirectory}CDPS_Manager/`;
        await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
    
        // Define the file name (you can customize this as needed)
        const fileName = `cdps_${new Date().getTime()}.jpeg`; // example filename with timestamp
        const fileUri = `${directoryUri}${fileName}`;
    
        // Start the download
        const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);
        console.log('Finished downloading to ', localUri);
        
        // Optionally show a success message here
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    
    });

    await Promise.all(downloadPromises);
    Alert.alert('Success', 'All images downloaded successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mathematics CDPS</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2b2d42" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {CDPS.map((subject) => (
            <View key={subject.id} style={styles.subjectContainer}>
              <Text style={styles.subjectTitle}>{subject.title}</Text>
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
      )}

      {selectedCDP && (
        <Modal visible={true} transparent={true} onRequestClose={handleCloseCDPModal}>
          <TouchableWithoutFeedback onPress={handleCloseCDPModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseCDPModal}>
                <Entypo style={styles.closeButtonText} name="cross" color="black" />
              </TouchableOpacity>
              <TouchableWithoutFeedback>
                <View style={styles.cdpContentContainer}>
                  <Text style={styles.modalTitle}>{selectedCDP.name}</Text>
                  <ScrollView contentContainerStyle={styles.imagesGrid}>
                    {selectedCDP.images.map((image, index) => (
                      <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
                        <Image source={image} style={styles.cdpImageThumbnail} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity style={styles.downloadButton} onPress={downloadCDPSImages}>
                    <Text style={styles.downloadButtonText}>Download All Images</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

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
    backgroundColor: '#edf2f4',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b2d42',
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
    color: '#2b2d42',
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
    color: '#2b2d42',
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
  downloadButton: {
    backgroundColor: '#2b2d42',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
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
});

export default Maths;
