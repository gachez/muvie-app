import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, Text, ScrollView, Image, AsyncStorage, TouchableWithoutFeedback} from 'react-native'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {Linking} from 'expo'


export default class InfoScreen extends React.Component{
    state = {
        movie: [],
        moreLikeThis: [],
        isLoaded: false
    }

    componentDidMount() {
      axios.get('https://backend-steel.now.sh/movies')
      .then( res => {
          this.setState({
              moreLikeThis: res.data,
              isLoaded: true
          })
      })
      
      this.retrieveStorageData()
      
    }

    retrieveStorageData = async () => {
        try {
          const value = await AsyncStorage.getItem('Movie');
          if (value !== null) {
            // We have data!!
            this.setState({
                movie: JSON.parse(value)
            })
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
        console.log(this.state.movie)
      };

   

 
    render(){
        if(this.state.isLoaded){

            return(
                <View style={styles.container}>
     
                  <View style={styles.moviePoster}>
                   
                     <Image 
                      style={styles.posterImage}
                      source={{
                          uri: this.state.movie.poster       
                                        }}
                     />
                     </View>
                     <Text style={styles.headTitle}>
                        {this.state.movie.title}
                     </Text>
                     <View style={styles.moviePlot}>
                                    <Text style={styles.plotText}>{this.state.movie.description}</Text>    
                     </View>
     
                     <View style={styles.moreLikeHead}>
                         <Text style={styles.moreText}>More like this</Text>
                     </View>
     
                     <View style={styles.moreLikeContainer}>
                         <ScrollView horizontal = {true} style={styles.sroll}>
                            {
                                this.state.moreLikeThis
                                .filter(film => film.genre === this.state.movie.genre)
                                .map(movie => {
                                    return(
                                        <View style={styles.moreLikeCard}>
                                       <TouchableWithoutFeedback onPress={() => {
                                           this.setState({
                                               movie: {
                                                   description: movie.description,
                                                   genre: movie.genre,
                                                   poster: movie.poster,
                                                   rating: movie.rating,
                                                   title: movie.title,
                                                   trailer: movie.trailer

                                               }
                                           })
                                       }}>
                                       <Image
                                          style={styles.moreLikeCardsImg} 
                                          source = {{
                                              uri: movie.poster
                                                                                      }}
                                        />
                                       </TouchableWithoutFeedback>
                                        
                                        <Text style={styles.moreLikeTitle}>{movie.title}</Text>
                                    </View>
                                    )
                                })
                            }
                         
    
                         </ScrollView>    
                     </View> 
    
                    {/* the back icon  */}
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
                      <Image 
                        style={styles.backIcon}
                        source={require('../assets/close.png')}
                     
                      />
                    </TouchableWithoutFeedback>

                    {/* the rating and icon */}
                    <View style={styles.ratingView}>
                 
                        <Text style={styles.ratingNumber}>{this.state.movie.rating}</Text>
                      <Image
                      style={styles.ratingIcon}
                      source={require('../assets/logo.png')}
                      />           
                    </View>

                    {/* the play trailer button */}
                    <View style={styles.trailerBtn}>
                       <TouchableWithoutFeedback onPress={()=> Linking.openURL(this.state.movie.trailer)}>
                       <Image
                        source={require('../assets/play-button.png')}
                        style={styles.trailerIcon}
                        />
                       </TouchableWithoutFeedback>
                        
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
        )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BABBC2',
        overflow: 'scroll'
    },
    moviePoster: {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: '37%'
    },
    posterImage: {
        position: 'absolute', top: 0, bottom: 0,left: 0, right: 0,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20},
     backIcon: {
        position: 'absolute',
         top: 25,
         left: 25,
          width: 30,
           height: 30
         },
         trailerBtn: {
            position: 'absolute',
            top: '10%',
            left: '40%',
            backgroundColor: 'rgba(255,255,255,.4)',
            width: 60,
            height: 60,
            borderRadius: 60/2
         },
         trailerIcon: {
             width: '100%',
             height: '100%'
         },

    headTitle: {
        position: 'absolute',
        top: '25%',
        fontSize: 25,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
        textTransform: 'uppercase',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    ratingView: {
        width: 100,
        height: 40,
        position: 'absolute',
        top: '40%',
        right: '10%',
        flexDirection: 'row'
    },
    ratingNumber: {
        fontSize: 25,
        fontWeight: '700',
        position: 'absolute',
        right: 50
    },     
    ratingIcon: {
        width: 40,
        height: 40,
        position:'absolute',
        right: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    moviePlot: {
        width: '90%',
        height: 180,
        position: 'absolute',
        top: '38.75%',
        left: '5%',
        padding: 15,
        backgroundColor: '#E3E4E6',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'scroll'
                
    },
    plotText: {
        marginTop: 35.75,
        marginLeft: 15,
        fontWeight: '700',
        fontSize: 18,
        height: 100,
        overflow: 'scroll'
    },
    moreLikeContainer: {
        height: 160,
        width: '95%',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        position: 'absolute',
        top: '73%',
        right: 0,
        backgroundColor: '#E3E4E6'
    },
    moreLikeHead:{
        position: 'absolute',
        top: '68%',
        left: '10%'
         },
    moreText: {
        fontWeight: '700',
        fontSize: 16
    },     
    scroll: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    moreLikeCard: {
        marginTop: 10,
        marginLeft: 10,
        width: 150,
        height: 135,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
    },
    moreLikeCardsImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    moreLikeTitle:{
        position: 'absolute',
        bottom: 0,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.3)'
    }

})


