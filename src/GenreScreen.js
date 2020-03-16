import 'react-native-gesture-handler';
import React from 'react';
import axios from 'axios';
import {
  AsyncStorage,  
  TextInput,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const genres = [
    'Action',
    'Animation',
    'Comedy',
    'Drama',
    'Horror',
    'Fantasy'
]
export default class GenreScreen extends React.Component {
    state = {
        media: [],
        isLoaded: false,
        selectedGenre: 'Action',
        genreColor: 'black'
    }

    componentDidMount() {
        axios.get('https://backend-steel.now.sh/movies')
        .then( res => {
            this.setState({
                media: res.data,
                isLoaded: true
            })
        })
        .catch(error => console.log(error));
    }

    _storeData = async (movie) => {
        try {
          await AsyncStorage.setItem('Movie', JSON.stringify(movie));
        } catch (error) {
          // Error saving data
        }
        console.log('done')
      };
  
    
      clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }
    

    render(){
        if(this.state.isLoaded) {
        return(
            <View style={styles.container}>
              <View style={styles.header}>
               <TouchableHighlight 
                onPress={() => console.log('pressed close')}
               >
                    <Image
                        style={styles.backIcon}
                        source={require('../assets/close.png')}
                    />   
               </TouchableHighlight> 
                
              </View>
              <View style={styles.heading}>
                <Text style={styles.headingText}>genres</Text>
              </View>
              <View style={styles.genreList}>
                  <ScrollView style={styles.genreScroll} horizontal={true}>
                   {
                       genres.map(film => {
                           return(
                           <TouchableWithoutFeedback
                             onPress={
                                () => {
                                    this.setState({
                                        selectedGenre: film
                                    })
                                }  
                             }
                           >
                            <Text key={film} ref={(elem) => this.textElem = elem} elem style={[styles.genreName, {
                                color: this.state.genreColor
                            }]}>
                                {film}
                            </Text>
                           </TouchableWithoutFeedback>    
                            
                           )
                       })
                   }
                  </ScrollView>
              </View> 
              
              {/* //fims container */}
              <View style={styles.mediaContainer}>
                <ScrollView style={styles.mediaScroll} contentContainerStyle={{flexDirection:'row', flexWrap: 'wrap'}}>
                   {
                       this.state.media
                       .map( movie => {
                           return(
                            <TouchableHighlight

                            style={styles.mediaPoster}
                            underlayColor='white'
                            onPress={() => {
                               let film = {
                                  title: movie.title,
                                  genre: movie.genre,
                                  description: movie.description,
                                  rating: movie.rating,
                                  poster: movie.poster,
                                  trailer: movie.trailer
                               }
                              this._storeData(film)
                               console.log('navigating..')
                              this.props.navigation.navigate('Info');
      
                           }}
                          >
                            <Image
                            style={{
                                ...StyleSheet.absoluteFillObject,

                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                                }}
                            source={{
                                uri: movie.poster
                            }}
                          />
                         </TouchableHighlight>
                            
                           )
                       })
                   }
                   
                </ScrollView>
              </View>
            </View>
        )
        }
        return (
            <View style={{
              flex: 1,
              backgroundColor:'#BABBC2',
              justifyContent: 'center',
              alignItems: 'center' 
            }}>
      
               <Image 
                style={{
                  width: 100,
                  height: 65
                }}
                source={require('../assets/applogo.png')}
               />
      
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#BABBC2'},
    header: {
        width: '100%',
        height: 60,
        position: 'absolute',
        top: 0
    },
    backIcon: {
        width: 25,
        height: 25,
        position: 'absolute',
        right: 25,
        top: 50
    },
    heading: {
        position: 'absolute',
        top: '8%',
        width: '100%',
        height: 'auto'
    }
    ,
    headingText: {
        fontWeight: 'bold',
        fontSize: 30,
        padding: 15,
        textTransform: 'uppercase'
    },
    genreList: {
        width: '100%',
        position: 'absolute',
        top: '18.75%',
        height: 60
    },
    genreScroll: {
        height: '100%'
    },
    genreName: {
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginLeft: 20
    },
    mediaContainer: {
        width: '92.5%',
        left: '5%',
        height: '74%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#E3E4E6',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10, 
    },
    mediaScroll: {
     
    },
    mediaPoster: {
        width: '45%',
        marginLeft: 10,
        marginTop: 10,
        height: 250,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
})
