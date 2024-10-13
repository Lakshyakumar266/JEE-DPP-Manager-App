import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialIcons } from '@expo/vector-icons';


// Sample data for subjects and their corresponding CDPS
const subjects = [
  {
    id: 1,
    title: 'Organic Chemistry',
    cdpList: [
      {
        id: 1,
        name: 'CDPS 1',
        images: [
          require('../../assets/images/star-161984_1280.jpg'),
          require('../../assets/images/icon.png'),
        ],
      },
      {
        id: 2,
        name: 'CDPS 2',
        images: [
          require('../../assets/images/star-161984_1280.jpg'),
          require('../../assets/images/adaptive-icon.png'),
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Inorganic Chemistry',
    cdpList: [
      {
        id: 1,
        name: 'CDPS 1',
        images: [
          require('../../assets/images/partial-react-logo.png'),
        ],
      },
      {
        id: 2,
        name: 'CDPS 2',
        images: [
          require('../../assets/images/star-161984_1280.jpg'),
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Physical Chemistry',
    cdpList: [
      {
        id: 1,
        name: 'CDPS 1',
        images: [
          require('../../assets/images/splash.png'),
          require('../../assets/images/star-161984_1280.jpg'),
        ],
      },
    ],
  },
];

const Maths = () => {
  const [selectedCDP, setSelectedCDP] = useState(null); // To track the selected CDPS
  const [selectedImage, setSelectedImage] = useState(null); // To track the full-screen image

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

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add CDPS pressed')}>
          <MaterialIcons name="add-a-photo" style={styles.addButtonText} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Mathematics CDPS</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Subject List */}
        {subjects.map((subject) => (
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
  topBar: {
    position: 'absolute',
    right: 10,
    bottom: 80,
  },
  addButton: {
    backgroundColor: '#800080',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 25,
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
});

export default Maths;
