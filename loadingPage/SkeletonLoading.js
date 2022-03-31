import React ,{useEffect}from "react";
import {Dimensions, View,Animated,StyleSheet} from "react-native";

const {width} = Dimensions.get('window');

export default function SkeletonLoading({visible,children}){
    const AnimatedValue = new Animated.Value(0);
    useEffect(()=>{
        circleAnimated();
        return () => circleAnimated();
    },[]);

    const circleAnimated = () =>{
        AnimatedValue.setValue(0)
        Animated.timing(
            AnimatedValue,
            {
                toValue:1,
                duration:800,
                useNativeDriver:true
            }
        ).start(()=>{
            setTimeout(()=>{
                circleAnimated();
            },1000);
        });
    }


    const translateX = AnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[-10,120]
    });
    const translateX1 = AnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[-50,400]
    });
    const translateX2 = AnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[-10,230]
    });
    if(visible){
        return(
            <View style={styles.conteiner}>
                <View>
                <View style={styles.card}>
                    <View style={{marginRight:15,width:120,height:120,backgroundColor:'#ECEFF1',overflow:'hidden'}}>
                        <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                        </Animated.View>
                    </View>
                    <View style={{flex:1,justifyContent:'space-evenly'}}>

                        <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,overflow:'hidden',width:width /2}}>
                            <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX1}]}}>

                            </Animated.View>
                        </View>
                        <View style={{backgroundColor:'#ECEFF1',height:16,borderRadius:5,width:width /3,overflow:'hidden'}}>
                            <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                            </Animated.View>
                        </View>
                        <View style={{backgroundColor:'#ECEFF1',height:12,borderRadius:5,width:width /5,overflow:'hidden'}}>
                            <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                            </Animated.View>
                        </View>
                        <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,width:width /3,overflow:'hidden'}}>
                            <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                            </Animated.View>
                        </View>
                    </View>

                </View>

                </View>
                <View style={{width:width,height:1,backgroundColor:'#fff',marginTop:15}}></View>
                <View>
                    <View style={{marginTop:5}}>
                        <View style={styles.card}>
                            <View style={{marginRight:15,width:120,height:120,backgroundColor:'#ECEFF1',overflow:'hidden'}}>
                                <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                </Animated.View>
                            </View>
                            <View style={{flex:1,justifyContent:'space-evenly'}}>

                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,overflow:'hidden',width:width /2}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX1}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:16,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:10,borderRadius:5,width:width /5,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                            </View>

                        </View>
                </View>

                </View>
                <View style={{width:width,height:1,backgroundColor:'#fff',marginTop:15}}></View>
                <View>
                    <View style={{marginTop:5}}>
                        <View style={styles.card}>
                            <View style={{marginRight:15,width:120,height:120,backgroundColor:'#ECEFF1',overflow:'hidden'}}>
                                <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                </Animated.View>
                            </View>
                            <View style={{flex:1,justifyContent:'space-evenly'}}>

                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,overflow:'hidden',width:width /2}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX1}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:16,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:10,borderRadius:5,width:width /5,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                            </View>

                        </View>
                    </View>

                </View>
                <View style={{width:width,height:1,backgroundColor:'#fff',marginTop:15}}></View>
                <View>
                    <View style={{marginTop:5}}>
                        <View style={styles.card}>
                            <View style={{marginRight:15,width:120,height:120,backgroundColor:'#ECEFF1',overflow:'hidden'}}>
                                <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                </Animated.View>
                            </View>
                            <View style={{flex:1,justifyContent:'space-evenly'}}>

                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,overflow:'hidden',width:width /2}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX1}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:16,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:10,borderRadius:5,width:width /5,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                            </View>

                        </View>
                    </View>

                </View>
                <View style={{width:width,height:1,backgroundColor:'#fff',marginTop:15}}></View>
                <View>
                    <View style={{marginTop:5}}>
                        <View style={styles.card}>
                            <View style={{marginRight:15,width:120,height:120,backgroundColor:'#ECEFF1',overflow:'hidden'}}>
                                <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                </Animated.View>
                            </View>
                            <View style={{flex:1,justifyContent:'space-evenly'}}>

                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,overflow:'hidden',width:width /2}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX1}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:16,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:10,borderRadius:5,width:width /5,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                            </View>

                        </View>
                    </View>

                </View>
                <View style={{width:width,height:1,backgroundColor:'#fff',marginTop:15}}></View>
                <View>
                    <View style={{marginTop:5}}>
                        <View style={styles.card}>
                            <View style={{marginRight:15,width:120,height:120,backgroundColor:'#ECEFF1',overflow:'hidden'}}>
                                <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                </Animated.View>
                            </View>
                            <View style={{flex:1,justifyContent:'space-evenly'}}>

                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,overflow:'hidden',width:width /2}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX1}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:16,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:10,borderRadius:5,width:width /5,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX}]}}>

                                    </Animated.View>
                                </View>
                                <View style={{backgroundColor:'#ECEFF1',height:30,borderRadius:5,width:width /3,overflow:'hidden'}}>
                                    <Animated.View style={{width:'30%',height:'100%',opacity:0.3,backgroundColor:'#fff',transform:[{translateX:translateX2}]}}>

                                    </Animated.View>
                                </View>
                            </View>

                        </View>
                    </View>

                </View>
            </View>
        )
    }
    return (
        <>
            {children}
        </>
    );

}

const styles = StyleSheet.create({
    conteiner:{
        margin:10
    },
    card:{
        width:width,
        flexDirection:'row',
        justifyContent:'space-around'
    }
});