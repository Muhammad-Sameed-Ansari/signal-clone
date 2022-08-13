import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle: { backgroundColor: '#2C6BED' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white'
}

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={globalScreenOptions} >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='AddChat' component={AddChatScreen} />
            <Stack.Screen name='Chat' component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator