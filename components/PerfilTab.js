import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Appbar} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faCreditCard, faUser, faStar, faHeart,faBox,faLocationDot} from "@fortawesome/free-solid-svg-icons";
export default function PerfilTab({navigation}) {

    return (
        <View style={{height: '100%'}}>
            <Appbar.Header style={{backgroundColor: '#1534C8', zIndex: 2}}>
                <Appbar.Content titleStyle={{textAlign: 'center', fontSize: 20}} title={'Seu perfil'}/>
            </Appbar.Header>
            <Appbar.Header style={{backgroundColor: '#FFDB00', marginTop: -50, zIndex: 1}}>
                <Appbar.Content titleStyle={{textAlign: 'center', fontSize: 20}}/>
            </Appbar.Header>
            <View style={styles.card}>
                <TouchableOpacity style={{marginTop: 30}}>
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
                        <TouchableOpacity>
                            <Text style={styles.textPart2}>
                                login
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: -30, flexDirection: 'row'}}>
                        <Text style={{fontSize: 15, color: '#6A7075'}}>
                            ou
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.textPart2}>
                                cadastre-se
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View
                style={{width: '110%', marginLeft: '-5%', height: 3, backgroundColor: '#CED4DA', marginTop: 20}}></View>
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
    },textPart2: {
        fontSize: 15,
        color: '#1534C8',
        fontWeight:'bold',
        marginLeft:3
    },
});