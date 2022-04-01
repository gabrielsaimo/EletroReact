import React, { useEffect, useState } from 'react';
import { FlatList, Text, View ,StyleSheet,Image, Dimensions} from 'react-native';

export default App = ({sku}) => {
    const{width} = Dimensions.get("window");
    const height = width * 0.6;
    
    const [active,isActive] = useState(0);
    
    const change = ({nativeEvent}) =>{
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== active){
            isActive(slide);
        }
    }
      const [isLoading, setLoading] = useState(true);
      const [data, setData] = useState([]);
      console.log(data.imagem);
    
      useEffect(() => {
        fetch('https://eletrosom.com/shell/ws/integrador/detalhaProdutos?sku='+sku+'&version=15')
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);
    
      return (
    
        <View style={{ flex: 0}}>
          {isLoading ? <View style={{marginTop:10,width,height:150}}></View> : 
          ( 
              <View style={{marginTop:1,width,height:150}}>
    
           <FlatList
                horizontal
                pagingEnabled
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                data={data.imagem}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({ item }) => (
                    
                <View>
                    <Image style={{width,height:200,resizeMode:'contain',backgroundColor:'#fff'}} key={item} source={{uri:item.img}}></Image>
                </View>
            )}/> 
           
                    <View style={{flexDirection:'row',position:'absolute',bottom:0,alignSelf:'center'}}>
                       {
                           data.imagem.map((i,k) => (
                            <Text key={k}  style={k == active ? style.setbol: style.bol}>⬤</Text>
                           ))
                       }
                    </View>
                    <View>
            <FlatList
                horizontal
                pagingEnabled
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({ item }) => (
                    
                <View>
                    <Text>{data.nome}</Text>
                </View>
            )}/> 
                    </View>
              </View>
              
          )}
        </View>
    
      );
};
const style =StyleSheet.create({
    bol:{
        color:'#D4D4D4',margin:3
    },
    setbol:{
        color:'#000',margin:3
    }
})
/*  
<FlatList
                horizontal
                pagingEnabled
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                data={data.imagem}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({ item }) => (
                <Image style={{width,height,resizeMode:'contain'}} key={item} source={{uri:item.img}}></Image>
                )}/>  
*/