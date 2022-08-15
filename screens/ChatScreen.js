import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { icons } from '../constants'
import { StatusBar } from 'expo-status-bar'

const ChatScreen = ({ route }) => {
    const [userMessage, setUserMessage] = useState('')
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleStyle: {
                backgroundColor: 'red',
                width: '100%',
                headerTitleAlign: 'left',
                alignItems: 'left'
            },
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        marginRight: '50%',
                        alignItems: 'center'
                    }}
                >
                    <Avatar 
                        rounded
                        source={ icons.placeholder_image }
                    />
                    <Text
                        style={{
                            color: 'white',
                            marginLeft: 10,
                            fontWeight: '700'
                        }}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={24} color='white'/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80
                }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white'/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const sendMessage = () => {

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='light'/>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <>
                    <ScrollView>

                    </ScrollView>

                    <View style={styles.footer}>
                        <TextInput 
                            placeholder='Message' 
                            style={styles.textInput} 
                            value={userMessage}    
                            onChangeText={(text) => setUserMessage(text)}
                        />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name='send' size={24} color='#2B68E6'/>
                        </TouchableOpacity>
                    </View>
                </>
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        // borderColor: 'transparent',
        backgroundColor: '#ECECEC',
        borderWidth: 1,
        padding: 10,
        color: 'grey',
        borderRadius: 30
    }
})

export default ChatScreen