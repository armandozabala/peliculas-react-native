import React from 'react'
import { Text, View } from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { Cast } from '../interfaces/creditsInterface'
import { MovieFull } from '../interfaces/movieInterface'

import currencyFormatter from "currency-formatter";
import { CastItem } from './CastItem'
import { FlatList } from 'react-native-gesture-handler'

interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}

export const MovieDetails = ( { movieFull, cast} : Props) => {
    return (
        <>
             {/* Detalles */}
             <View style={{marginHorizontal: 20}}>


                    <View style={{flexDirection: 'row'}}>
                        <Icon 
                            name="star-outline"
                            color="grey"
                            size={16}
                        />

                        <Text>{ movieFull.vote_average }</Text>

                        <Text style={{marginLeft: 5}}>
                              - { movieFull.genres.map( g => g.name ).join(', ')}
                        </Text>

                        </View>
                        {/* Historia de la Pelicula */}
                        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
                                Historia
                        </Text>

                        <Text style={{fontSize: 16}}>
                             { movieFull.overview}
                        </Text>

                        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
                                Presupuesto
                        </Text>

                        <Text> { currencyFormatter.format(movieFull.budget, { code: 'USD'}) } </Text>

                 

                    {/* Casting */}
                    <View style={{ marginTop: 10}}>
                        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20}}>
                                Actores
                        </Text>
                        
                         <FlatList
                            
                                data={cast}
                                keyExtractor={(item) => item.id.toString() }
                                renderItem={ ({item}) =>  <CastItem actor={ item }/> }
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{marginTop: 10}}
                         />
                       


                    </View>
                   
            
             </View>
        </>
    )
}

