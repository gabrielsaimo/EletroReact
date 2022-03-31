import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';


export default class CarrinhoTab extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Carrinho"
                    onPress={() => console.log('botão da tela 3 ')}
                />
            </View>
        )
    }
}