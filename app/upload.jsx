import React, { useState } from "react";
import * as ImageManipulator from 'expo-image-manipulator';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, ScrollView, TextInput, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../lib/supabase"; // Adjust this path if your supabase.js file is located elsewhere

const Upload = () => {
  const [image, setImage] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [cdpsName, setCdpsName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects] = useState(["Physics", "Chemistry", "Mathematics"]); // Add more subjects as needed

  const convertImageToJpeg = async (uri) => {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
  };


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const jpegImages = await Promise.all(
        result.assets.map(async (asset) => {
          const jpegUri = await convertImageToJpeg(asset.uri);
          return { ...asset, uri: jpegUri };
        })
      );
      setImage(jpegImages);
    }
  };


  const uploadImagesToSupabase = async () => {
    setUploading(true);
    const imageUrls = [];
  
    try {
      for (const img of image) {
        const { uri } = img;
        console.log("uri:", uri);
  
        // Use the URI directly without converting to a blob
        const fileName = `${Date.now()}-${uri.split("/").pop()}`;
        console.log("Uploading image:", fileName);
  
        // Upload to Supabase Storage
        console.log("Uploading image to Supabase Storage...");
  
        const { data, error } = await supabase.storage
          .from("cdps-images")
          .upload(fileName, uri, {
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/jpeg'
          });
        console.log("Uploaded image to Supabase Storage:", data);
  
        if (error) throw error;
        console.log("Getting public URL for image...");
  
        const { data: publicUrlData } = supabase.storage
          .from("cdps-images")
          .getPublicUrl(fileName);
        console.log("Got public URL for image:", publicUrlData);
  
        imageUrls.push(publicUrlData.publicUrl);
      }
  
      return imageUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      Alert.alert("Error uploading images.");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const storeMetadataInSupabase = async (imageUrls) => {
    try {
      // Ensure subject exists
      let { data: subject, error: subjectError } = await supabase
        .from("subjects")
        .select("id")
        .eq("name", selectedSubject)
        .single();
  
      console.log("Subject Query Result:", subject, subjectError);
  
      if (!subject) {
        console.log("Inserting new subject:", selectedSubject);
  
        const { data, error } = await supabase
          .from("subjects")
          .insert({ name: selectedSubject })
          .single();
  
        if (error) {
          console.error("Error inserting subject:", error.message);
          console.error("Full error details:", error);
          throw error;
        }
        
        subject = data;
      }
  
      console.log("Subject after insert:", subject);
  
      // Ensure chapter exists
      const { data: chapterData, error: chapterError } = await supabase
        .from("chapters")
        .select("id")
        .eq("subject_id", subject.id)
        .eq("name", chapterName);
  
      console.log("Chapters Query Result:", chapterData, chapterError);
  
      let chapter = null;
  
      if (chapterData && chapterData.length === 1) {
        chapter = chapterData[0]; // If one row is returned, use it
      } else if (chapterData && chapterData.length === 0) {
        // No rows, create the chapter
        const { data: newChapter, error: insertError } = await supabase
          .from("chapters")
          .insert({ subject_id: subject.id, name: chapterName })
          .single();
  
        if (insertError) {
          console.error("Error inserting chapter:", insertError.message);
          console.error("Full error details:", insertError);
          throw insertError;
        }
        chapter = newChapter;
      } else {
        console.error("Unexpected number of rows returned for chapters.");
        throw new Error("Unexpected query result for chapters.");
      }
  
      console.log("Chapter after insert or query:", chapter);
  
      // Insert CDPS
      const { error: cdpsError } = await supabase
        .from("cdps")
        .insert({
          chapter_id: chapter.id,
          name: cdpsName,
          image_urls: imageUrls,
        });
  
      if (cdpsError) {
        console.error("Error inserting CDPS:", cdpsError.message);
        console.error("Full error details:", cdpsError);
        throw cdpsError;
      }
  
      Alert.alert(`${cdpsName} uploaded successfully!`);
    } catch (error) {
      console.error("Error storing metadata:", error);
      Alert.alert("Error storing metadata.");
    }
  };
  
  
  

  const uploadMedia = async () => {
    if (!image.length || !chapterName || !cdpsName || !selectedSubject) {
      Alert.alert("Please fill all fields and select at least one image.");
      return;
    }

    try {
      const imageUrls = await uploadImagesToSupabase();
      await storeMetadataInSupabase(imageUrls);
      setImage([]);
      setChapterName("");
      setCdpsName("");
      setSelectedSubject("");
    } catch (error) {
      console.error("Upload process failed:", error);
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

            <TouchableOpacity style={styles.submitButton} onPress={uploadMedia}>
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
    backgroundColor: "#edf2f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2b2d42",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  imagePickerButton: {
    backgroundColor: "#800080",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#800080",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#800080",
  },
});

export default Upload;
