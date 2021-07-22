import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Dimensions, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import movieDB from '../api/movieDB';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';

import Carousel from 'react-native-snap-carousel';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';

import ImageColors from "react-native-image-colors";
import { getColores } from '../api/helpers/getColores';
import { GradientContext } from '../api/context/GradientContext';

const  { width: windowWidth } = Dimensions.get('window');



export const HomeScreen = () => {

    const { isLoading, nowPlaying, popular, topRated, upcoming } = useMovies();
    const {top} = useSafeAreaInsets();
    const {  setMainColors } = useContext(GradientContext)

    const getPosterColors = async (index: number) => {

        const movie = nowPlaying[index];
        
        const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

        const [ primary = 'green', secondary = 'orange'] = await getColores(uri);

        setMainColors({ primary, secondary})

    }

    useEffect(() => {

           
            if(nowPlaying.length > 0){
                  getPosterColors(0);
            }

    },[nowPlaying])

    if(isLoading){
          return(
               <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                     <ActivityIndicator color="red" size={100}/>
               </View>
          )
    }

    return (
        <GradientBackground>
            <ScrollView> 
                <View style={{ marginTop: top + 20}}>
                    {/*<MoviePoster movie = { peliculasEnCine[0]}/>*/}

                    <View style={{ height: 440 }}> 
                            <Carousel
                            data={nowPlaying}
                            renderItem={ ( {item}:any ) => <MoviePoster movie = { item }/> }
                            sliderWidth={windowWidth}
                            itemWidth={300}
                            inactiveSlideOpacity={ 0.8 }
                            onSnapToItem = { (index) => getPosterColors(index)}
                            />
                    </View>

                {/* Horizontal Slider */}
                <HorizontalSlider movies={popular} title="Popular"/>

                <HorizontalSlider movies={topRated} title="Top Rated"/>

                <HorizontalSlider movies={upcoming} title="Upcoming"/>

                </View>
            </ScrollView>
        </GradientBackground>
    )
}

