import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'


const AddChatScreen = () => {
    const [chatNameInput, setChatNameInput] = useState()
    
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
            headerBackTitle: 'Chats'
        })
    }, [navigation])

    const createChat = async () => {
        await db
            .collection('chats')
            .add({
                chatName: chatNameInput
            })
            .then(() => {
                navigation.goBack()
            })
            .catch((error) => alert(error))

    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder='Enter a chat name'
                value={chatNameInput}
                onChangeText={(text) => setChatNameInput(text)}
                leftIcon={
                    <Icon name='wechat' type='antdesign' size={24} color='black'/>
                }
            />

            <Button disabled={!chatNameInput} onPress={createChat} title='Create new Chat'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%'
    }
})

export default AddChatScreen