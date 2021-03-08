import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';



class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

    }

    // using async storage to store login token when POST request 
    // is administered - saves the users details/token so the rest 
    // of the application can be used without needing authentication again 
   loginAsync = async() =>                                      

   {
       let to_send = {
           email:this.state.email,
           password: this.state.password
       };

       return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", 
       {
           method: 'POST',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(to_send)
       }) 
       // error handling 
        .then ((response ) => {                             
            if (response.status === 200)
            {
                return response.json()
            }
            else if(response.status === 400){
                throw 'Invalid Email or Password!';
            }
            else {
                throw 'error';
            }
        })
        // if login is successful the users login token is saved
        // and will navigate to the applications homepage
        .then (async (responseJson) => {
            console.log(responseJson);
            await AsyncStorage.setItem('@session_token', responseJson.token);
            await AsyncStorage.setItem('@user_id', response.id+'');
            this.props.navigation.navigate('HomepageNav')
        })
        .catch((error) =>{
            console.error(error);
        });
    
   }


    render() {

        const navigation = this.props.navigation;

        return (
        
            <View style = {styles.container}>
                <View style = { styles.formInput } >
                <Text style = { styles.formLabel } > Email Address: </Text> 
                <TextInput placeholder = "Enter your Email"
                    style = { styles.formInput }
                    onChangeText = {
                        (email) => this.setState({ email }) }
                        value = { this.state.email }/> 
                        
                </View> 
                <View style = { styles.formInput } >
                <Text style = { styles.formLabel } > Password: </Text> 
                <TextInput placeholder = "Enter your Password"
                    secureTextEntry = { true }
                    style = { styles.formInput }
                    onChangeText = {
                    (password) => this.setState({ password }) }
                        value = { this.state.password }/> 
                        
                </View> 
                <View style = { styles.formItem } >

                <TouchableOpacity style = { styles.formTouch }
                    onPress = {
                        () => this.loginAsync() } >
                <Text style = { styles.formTouchText } > Sign In! </Text>

                </TouchableOpacity>

                </View> 
                <View style = { styles.formItem } >

                <TouchableOpacity style = { styles.formTouch }
                    onPress = {
                        () => navigation.navigate('Register') } >
                <Text style = { styles.formTouchText } > Sign Up! </Text>

                </TouchableOpacity>
                </View>

            </View>

        );

    }


}
// creates a stylesheet that can be used throughout 
const styles = StyleSheet.create({                      
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
        
    },
    title: {
        color: 'white',
        backgroundColor: '#BCBCF2',
        padding: 10,
        fontSize: 25,

    },
    formItem: {
        padding: 10
    },
    formLabel: {
        fontSize: 15,
        color: 'black'
    },
    formInput: {
        borderWidth: 1,
        borderColor: '#BCBCF2',
        borderRadius: 5
    },
    formTouch: {
        backgroundColor: '#BCBCF2',
        padding: 10,
        alignItems: 'center'

    },
    formTouchText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }



})


export default Login;