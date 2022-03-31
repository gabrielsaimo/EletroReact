import React, { useEffect, useState} from 'react';
import {
    TouchableOpacity,
    FlatList,
    Text,
    View,
    Image,
    Pressable, ScrollView
} from 'react-native';
import axios from 'axios';
import SearchBar from "./Search/SearchBarCatalogo";
import {Appbar} from "react-native-paper";
import StarRating from "react-native-star-rating";
import Local from './Local';

export default function  Produto({route,navigation})  {

    const baseURL ='https://eletrosom.com/shell/ws/integrador/detalhaProdutos?sku='+route.params.sku+'&version=15';
    const [searchText,setSearchtext] = useState('');
console.log(baseURL);

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

        <View >
            <SearchBar />
            <Local/>
            <FlatList data={data}
                      keyExtractor={ item => String(item.codigo)}
                      renderItem={({item})=>
                          <View style={{flex:1,alignItems:'center'}}>
                              <ListItem data={item} style={{width: '100%', height:'90%'}}/>
                          </View> }
            />
        </View>
    )

}

function ListItem({data,navigation}){

    return(
        <View style={{alignItems:"center",flex:1,width:'100%'}}>

            <View
                style={styles.buttonContainerStyle}
                 >


                <View>

                    <Text style={{fontWeight:"bold",fontSize:13,maxWidth:380,width:'100%'}}>{data.nome}</Text>
                    <Text style={{fontSize:10,marginTop: 5}}>CÓD - {data.codigo}</Text>
                    <View style={{width:80}}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={!data.avaliacao ? (5) : (data.avaliacao)}
                            starSize={15}
                            fullStarColor={'#FEA535'}
                            emptyStarColor={'#6A7075'}
                        />
                    </View>

                    <View>
                        <Image
                        source={{uri:'https://www.eletrosom.com/pub/media/catalog/product/cache/d03e32ae0c95d94986efe40357aba607/l/a/lavadora-de-roupas-electrolux-essencial-care-11kg-les11_detalhep_1_1.jpg'}}
                        style={{
                            width:'100%',
                            height:250,
                            resizeMode:'contain',
                            marginRight:10
                        }}
                    />
                    </View>
                    <Text style={{fontSize:20,width:'100%',textDecorationLine:'line-through'}}>R$ {data.precoDe}</Text>
                    <Text style={{fontWeight:"bold",fontSize:35,width:'100%',color: '#1534C8'}}>R$ {data.precoPor}</Text>
                    {!data.formaPagamento?(
                        <Text style={{fontWeight:"bold",fontSize:14.5,width:'100%',color: '#1534C8'}}>{data.formaPagamento}</Text>
                    ):(<Text></Text>)}

                    <TouchableOpacity style={{marginBottom:20,marginTop: 20}}>
                        <Pressable style={styles.buttong} >
                            <Text style={styles.text}>Comprar Agora</Text>
                        </Pressable>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Pressable style={styles.buttonw} >
                            <Text style={{fontWeight:'bold',color:'#9BCB3D',fontSize: 16}}>Adicionar ao carrinho</Text>
                        </Pressable>

                    </TouchableOpacity>

                    <Text style={{fontWeight:"bold",fontSize:5,width:'100%'}}>{data.tipoProduto}</Text>
                    <Text style={{fontWeight:"bold",fontSize:5,width:'100%'}}>{data.dimensoes.altura}</Text>
                    <Text style={{fontWeight:"bold",fontSize:5,width:'100%'}}>{data.dimensoes.largura}</Text>
                    <Text style={{fontWeight:"bold",fontSize:5,width:'100%'}}>{data.dimensoes.profundidade}</Text>
                    <Text style={{fontWeight:"bold",fontSize:5,width:'100%'}}>{data.dimensoes.peso}</Text>

                    <View>
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
                    </View>
                </View>


            </View>

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