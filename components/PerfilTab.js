import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Alert,Modal } from 'react-native';
import {Appbar} from "react-native-paper";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faCreditCard, faUser, faStar, faHeart,faBox,faLocationDot} from "@fortawesome/free-solid-svg-icons";
import Login from './Screens/Login';
export default function PerfilTab({navigation}) {

const [isVisibleLogin,setVisibleLogin] = useState(false);
const [isVisibleLogon,setVisibleLogon] = useState(false);
    const ButtonAlert = () =>
    Alert.alert(
      "Teste Alert",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    return (
        <View style={{height: '100%'}}>
            <Modal animationType={'slide'} transparent={false} visible={isVisibleLogin}
            onRequestClose={
                ()=>{
                setVisibleLogin(false);
                }
            }>
                <Appbar.Header style={{backgroundColor: '#FFDB00', marginTop: -45, zIndex: 1}}></Appbar.Header>

                <View style={{marginTop:30}}>
                    <View style={{alignSelf:'flex-start',marginLeft:10}}>
                       <TouchableOpacity onPress={() => setVisibleLogin(false)}>
                            <FontAwesomeIcon icon={faAngleLeft} style={ {color: '#1534C8'} } size={30}/>
                        </TouchableOpacity>
                       </View>
                <View style={{alignSelf:'center',marginTop:-38}}>
                
                    <View style={styles.card2}>
                       
                       
                            <Text style={styles.texteletro}>
                                eletrosom
                            </Text>
                            <Text style={styles.textponto}>
                                .
                            </Text>
                            <TouchableOpacity onPress={() =>(setVisibleLogin(true))}>
                                <Text style={styles.textcom}>
                                    com
                                </Text>
                            </TouchableOpacity>
                        
                    </View>
                </View>
                </View>
                
                <Login/>
            </Modal>
            <Modal animationType={'slide'} transparent={false} visible={isVisibleLogon}
            onRequestClose={
                ()=>{
                setVisibleLogon(false);
                }
            }>
                <Appbar.Header style={{backgroundColor: '#FFDB00', marginTop: -45, zIndex: 1}}></Appbar.Header>

                <View style={{marginTop:30}}>
                    <View style={{alignSelf:'flex-start',marginLeft:10}}>
                       <TouchableOpacity onPress={() => setVisibleLogon(false)}>
                            <FontAwesomeIcon icon={faAngleLeft} style={ {color: '#1534C8'} } size={30}/>
                        </TouchableOpacity>
                       </View>
                <View style={{alignSelf:'center',marginTop:-38}}>
                
                    <View style={styles.card2}>
                       
                        <Text style={styles.texteletro}>
                            eletrosom
                        </Text>
                        <Text style={styles.textponto}>
                            .
                        </Text>
                        <TouchableOpacity onPress={() =>(setVisibleLogon(true))}>
                            <Text style={styles.textcom}>
                                com
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                </View>
                
                <Login/>
            </Modal>
            <Appbar.Header style={{backgroundColor: '#1534C8', zIndex: 2}}>
                <Appbar.Content titleStyle={{textAlign: 'center', fontSize: 20}} title={'Seu perfil'}/>
            </Appbar.Header>
            <Appbar.Header style={{backgroundColor: '#FFDB00', marginTop: -50, zIndex: 1}}>
                <Appbar.Content titleStyle={{textAlign: 'center', fontSize: 20}}/>
            </Appbar.Header>
            <View style={styles.card}>
                <TouchableOpacity style={{marginTop: 30}} onPress={ButtonAlert}>
                    <View style={{width: 80, height: 80, backgroundColor: '#FFDB00', borderRadius: 10, margin: 10}}>
                        <FontAwesomeIcon icon={faUser} color={'#1534C8'} size={30} style={{margin: 25}}/>
                    </View>
                </TouchableOpacity>
                <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                    <View style={styles.card}>
                        <Text style={{fontSize: 15, color: '#6A7075'}}>
                            Olá,
                        </Text>
                        <Text style={{marginLeft: 3, fontSize: 15, color: '#6A7075'}}>
                            Fáça seu
                        </Text>
                        <TouchableOpacity onPress={() =>(setVisibleLogin(true))}>
                            <Text style={styles.textPart2}>
                                login
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: -30, flexDirection: 'row'}}>
                        <Text style={{fontSize: 15, color: '#6A7075'}}>
                            ou
                        </Text>
                        <TouchableOpacity onPress={() =>(setVisibleLogon(true))}>
                            <Text style={styles.textPart2}>
                                cadastre-se
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{width: '110%', marginLeft: '-5%', height: 3, backgroundColor: '#CED4DA', marginTop: 20}}></View>
            <ScrollView>
                <View style={styles.conteiner}>
                    <View>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row', paddingVertical: 20}}>
                                <FontAwesomeIcon icon={faBox} style={{color: '#6A7075'}} size={30}/>
                                <Text style={{
                                    marginLeft: 20,
                                    paddingVertical: 2,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#6A7075'
                                }}>Meus Pedidos</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '100%', height: 1, backgroundColor: '#CED4DA'}}></View>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row', paddingVertical: 20}}>
                                <FontAwesomeIcon icon={faLocationDot} style={{color: '#6A7075'}} size={30}/>
                                <Text style={{
                                    marginLeft: 20,
                                    paddingVertical: 2,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#6A7075'
                                }}>Meus Endereços</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '100%', height: 1, backgroundColor: '#CED4DA'}}></View>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row', paddingVertical: 20}}>
                                <FontAwesomeIcon icon={faCreditCard} style={{color: '#6A7075'}} size={30}/>
                                <Text style={{
                                    marginLeft: 20,
                                    paddingVertical: 2,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#6A7075'
                                }}>Meus Cartões</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '100%', height: 1, backgroundColor: '#CED4DA'}}></View>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row', paddingVertical: 20}}>
                                <FontAwesomeIcon icon={faUser} style={{color: '#6A7075'}} size={30}/>
                                <Text style={{
                                    marginLeft: 20,
                                    paddingVertical: 2,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#6A7075'
                                }}>Meus Dados</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '100%', height: 1, backgroundColor: '#CED4DA'}}></View>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row', paddingVertical: 20}}>
                                <FontAwesomeIcon icon={faStar} style={{color: '#6A7075'}} size={30}/>
                                <Text style={{
                                    marginLeft: 20,
                                    paddingVertical: 2,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#6A7075'
                                }}>Minhas Avaliações</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '100%', height: 1, backgroundColor: '#CED4DA'}}></View>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row', paddingVertical: 20}}>
                                <FontAwesomeIcon icon={faHeart} style={{color: '#6A7075'}} size={30}/>
                                <Text style={{
                                    marginLeft: 20,
                                    paddingVertical: 2,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#6A7075'
                                }}>Meus Favoritos</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    conteiner:{
        margin:10
    },
    card:{
        width:'100%',
        flexDirection:'row',
        //justifyContent:'space-around'
    },card2:{
        width:'100%',
        flexDirection:'row', 
        alignItems:'center',
        alignContent:'center'
        //justifyContent:'space-around'
    },textPart2: {
        fontSize: 15,
        color: '#1534C8',
        fontWeight:'bold',
        marginLeft:3
    },texteletro: {
        fontSize: 30,
        color: '#1534C8',
        fontWeight:'bold',
        marginLeft:3
    },textponto: {
        fontSize: 30,
        color: '#FFDB00',
        fontWeight:'bold',
        marginLeft:3
    },textcom: {
        fontSize: 30,
        color: '#1534C8',
        marginLeft:3
    }
});