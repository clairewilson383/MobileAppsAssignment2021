import React, { Component } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, } from 'react-native';

class Register extends Component {

    constructor(props) {
        super(props);


        this.state = {

            first_name: '',
            last_name: '',
            email: '',
            password: ''

        }

    }

    addUser() {
        let to_send = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };
        return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(to_send)

        })

        .then((response) => {
                if (response.status === 201) {
                    Alert.alert("Account Created!");
                    return response.json()
                } else if (response.status === 401) {
                    throw "Could Not Create Account";

                } else {
                    throw "Error";
                }

            })
            .then((responseJson) => {
                this.props.navigation.navigate('Login')
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const navigation = this.props.navigation;
        return ( 
            <View>

            <Text style = { styles.title } > Register Your CoffiDa Account! </Text>

            <View style = { styles.formItem } >
            <Text style = { styles.formLabel } > First Name: </Text> 
            <TextInput placeholder = "Enter Your First Name"
            style = { styles.formInput }
            onChangeText = {
                (first_name) => this.setState({ first_name }) }
            value = { this.state.first_name }/> 
            </View>

            <View style = { styles.formItem } >
            <Text style = { styles.formLabel } > Surname: </Text> 
            <TextInput placeholder = "Enter Your Surname"
            style = { styles.formInput }
            onChangeText = {
                (last_name) => this.setState({ last_name }) }
            value = { this.state.last_name }/> 
            </View>


            <View style = { styles.formItem } >
            <Text style = { styles.formLabel } > Email: </Text> 
            <TextInput placeholder = "Enter your Email"
            style = { styles.formInput }
            onChangeText = {
                (email) => this.setState({ email }) }
            value = { this.state.email }
            />

            </View>


            <View style = { styles.formItem } >
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
                    () => this.addUser() } >
                <Text style = { styles.formTouchText } > Sign Up! </Text>

            </TouchableOpacity>

            </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        backgroundColor: '#BCBCF2',
        padding: 10,
        fontSize: 25
    },
    formItem: {
        padding: 15
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
    button: {
        backgroundColor: '#BCBCF2',
        alignItems: 'center',
        padding: 30
    },
    formTouch: {
        backgroundColor: '#BCBCF2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    formTouchText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    formTouch: {
        backgroundColor: '#BCBCF2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    formTouchText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default Register;