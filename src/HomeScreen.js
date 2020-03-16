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

class HomeScreen extends React.Component{
    
    static navigationOptions = {
        title: 'Sign In'
      };
  state = {
    isLoaded: false, 
    movies: [],
    text: ''
  }
  


  componentDidMount() {
    axios.get('https://backend-steel.now.sh/movies')
    .then((res) => {
      this.setState({
        movies: res.data,
        isLoaded: true
      })
    })
    .catch(error => console.log(error))
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
    if(this.state.isLoaded){

        this.clearAsyncStorage()
      
      console.log(this.state.text)
      console.log(this.state.movies.length)
      return(
        <>
          <View style={styles.container}>
            {/* header top bar */}
            <View style={styles.header}>
              <Image
               style={styles.topIcon}
               source={require('../assets/applogo.png')}
              />
              <TextInput
                style={styles.searchbar}
                placeholder = "Search movies,TV shows"
                onChangeText={(text) => this.setState({text})}
              />
            </View>
            {/* mobile sidebar */}
            <View style={styles.sidebar}>  
             {/* genres side icon */}
              <TouchableHighlight style={[
                styles.sideIcon, 
                {
                 position: 'absolute',
                 top: '22.5%',
                 left: '25%'
                 }]}>
               <Image
                style={{
                  width: 35,
                  height: 35
                }}
                source={require('../assets/theater.png')}
              />         
              </TouchableHighlight>

              {/* In theatres icon  */}
              <TouchableHighlight style={[
                styles.sideIcon, 
                {
                 position: 'absolute',
                 top: '37.5%',
                 left: '25%'
                 }]}>
               <Image
                style={{
                  width: 35,
                  height: 35
                }}
                source={require('../assets/popcorn.png')}
              />         
              </TouchableHighlight>

              {/* TV series icon */}
              <TouchableHighlight style={[
                styles.sideIcon, 
                {
                 position: 'absolute',
                 top: '52.5%',
                 left: '25%'
                 }]}>
               <Image
                style={{
                  width: 35,
                  height: 35
                }}
                source={require('../assets/cinema.png')}
              />         
              </TouchableHighlight>

              <View style={[
                styles.sideIcon,
                {
                  position: 'absolute',
                  top: '85%',
                  left: '25%'
                }
              ]}>
                <Image
                 style={{
                   width: 35,
                   height: 35
                 }}
                 source={require('../assets/album.png')}
                />
              </View>        
             </View>
          
             {/* movies container */}
             <ScrollView style={styles.moviesContainer}>
              
                <Text style={{ 
                  margin: 15,          
                  fontSize: 20,
                  fontWeight: '700',
                  color: 'black'
                }}>{
                  this.state.text.length <= 0 ? 'Featured films and TV shows' : `Results for ${this.state.text}`
                }</Text>

                {/* movie card mapped from the this.state.movies with a filtering function for 
                    the search bar
                */}

                {

                  this.state.text.length <= 0 ? 

                  this.state.movies.map(movie => {
                    return(
                      <View style={{ marginBottom: 20}} key={movie._id}>
                     <TouchableHighlight underlayColor="white" onPress={() => {
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

                     }}>
                     <Image 
                        style={{
                          width: 200, 
                          height: 240,
                          marginLeft: 25,
                          borderBottomLeftRadius: 10,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10
                         }}
                        source={{
                          uri: movie.poster
                        }}
                       />
                      
                     </TouchableHighlight>
                       <View>
                         <Text style={styles.movieTitle}>{movie.title}</Text>
                         <Text style={styles.movieRating}>{movie.rating === 'not yet rated' ? ' ' : movie.rating}</Text>
                         <Image 
                         style={styles.moviePoster}
                         source={require('../assets/logo.png')}
                         />
                       </View>
                       
                       
                        </View> 
     
                    )
                  })
                 
                :
                this.state.movies.filter(movie => movie.title.includes(this.state.text) || movie.genre.includes(this.state.text)).map(movie => {
                  return(
                    <View style={{ marginBottom: 20}} key={movie._id}>
                    <Image 
                      style={{
                        width: 200, 
                        height: 240,
                        marginLeft: 25,
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10
                       }}
                      source={{
                        uri: movie.poster
                      }}
                     />
                     <View style={{margin: 1}}>
                       <Text style={styles.movieTitle}>{movie.title}</Text>
                       <Text style={styles.movieRating}>{movie.rating === 'not yet rated' ? ' ' : movie.rating}</Text>
                       <Image 
                       style={styles.moviePoster}
                       source={require('../assets/logo.png')}
                       />
                     </View>
                    </View> 
   
                  )
                })
              }
              <View style={{height:250}} />
            </ScrollView>
          
          </View>
        </>    
      )
    }
    return null  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BABBC2'
  },
  header: {
    height: 55,
    width: '100%',
    marginTop: 50
  },
  topIcon: {
    position: 'absolute',
    left:'5%',
    top: 5,
    width: 65, 
    height: 45
  },
  searchbar: { 
    position: 'absolute',
    right: 1,
    height: 50, 
    width: '70%',
    color: 'rgba(0,0,0,0.9)',
    fontSize: 18,
    fontWeight: '800',
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingLeft: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
    },
    sidebar: {
      width: '25%',
      height: '100%',
      position: 'absolute',
      left: 0
    },
    sideIcon: { 
      height: 55,
      width: 55,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: '#E3E4E6',
      justifyContent: 'center',
      alignItems: 'center'      
      },
      moviesContainer: {
        width: '70%',
        height: '100%',
        marginTop: '35%',
        backgroundColor: '#E3E4E6',
        position: 'absolute',
        right: 0,
        borderTopLeftRadius: 10
      },
      movieRating: {
        position: 'absolute',
        top: -35,
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        left: 40
      },
      moviePoster: {
        width: 40,
        height: 30,
        position:'absolute',
        top: -35,
        left: 85,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
      },
      movieTitle: {
          fontSize: 16,
          fontWeight: '700',
          textTransform: 'uppercase',
          paddingLeft: 25,
          paddingTop: 5
       }
}) 

export default HomeScreen;
