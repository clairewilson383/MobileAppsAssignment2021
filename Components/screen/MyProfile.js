import React, { Component } from 'react';
import { AsyncStorage, Alert, View, Text, TextInput, Button, StyleSheet } from 'react-native';


class MyProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
          first_name: '',
          last_name: '',
          email: '',
        };
      }

    
      
      userProfile = async() =>{
        let id_input = await AsyncStorage.getItem('@user_id');
        let token = await AsyncStorage.getItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id_input,
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            "X-Authorization": token
          },
        })
        .then((response) => {
          if(response.status === 200)
          {
            return response.json()
          }
          else if(response.status === 401)
          {
            throw 'Not Authorized';
          }
          else if(response.status === 404)
          {
            throw 'User Not found';
          }
          else
          {
            throw 'Error';
          }
        })
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({first_name: responseJson.first_name})
          this.setState({last_name: responseJson.last_name})
          this.setState({email: responseJson.email})
        })
        .catch((error) => {
          console.error(error);
        });
      }


      componentDidMount(){
          this.userProfile()
      }

      updateProfile = async() => {
        let id_input = await AsyncStorage.getItem('@user_id');
        let token = await AsyncStorage.getItem('@session_token');

        let to_send = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password

        };

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+id_input,
        {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            "X-Authorization": token
          },
          body: JSON.stringify(to_send)
        })
        .then((response) => {
            if(response.status === 200)
            {
              Alert.alert("Updated Successfully!");
            }
            else if(response.status === 400)
            {
              throw 'Bad request';
            }
            else if(response.status === 401)
            {
              throw 'Not Authorized';
            }
            else if(response.status === 403)
            {
              throw 'Forbidden';
            }
            else if(response.status === 404)
            {
              throw 'User Not found';
            }
            else
            {
              throw 'Error';
            }
        })
        .catch((error) => {
          console.error(error);
        });
      }


    render() {
        return ( 
            <View >
                <Text style = { styles.title } > Update Your Profile Here ! </Text>
                <View style = { styles.formInput } >
                <Text style = { styles.formLabel } > First Name: </Text> 
                <TextInput 
                    onChangeText={(first_name) => this.setState({first_name})}
                    value={this.state.first_name}
                    defaultValue ={this.state.first_name}  /> 
            </View>

            <View style = { styles.formInput } >
            <Text style = { styles.formLabel } > Last Name: </Text> 
            <TextInput 
                    onChangeText={(last_name) => this.setState({last_name})}
                    value={this.state.last_name}
                    defaultValue ={this.state.last_name} /> 
            </View>

            <View style = { styles.formInput } >
            <Text style = { styles.formLabel } > Email Address:  </Text> 
            <TextInput 
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    defaultValue ={this.state.email} /> 
            </View>
            <Button style = {styles.button}
                onPress={() => this.updateProfile()}
                title="Update Information" />
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
    button: {
        color: '#BCBCF2'

    }
    

})




export default MyProfile;