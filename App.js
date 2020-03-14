import React from 'react';
import axios from 'axios';
import {
  TextInput,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
  Animated
} from 'react-native';
import { Linking } from 'expo';

const { State: TextInputState } = TextInput;

class App extends React.Component{
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

  
  render(){  
    if(this.state.isLoaded){
      
      console.log(this.state.text)
      return(
        <>
          <View style={styles.container}>
            {/* header top bar */}
            <View style={styles.header}>
              <Image
               style={styles.topIcon}
               source={require('./assets/menu-grid.png')}
              />
              <TextInput
                style={styles.searchbar}
                placeholder = "Search by title, genre"
                onChangeText={(text) => this.setState({text})}
              />
            </View>
            {/* mobile sidebar */}
            <View style={styles.sidebar}>  
              <View style={[
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
                source={require('./assets/cinema.png')}
              />         
              </View>

              <View style={[
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
                source={require('./assets/popcorn.png')}
              />         
              </View>

              <View style={[
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
                source={require('./assets/theater.png')}
              />         
              </View>

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
                }}>Featured films</Text>

                {/* movie card */}

                {

                  this.state.text.length <= 0 ? 

                  this.state.movies.map(movie => {
                    return(
                      <View style={{ marginBottom: 20}} key={movie._id}>
                      <Image 
                        style={{
                          width: 230, 
                          height: 250,
                          marginLeft: 15,
                          borderBottomLeftRadius: 10,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10
                         }}
                        source={{
                          uri: movie.poster
                        }}
                       />
                       <View>
                         <Text style={
                           {
                             fontSize: 18,
                             fontWeight: '700',
                             textTransform: 'uppercase',
                             paddingLeft: 15,
                             paddingTop: 5
                           }
                          }>{movie.title}</Text>
                         <Text style={
                           {
                             position: 'absolute',
                             top: -35,
                             fontSize: 22,
                             fontWeight: '700',
                             color: 'white',
                             left: 24
                           }
                          }>{movie.rating === 'not yet rated' ? ' ' : movie.rating}</Text>
                         <Image 
                         style={{
                           width: 40,
                           height: 30,
                           position:'absolute',
                           top: -35,
                           left: 60,
     
                           borderBottomLeftRadius: 10,
                           borderTopLeftRadius: 10,
                           borderTopRightRadius: 10,
                           borderBottomRightRadius: 10
                         }}
                         source={require('./assets/logo.png')}
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
                        width: 230, 
                        height: 250,
                        marginLeft: 15,
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10
                       }}
                      source={{
                        uri: movie.poster
                      }}
                     />
                     <View>
                       <Text style={
                         {
                           fontSize: 18,
                           fontWeight: '700',
                           textTransform: 'uppercase',
                           paddingLeft: 15,
                           paddingTop: 5
                         }
                        }>{movie.title}</Text>
                       <Text style={
                         {
                           position: 'absolute',
                           top: -35,
                           fontSize: 22,
                           fontWeight: '700',
                           color: 'white',
                           left: 24
                         }
                        }>{movie.rating === 'not yet rated' ? ' ' : movie.rating}</Text>
                       <Image 
                       style={{
                         width: 40,
                         height: 30,
                         position:'absolute',
                         top: -35,
                         left: 60,
   
                         borderBottomLeftRadius: 10,
                         borderTopLeftRadius: 10,
                         borderTopRightRadius: 10,
                         borderBottomRightRadius: 10
                       }}
                       source={require('./assets/logo.png')}
                       />
                     </View>
                     
                     
                      </View> 
   
                  )
                })
              }
              
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
    left:'10%',
    top: 10,
    width: 25, 
    height: 25
  },
  searchbar: { 
    position: 'absolute',
    right: 1,
    height: 50, 
    width: '75%',
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
        width: '75%',
        height: '100%',
        marginTop: '35%',
        backgroundColor: '#E3E4E6',
        position: 'absolute',
        right: 0,
        borderTopLeftRadius: 10
      }
}) 

export default App;
