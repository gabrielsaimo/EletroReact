import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocationDot,faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default function Local(){
    const local = null;
    return(
        <View style={{zIndex:100}}>
<Pressable onPress={() => (console.log('Deu ok'))}>
    <View style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:'#1534C8',
        color:'white'
    }}>
        <FontAwesomeIcon icon={faLocationDot} style={ {color: 'white'} }/>
        {!local ?( <Text  style={styles.text}>Utilize a sua localização para ver disponibilidade</Text>):( <Text  style={styles.text}>Enviar para: Alfenas - 37130-001 </Text>)}
        <FontAwesomeIcon icon={faAngleRight} style={ {color: 'white'} }/>
    </View>
</Pressable>

</View>
    )
}
const styles = StyleSheet.create({
   text:{
        fontSize:12,
        padding:5,
        backgroundColor:'#1534C8',
        color:'#fff'
    }
});