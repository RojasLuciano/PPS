import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { auth } from "../db/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
console.disableYellowBox = true;

const LoginScreen = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm_password, confirmPassword ] = React.useState("");
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {             
            if(user) {
                navigation.replace('Home');
            }
        })
        return unsubscribe;
     }, []);  
    
  
    const handlerSingUp = async () => {
        const value = await AsyncStorage.getItem('@storage_Key')

        if (password === confirm_password) {
            
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: { user: any; }) => {
                    const user = userCredential.user;
                    console.log("Registred with", user.email);
                })
                .catch(error => {
                    switch (error.code) {
                    
                        case 'auth/email-already-in-use':
                            alert('Email already in use !')
                            break;
                         
                        case 'auth/invalid-email':
                            alert('Invalid email !')
                            break;
                    }
                })
        }
        else {
            alert('Password and confirm password are not the same !')
        }
    }


    const handlerBack = async () => {
        navigation.replace('Login');
    }


    return (

        <KeyboardAvoidingView behavior="padding" style={styles.container}>
    
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
 
                <View style={styles.inner}>
                    
                     <Text style={{ color: 'white',  flex:'0 1 auto' ,fontSize:30 }}>Create a new account</Text>
                     <Text style={{color: '#ffffde', flex:'0 1 auto' ,fontSize:15 , marginBottom: 48,fontWeight: '100'}}>          Please fill in the form  to continue</Text> 

        <TextInput placeholder="Email" placeholderTextColor={'#ffffde'} value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
                    <TextInput placeholder="Password" placeholderTextColor={'#ffffde'} value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry />

                    <TextInput placeholder="Confirm password" placeholderTextColor={'#ffffde'} value={confirm_password} onChangeText={text => confirmPassword(text)} style={styles.input} secureTextEntry/>
                    
                <TouchableOpacity onPress={handlerSingUp} style={styles.button} >
                        <Text style={styles.buttonText} >Sign Up</Text>
                 </TouchableOpacity>
                           <View >
            <View>
                
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:0}}>
                                    <Text style={{justifyContent: 'flex-start',  color: 'white' }}>Don't have an Account?
                                    </Text> 
                    </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={handlerBack} >
                                        <Text style={{ fontWeight: "900", color: '#0066CC', justifyContent: 'flex-end', }}> Sign In</Text>
                         </TouchableOpacity>               
                    </View>
                </View>
            </View>
        </View>      
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
        
        
        
    );
}
        
export default LoginScreen

const styles = StyleSheet.create({
        container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: '80%',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        
        color: 'white',
        backgroundColor: '#0066CC',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        height: 50,
        marginBottom: 36,
    },
    input: {
        color: 'white',
        backgroundColor: '#262b35',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        height: 50,
        marginBottom: 10,
    },
    buttonText: {
        color: '#f6f8fe',
        fontWeight: '700',
        fontSize: 16,
        position: 'relative',
        top: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#ffffde',
        top: -50,
    },
    subtitle: {
        color: '#ffffde',
        fontSize: 15,
        fontWeight: '100',
        alignItems: 'center',
        marginBottom: 10
    
    },
    inner: {
        padding: 30,
        justifyContent: 'space-around',
    },
    header: {
        flex: 1,
        color: 'white',
        fontSize:30
  },
    textInput: {
  },
    btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  }
})