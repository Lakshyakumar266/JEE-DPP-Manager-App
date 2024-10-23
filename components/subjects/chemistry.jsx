import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { firebase } from '../../config';

const Chemistry = () => {
  const [CDPS, setCDPS] = useState([]);
  const [selectedCDP, setSelectedCDP] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCDPPress = (cdp) => {
    setSelectedCDP(cdp);
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleCloseCDPModal = () => {
    setSelectedCDP(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      firebase
        .database()
        .ref('subjects')
        .on('value', (snapshot) => {
          const subjectsData = snapshot.val()['Chemistry'];
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
            setCDPS(fetchedCDPS);
          }
        });
    };
    fetchData();
    return () => firebase.database().ref('subjects').off();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chemistry CDPS</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {CDPS.map((subject) => (
          <View key={subject.id} style={styles.subjectContainer}>
            <Text style={styles.subjectTitle}>{subject.title}</Text>
            {subject.cdpList.map((cdp) => (
              <TouchableOpacity key={cdp.id} style={styles.cdpButton} onPress={() => handleCDPPress(cdp)}>
                <Text style={styles.cdpName}>{cdp.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

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
    backgroundColor: 'rgba(0, 0, 0, 0.90)',
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

export default Chemistry;
