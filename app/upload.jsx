import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config";
import { Picker } from '@react-native-picker/picker';

const Upload = () => {
  const [image, setImage] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [cdpsName, setCdpsName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects] = useState(["Physics", "Chemistry", "Mathematics"]); // Add more subjects as needed

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  const UploadMedia = async () => {
    if (image.length === 0 || !chapterName || !cdpsName || !selectedSubject) {
      Alert.alert("Please fill all fields and select at least one image.");
      return;
    }

    setUploading(true);
    const imageUrls = [];

    try {
      // Upload images and get URLs
      for (const img of image) {
        const { uri } = img;
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError("Network Request Failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send();
        });

        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const ref = firebase.storage().ref().child(filename);
        await ref.put(blob);

        const downloadURL = await ref.getDownloadURL();
        imageUrls.push(downloadURL);
      }

      // Prepare new CDPS object
      const newCdp = {
        id: Date.now(), // Use a timestamp as a unique ID
        name: cdpsName,
        images: imageUrls,
      };

      // Get current data from Firebase
      const snapshot = await firebase.database().ref('subjects').once('value');
      const data = snapshot.val() || {};

      // Check if the subject already exists
      if (data[selectedSubject]) {
        // If subject exists, check for chapter existence
        if (data[selectedSubject][chapterName]) {
          // If chapter exists, add the new CDPS to that chapter's cdpList
          data[selectedSubject][chapterName].cdpList.push(newCdp);
        } else {
          // If chapter doesn't exist, create a new chapter entry under the subject
          data[selectedSubject][chapterName] = {
            id: Date.now(),
            title: chapterName,
            cdpList: [newCdp],
          };
        }
      } else {
        // If subject doesn't exist, create a new subject entry
        data[selectedSubject] = {
          [chapterName]: {
            id: Date.now(),
            title: chapterName,
            cdpList: [newCdp],
          },
        };
      }

      // Upload the updated data back to Firebase Realtime Database
      await firebase.database().ref('subjects').set(data);
      
      Alert.alert(`${cdpsName} uploaded successfully!`);
      // Reset form
      setImage([]);
      setChapterName("");
      setCdpsName("");
      setSelectedSubject("");
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert('Error uploading data.');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {uploading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#800080" />
            <Text style={styles.loadingText}>Uploading, please wait...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.header}>Add CDPS</Text>

            <TextInput
              style={styles.input}
              placeholder="Chapter Name"
              value={chapterName}
              onChangeText={setChapterName}
            />

            <TextInput
              style={styles.input}
              placeholder="CDPS Name"
              value={cdpsName}
              onChangeText={setCdpsName}
            />

            <Picker
              selectedValue={selectedSubject}
              style={styles.input}
              onValueChange={(itemValue) => setSelectedSubject(itemValue)}
            >
              <Picker.Item label="Select a Subject" value="" />
              {subjects.map((subject, index) => (
                <Picker.Item key={index} label={subject} value={subject} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
              <Text style={styles.imagePickerText}>Select Images</Text>
            </TouchableOpacity>

            <View style={styles.imagePreviewContainer}>
              {image.map((img, index) => (
                <Image key={index} source={{ uri: img.uri }} style={styles.imagePreview} />
              ))}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={UploadMedia}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#edf2f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  imagePickerButton: {
    backgroundColor: '#800080',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#800080',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#800080',
  },
});

export default Upload;
