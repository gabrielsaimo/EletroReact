import React from "react";
import {StyleSheet,View,Text} from "react-native";

export default function Cards_vd(){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                teste de texto
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginTop:10,
        flex:1,
        width:350,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#fff',
        padding:5,
        borderRadius:10
    },text:{
        fontSize:30,
        fontWeight:"bold"
    }
})