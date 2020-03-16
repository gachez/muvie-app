import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, Text, ScrollView, Image, AsyncStorage} from 'react-native'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default class InfoScreen extends React.Component{
    state = {
        movie: [],
        moreLikeThis: [],
        isLoaded: false
    }

    componentDidMount() {
       async () => {
        try {
          const value = await AsyncStorage.getItem('Movie');
          if (value !== null) {
            // We have data!!

            this.setState({
                movie: value,
                isLoaded: true
            })
          }
        } catch (error) {
          // Error retrieving data
        }
      };
      
    }

   

 
    render(){
        if(this.state.isLoaded){
          
            return(
                <View style={styles.container}>
     
                  <View style={styles.moviePoster}>
                     <Image 
                     style={styles.back}
                     source={require('../assets/close.png')}
                     
                     />
                     <Image 
                      style={{position: 'absolute', top: 0, bottom: 0,left: 0, right: 0}}
                      source={{
                          uri: this.state.movie.poster
                      }}
                     />
                     </View>
                     <Text style={styles.headTitle}>
                        Movie Title Scream
                     </Text>
                     <View style={styles.moviePlot}>
                         <Text style={styles.plotTitle}>Plot</Text>
                         <Text style={styles.plotText}>kofjifeofewifefepijfwpifpj</Text>    
                     </View>
     
                     <View style={styles.moreLikeHead}>
                         <Text style={styles.moreText}>More like this</Text>
                     </View>
     
                     <View style={styles.moreLikeContainer}>
                         <ScrollView horizontal = {true} style={styles.sroll}>
                             <View style={styles.moreLikeCard}>
                                 <Image
                                   style={styles.moreLikeCardsImg} 
                                 />
                             </View>
                         
    
                         </ScrollView>    
                     </View> 
    
                   
                
                </View>    
    
    
            )
        }

        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    moviePoster: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: '37%'
    },
    back: {
        position: 'absolute',
         top: 25,
         left: 25,
          width: 30,
           height: 30
         },

    headTitle: {
        position: 'absolute',
        top: '28%',
        fontSize: 36,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
        textTransform: 'uppercase',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },     
    moviePlot: {
        width: '90%',
        height: 200,
        position: 'absolute',
        top: '40%',
        left: '5%',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
                
    },
    plotTitle: {
        fontSize: 16,
        fontWeight: '700',
        margin: 15
    },
    plotText: {
        marginLeft: 15,
        fontWeight: '700'
    },
    moreLikeContainer: {
        height: 130,
        width: '95%',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        position: 'absolute',
        top: '78%',
        right: 0,
        backgroundColor: 'green'
    },
    moreLikeHead:{
        position: 'absolute',
        top: '73.5%',
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
        width: 130,
        height: 110,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white'
    },
    moreLikeCardsImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

})


