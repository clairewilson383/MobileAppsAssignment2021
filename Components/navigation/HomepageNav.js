import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

import Homepage from '../screen/Homepage'
import MyProfile from '../screen/MyProfile';
import ContactUs from '../screen/ContactUs';


class HomepageNav extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <NavigationContainer >
                <Tab.Navigator 
                    screenOptions = {({route}) => ( { 
                        tabBarIcon: ({ focused, color, size}) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'My Profile') {
                                iconName = focused ? 'earth' : 'earth-outline';
                            } else if (route.name === 'Contact Us') {
                                iconName = focused ? 'send' : 'send-outline';
                            }

                            return <Ionicons name ={iconName} size={size} color = {color} />;
                        }
                    })  
                 }
                    tabBarOptions={{
                        activeTintColor: '#BCBCF2',
                        inactiveTintColor: 'black',
                    }}
                >
                    <Tab.Screen name = 'Home' component = { Homepage } /> 
                    <Tab.Screen name = 'My Profile' component = { MyProfile }/> 
                    <Tab.Screen name = 'Contact Us' component = { ContactUs }/>
                    
            
                </Tab.Navigator>

            </NavigationContainer>
        );

    }

}

export default HomepageNav;