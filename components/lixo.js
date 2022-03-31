import React, { useEffect, useState} from 'react';
import {View} from 'react-native';
import axios from 'axios';

import {SliderBox} from "react-native-image-slider-box";


export default function  Banner({route,navigation})  {

    const baseURL ='https://eletrosom.com/shell/ws/integrador/banners/?version=15';
    console.log(baseURL);

    const [data, setData] = useState([]);

    useEffect(()=>{
        loadApi();
    },[]);

    async function loadApi(){
        const response = await axios.get(`${baseURL}`);
        setData([ ...data,...response.data]);
        console.log(response.data);

    }
    return (

        <View >
            <SliderBox
                images={data.img}
                sliderBoxHeight={200}
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                onPress={() => console.log('aqui')}
            />
        </View>
    )

}
