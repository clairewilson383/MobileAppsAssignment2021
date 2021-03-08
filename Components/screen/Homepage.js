import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage,  FlatList, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';




class Homepage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            locationData: []

        };
    }

    componentDidMount() {
        this.getLocation()
    }


    getLocation = async() => {
        let token = await AsyncStorage.getItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/find/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Authorization": token
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    throw 'Not Authorized';
                } else if (response.status === 404) {
                    throw 'Location Not Found';
                } else {
                    throw 'Error';
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ locationData: responseJson, });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    



    render() {
        const  navigation  = this.props.navigation;
        return (

            <View>
            <ScrollView>

            <Text style = { styles.title } > Welcome to CoffiDa! </Text>

            <FlatList data = { this.state.locationData }
                renderItem = {({ item }) => ( 

                    <View style = { styles.storeInfo } >
                    <Text > { item.location_name } </Text>  
                    <Text > { item.location_town } </Text> 

                    <View style = { styles.reviews} >
                    <Text > Overall Rating: </Text> 
                    <Text > {item.avg_overall_rating}/5 </Text> 
                    </View> 

                    <View style = { styles.reviews } >
                    <Text > Average Price rating: </Text> 
                    <Text > { item.avg_price_rating}/5 </Text> 
                    </View> 

                    <View style = { styles.reviews } >
                    <Text > Average Quality rating: </Text> 
                    <Text > { item.avg_quality_rating}/5 </Text> 
                    </View> 

                    <View style = { styles.reviews } >
                    <Text > Average cleanliness rating: </Text> 
                    <Text > { item.avg_clenliness_rating}/5 </Text> 
                    </View> 

                    <Button style ={styles.button}
                        title = {'Add Your Review Here'}
                        onPress = {async () => {
                        await AsyncStorage.setItem('locationId',item.location_id.toString());
                        navigation.navigate('AddReview');
                        }}/>

                    </View>
                    
                )
            }

             keyExtractor = {(item, index) => item.id }  /> 
            </ScrollView>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        backgroundColor: '#BCBCF2',
        alignItems: 'center',
        padding: 10,
        fontSize: 25
    },
    storeInfo: {
        backgroundColor: 'white',
        borderColor: '#BCBCF2',
        borderWidth: 2,
        margin: 10
    },
    reviews: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        color: '#BCBCF2'

    }


})

export default Homepage;