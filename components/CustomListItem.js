import { View, Text } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'

import { icons } from '../constants'

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar 
                rounded
                source={ icons.placeholder_image }
            />

            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800' }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    Hello how are you? Hello how are you? Hello how are you? Hello how are you?
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem