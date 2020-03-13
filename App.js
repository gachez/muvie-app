import React from 'react';
import axios from 'axios';
import {
  TextInput,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Linking } from 'expo';


const YourOwnComponent = () => <Text>Your Pretty Component Goes Here</Text>

class App extends React.Component{
  state = {
    isLoaded: false, 
    movies: []
  }
  
  componentDidMount(){
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
      console.log(`The number of movies is ${this.state.movies.length}`)
      return(
        <>
        <View style={{flex: 1}}>
        <ScrollView style={{width: '100%', flex: 1, backgroundColor:'rgba(202, 203, 203, 0.2 )' }}>
          <View style={styles.titleBar} className="title-bar">
            <Text style={styles.titleText}>Movies</Text>
            <Image
            style={styles.titleIcon}
            source={require('./img/more.png')}
          />
          </View>
     
          {/* movies container */}
          {
            this.state.movies.map(movie => {
              return(
                          <TouchableHighlight underlayColor='rgba(0,0,0,0.2)' onPress={() => {
                           Linking.openURL(movie.link)
                           console.log('opening' + movie.link)
                         
                          }} key={movie._id}>

                <View style={styles.movieContainer}  >
                <Image style={styles.movieImage}
                  source={{
                    uri: movie.poster}}
                /> 
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieDirector}>Rating: {movie.rating}</Text>
 
                </View>

                          </TouchableHighlight>
                          
              )
            })
}     

          </ScrollView>
          <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 85,backgroundColor: 'black'}}></View>
      {/* search bar */}
      <View style={{flexDirection: 'row', width: '100%'}}>
          <TextInput 
            style={styles.searchBar}
            placeholder="Search Movie Here..."
          />
          <Image 
            style={styles.searchIcon}
            source={require('./img/search.svg')}
          />
          </View>
        </View>
          
        
          </>
    
      )
    }

    return null
  
  }
}

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    marginTop: '10.5%',
    marginLeft: '5%',
    width: '90%',
    height: 80
  },
  titleText: {
    height: 80,
    fontSize: 45,
    fontWeight: "700"
  },
  titleIcon: {
    position: 'absolute',
    right: 0,
    width: 30,
    height: 30,
    top: '25%'
  },
  searchBar: {
    width: '90%',
    height: 50,
    marginTop: '1.5%',
    marginBottom: 15,
    marginLeft: '5%',
    backgroundColor: 'rgba(202, 203, 203, 0.3 )',
    fontSize: 18,
    textAlign: 'left',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 15

  },
  searchIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: '9%'
  },

  movieContainer: {
    width: '90%',
    flexDirection: 'row',
    marginTop: '7.5%',
    marginLeft: '5%',
 
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  movieImage: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: 90,
    height: 100,
    resizeMode: 'cover'
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: 'black',
    position: 'absolute',
    left: 120,
    top: 1,
    width: 215
  },
  movieDirector: {
    fontSize: 16,
    fontWeight: "300",
    color: '#000',
    position: 'absolute',
    top: 30,
    opacity: 0.7,
    left: 120,
    width: 200
  },
  movieCast: {
    fontSize: 16,
    fontWeight: "300",
    color: '#000',
    position: 'absolute',
    top: 65,
    opacity: 0.7,
    left: 120,
    width: 210,
    height: 140
  }

}) 


export default App;
