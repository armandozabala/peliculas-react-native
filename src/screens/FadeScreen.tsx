import React, { useRef } from 'react'
import { View, Animated, Button } from 'react-native'
import { useFade } from '../hooks/useFade';

const FadeScreen = () => {

    const { opacity, fadeIn, fadeOut } = useFade();

    return (
        <View style={{ 
                flex: 1, 
                backgroundColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center'
        }}>
            <Animated.View
                style={{
                     backgroundColor: '#084F64',
                     width: 150,
                     height: 150,
                     borderColor: 'white',
                     borderWidth: 10,
                     opacity
                }}
            >
            </Animated.View>


        </View>
    ) 
}

export default FadeScreen
