import React from "react";
import { View,TextInput,StyleSheet } from "react-native";

export default function Login(){

    return(
        <View>

            <View style={{alignItems:'center'}}>       
                <View style={{alignContent:'center'}}>
                    <TextInput style={styles.input} placeholder="Seu email"></TextInput>
                    <TextInput style={styles.input} placeholder="Sua senha" secureTextEntry={true}></TextInput>
                </View>
            </View>
            
        </View>
    );

}

const styles = StyleSheet.create({
    input:{
        backgroundColor:'#E9ECEF',
        borderStartWidth : 2,
        marginTop:10,
        padding:10,
        width:300,
        fontSize:16,
        borderRadius:10
        
    }
});
