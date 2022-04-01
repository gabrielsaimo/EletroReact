import React, { useEffect, useState} from 'react';
import {
    TouchableOpacity,
    FlatList,
    Text,
    View,
    Image,
    Dimensions, ScrollView
} from 'react-native';
import axios from 'axios';
import SearchBar from "./Search/SearchBarCatalogo";
import {Appbar} from "react-native-paper";
import StarRating from "react-native-star-rating";
import Local from './Local';
import Lixo from './lixo';

export default function  Produto({route,navigation})  {
const sku = route.params.sku;
    const baseURL ='https://eletrosom.com/shell/ws/integrador/detalhaProdutos?sku='+route.params.sku+'&version=15';
    const [searchText,setSearchtext] = useState('');
    const{width} = Dimensions.get("window");
    const height = width * 100 / 30;

    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false);


    useEffect(()=>{
        loadApi();

    },[]);

    async function loadApi(){
        if(loading) return;

        setLoading(true);

        const response = await axios.get(`${baseURL}`);
     //   response.headers['application/json'];
        setData([ ...data,...response.data]);

    }
    const SearchBar = () => {
        return (
            <Appbar.Header style={{backgroundColor: '#1534C8',alignItems:'center'}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content  title={'Detalhes'} style={{alignItems:'center'}} />
                <Appbar.Action icon="cart-outline" onPress={() => navigation.popToTop()}/>
            </Appbar.Header>
        );
    };


    return (
       
        <View style={{backgroundColor:'#fff'}}>
            <SearchBar />
            <Local/>
            
            <FlatList data={data}
                      keyExtractor={ item => String(item.codigo)}
                      renderItem={({item})=>
                          <View style={{flex:1,alignItems:'baseline',margin:10,height,paddingBottom:100}}>
                              <View style={{width:80}}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={!item.avaliacao ? (5) : (item.avaliacao)}
                            starSize={15}
                            fullStarColor={'#FEA535'}
                            emptyStarColor={'#6A7075'}
                        />
                    </View>
                              <Text numberOfLines={2} style={{fontWeight:"bold",fontSize:13,width:'100%'}}>{item.nome}</Text>
                              <Text style={{fontSize:10,marginTop: 5}}>CÓD - {item.codigo}</Text>
                    <Lixo sku={sku}></Lixo>
                    <Text style={{fontSize:20,width:'100%',textDecorationLine:'line-through'}}>R$ {item.precoDe}</Text>
                    <Text style={{fontWeight:"bold",fontSize:35,width:'100%',color: '#1534C8'}}>R$ {item.precoPor}</Text>

                              {!data.formaPagamento?(
                        <Text style={{fontWeight:"bold",fontSize:14.5,width:'100%',color: '#1534C8'}}>{data.formaPagamento}</Text>

                    ):(<Text></Text>)}
                    
                        <Text>
                            Avaliações
                        </Text>

                        <View style={{width:180}}>
                            <Text>{!data.avaliacao ? (5) : (data.avaliacao)}</Text>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={!data.avaliacao ? (5) : (data.avaliacao)}
                                starSize={25}
                                fullStarColor={'#FEA535'}
                                emptyStarColor={'#6A7075'}
                            />
                        </View>
                    
                          </View> }
                          
            />
            
        </View>
    )

}


const styles = {

    buttonContainerStyle: {
        height: '100%',
        marginTop: 3,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 5,
        flexDirection: 'row',
        backgroundColor: '#fff',


    },buttong: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#9BCB3D',
    },buttonw: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
}