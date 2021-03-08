import React, { Component } from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';


class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state ={
            name: '',
            email: '',
            review: '',
        }
    }

    render () {
        
        
        return (
            
            <View> 
                <Text style = { styles.title } > Contact Us! </Text>
            

                <View style={styles.formItem}>
                <Text style={styles.formLabel}>Name:</Text>
                    <TextInput keyboardType = 'numeric'
                        onChangeText={(name) => this.setState({})}
                        value={this.state.name}/> 
                </View>

                <View style={styles.formItem}>
                <Text style={styles.formLabel}>Email Address</Text>   
                <TextInput keyboardType = 'numeric'
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} /> 
                </View>

                <View style={styles.formItem}>
                <Text style={styles.formLabel}> Enter Your Review Here: </Text>      
                <TextInput keyboardType = 'numeric'
                        onChangeText={(review) => this.setState({review})}
                        value={this.state.review} /> 
                </View>

                <Button style ={styles.button}
                        title = {'Send!'}
                        onPress = {() => this.Send()} />
                </View>
            

        );
    }



}

const styles = StyleSheet.create ({

    title: {
        color: 'white',
        backgroundColor: '#BCBCF2',
        padding: 10,
        fontSize: 25,
    },
    formItem: {
        padding: 15,
        borderColor: '#BCBCF2',
        borderWidth: 2
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
        color: '#BCBCF2'

    }

})

export default ContactUs; 