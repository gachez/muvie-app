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
        genreColor: 'black',
        defaultState: []
    }

    componentDidMount() {
        axios.get('https://backend-steel.now.sh/movies')
        .then( res => {
            this.setState({
                media: res.data,
                isLoaded: true,
                defaultState: res.data
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

    resetState() {
        return new Promise(resolve => {
          this.setState({
              media: this.state.defaultState
          })
          resolve('Set state to default')
      }
        )}
    
    render(){
        if(this.state.isLoaded) {
            console.log(this.state.media.length)
        return(
            <View style={styles.container}>
   
              <View style={styles.genreList}>
                  <ScrollView style={styles.genreScroll} horizontal={true}>
                   {
                       genres.map(film => {
                           return(
                           <TouchableHighlight
                           underlayColor='white'
                           key = {film}
                             onPress={
                                async () => {                                    
                                    const msg = await this.resetState()
                                    console.log(msg)
                                    this.setState({
                                        media: this.state.media.filter(data => data.genre.toLowerCase() === film.toLowerCase())
                                    })


                             }}
                           >
                            <Text key={film} ref={(elem) => this.textElem = elem} elem style={[styles.genreName, {
                                color: this.state.genreColor
                            }]}>
                                {film}
                            </Text>
                           </TouchableHighlight>    
                            
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
                            key={movie._id}
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
    genreList: {
        width: '100%',
        position: 'absolute',
        top: '5%',
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
        height: '86.75%',
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
