import React, { Component } from 'react';
import {View, Text, AsyncStorage, TextInput, StyleSheet, Alert, Button } from 'react-native';

class AddReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
        overall_rating: '',
          price_rating: '',
          quality_rating: '',
          clenliness_rating: '',
          review_body: ''
        };
    }


    addReview = async() => {
        let to_send = {
        overall_rating: parseInt(this.state_rating),
        price_rating:parseInt(this.state.price_rating), 
        quality_rating: parseInt(this.state.quality_rating),
        cleanliness_rating: parseInt(this.state.clenliness_rating),
        review_body: this.state.review_body
        };

        let loc_id = await AsyncStorage.getItem('@location_id');
        let token = await AsyncStorage.getItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/location" + loc_id+"/review", 
        {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': token
            },
            body: JSON.stringify(to_send)
        }) 
        .then ((response ) => {
            if (response.status === 200)
            {
                Alert.alert("Review Added");
                return response.json()
            }
            else if(response.status === 400){
                throw 'Could not post review at this time!';
            }
            else if(response.status === 401)
            {
            throw "Unauthorized";
            }
            else if(response.status === 404)
            {
            throw "Location not found!";
            }
            else {
                throw 'error';
            }
        })
        .then((responseJson) => {
            
        })
        .catch((error) =>{
            console.error(error);
        });
    
    }

    render() {
        return (
            <View>
                <Text style = { styles.title } > Add Review! </Text>

                <View style={styles.formItem}>
                <Text style={styles.formLabel}>Overall Rating:</Text>
                    <TextInput keyboardType = 'numeric'
                        onChangeText={(overall_rating) => this.setState({overall_rating})}
                        value={this.state.overall_rating}/> 
                </View>

                <View style={styles.formItem}>
                <Text style={styles.formLabel}>Price Rating:</Text>   
                <TextInput keyboardType = 'numeric'
                        onChangeText={(price_rating) => this.setState({price_rating})}
                        value={this.state.price_rating} /> 
                </View>

                <View style={styles.formItem}>
                <Text style={styles.formLabel}>Quality Rating: </Text>  
                <TextInput  keyboardType = 'numeric'
                        onChangeText={(quality_rating) => this.setState({quality_rating})}
                        value={this.state.quality_rating} /> 
                </View>

            
                <View style={styles.formItem}>
                <Text style={styles.formLabel}>Cleanliness Rating: </Text>      
                <TextInput keyboardType = 'numeric'
                        onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
                        value={this.state.clenliness_rating} /> 
                </View>

                <View style={styles.formItem}>
                <Text style={styles.formLabel}> Enter Your Review Here: </Text>      
                <TextInput keyboardType = 'numeric'
                        onChangeText={(review_body) => this.setState({review_body})}
                        value={this.state.review_body} /> 
                </View>

                <Button style ={styles.button}
                        title = {'Add Review'}
                        onPress = {() => this.addReview()} />
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

export default AddReview;