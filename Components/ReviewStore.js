import React, { Component } from 'react';
import {View, Text, StyleSheet, Alert } from 'react-native';

class ReviewStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationId: 1,
            locationData: [],
            token: '',
            isFavourite: false,
                
        }
    }

    componentDidMount() {
        this.loadStore()
    }

    





    

    render() {
        return (
           <View>
               <Text style = { styles.title } > Add Your Own Review!  </Text>
           </View>
        );

    }

}

export default ReviewStore; 