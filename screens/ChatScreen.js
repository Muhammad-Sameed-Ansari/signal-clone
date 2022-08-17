import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TextInput, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { icons } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { db, auth } from '../firebase'
import firebase from 'firebase/compat/app'

const ChatScreen = ({ route }) => {
    const [userMessage, setUserMessage] = useState('')
    const [messages, setMessages] = useState([])
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleStyle: {
                backgroundColor: 'red',
                width: '100%',
            },
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
                        source={messages[0] ? { uri : messages[0].data.photoURL } : icons.placeholder_image}
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
                 Platform.OS === 'ios' ?
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={24} color='white'/>
                </TouchableOpacity> : <View></View>
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
    }, [navigation, messages])

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map((doc) =>({
                    id: doc.id,
                    data: doc.data()
                }))
            ))

        return unsubscribe
    }, [route])

    const sendMessage = () => {
        Keyboard.dismiss()

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: userMessage,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setUserMessage('')
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
                    <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                        {messages.map(({ id, data }) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.reciever}>
                                    <Avatar 
                                        position='absolute'
                                        // WEB
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -15,
                                            right: -5
                                        }}
                                        bottom={-15}
                                        right={-5}
                                        rounded
                                        size={30}
                                        source={{
                                            uri: data.photoURL
                                        }}
                                    />
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar 
                                        position='absolute'
                                        // WEB
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -15,
                                            left: -5
                                        }}
                                        bottom={-15}
                                        left={-5}
                                        rounded
                                        size={30}
                                        source={{
                                            uri: data.photoURL
                                        }}
                                    />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
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
    reciever: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative'
    },
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 10
    },
    recieverText: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10
    },
    senderName: {
        left: 5,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
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
        borderColor: 'transparent',
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30
    }
})

export default ChatScreen