import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { View, Image, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import { useMoviesDetails } from '../hooks/useMoviesDetails';
import { MovieDetails } from '../components/MovieDetails';

const screenHeight = Dimensions.get('screen').height;


interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}


export const DetailScreen = ( { route, navigation } : Props ) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const { isLoading, cast, movieFull } = useMoviesDetails(movie.id);

    

    return (

        <ScrollView>
            <View style={styles.imageBorder}>
                <View style={styles.imageContainer}>
                        <Image 
                            source={{uri}}
                            style={styles.posterImage}
                        />
                        
               </View>
            </View>

       <View style={styles.marginContainer}>
            <Text style={styles.subTitle}>{movie.original_title}</Text>
            <Text style={styles.title}>{movie.title}</Text>
       </View>

     
              {
                  isLoading ? (
                     <ActivityIndicator size={30} color="grey" style={{ marginTop: 20 }}/>
                  )
                  : 
                  (
                    <MovieDetails movieFull={movieFull!} cast={cast}/>
                  )
              }

              {/*  */}

             <View  style={styles.backButton}> 
                <TouchableOpacity 
                    onPress={()=> navigation.pop() }
                > 
                    <Icon 
                        color='white'
                        name='arrow-back-outline'
                        size={ 60}
                    
                    />
                </TouchableOpacity>
              </View>
       </ScrollView>
    
    )
}
const styles = StyleSheet.create({
    imageContainer:{
         width: '100%',
         //overflow: 'hidden',
         height: screenHeight * 0.7,
         shadowColor: "#000",
         shadowOffset: {
            width: 0,
            height: 10,
         },
         shadowOpacity: 0.27,
         shadowRadius: 7,
         elevation: 9,
         borderBottomEndRadius: 25,
         borderBottomStartRadius: 25
    },
    imageBorder:{
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    posterImage:{
          flex: 1
        
    },
    marginContainer:{
         marginHorizontal: 20,
         marginTop: 20
    },
    subTitle:{
        fontSize: 16,
        opacity: 0.8 
    },
    title:{
         fontSize: 20,
         fontWeight: 'bold'
    },
    backButton:{
        position: 'absolute',
        zIndex: 999,
        elevation: 9
    }
})

