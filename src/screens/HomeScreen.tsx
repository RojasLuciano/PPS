import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import { RootStackParamList } from '../../App';
import { auth } from "../db/firebase";


const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    function handlerSingOut() {
        auth
            .signOut()
            .then(() => {navigation.replace('Login')})
            .catch((error) => alert(error.message))
    }    

  return (
      <View style={styles.container}>

      <Text style={styles.titleText}> Welcome! </Text>  
      <Text style={styles.emailText}> {auth.currentUser?.email}</Text>
      <TouchableOpacity 
      onPress={handlerSingOut}
      style={styles.button}
      >
        <Text style={styles.buttonText}>Sing out</Text>
        </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },    
    button: {
        backgroundColor: '#07B2F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    emailText: {
        color: '#ffffde',
        position: 'absolute',
        top: 150,
    },
    titleText: {
    fontSize: 20,
        color: "white",
        position: 'absolute',
        top: 80,
  }
});