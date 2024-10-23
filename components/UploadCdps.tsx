import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const UploadCdps = () => {
        const navigation = useNavigation();


        return (
            <View style={styles.AddCdps}>
                <TouchableOpacity style={styles.addButton} onPress={()=>console.log('HIHI')}>
                    <MaterialIcons name="add-a-photo" style={styles.addButtonText} color="#fff" />
                </TouchableOpacity>
            </View>
        )
}

const styles = StyleSheet.create({
    AddCdps: {
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
      }
})


export default UploadCdps;