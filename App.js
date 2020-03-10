import React from 'react';
import axios from 'axios';
import {
  TextInput,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

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
    height: 55,
    marginTop: '3.5%',
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
    left: '9%',
    top: '42%'
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
    width: 110,
    height: 120
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
          <ScrollView style={{width: '100%', flex: 1, backgroundColor:'rgba(202, 203, 203, 0.2 )' }}>
          <View style={styles.titleBar} className="title-bar">
            <Text style={styles.titleText}>Movies</Text>
            <Image
            style={styles.titleIcon}
            source={require('./img/more.png')}
          />
          </View>
  
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
  
     
          {/* movies container */}
          {
            this.state.movies.map(movie => {
              return(
                          <View style={styles.movieContainer} key={movie._id}>
                <Image style={styles.movieImage}
                  source={{
                    uri: movie.posterUrl.length > 0 ? movie.posterUrl : 'https://icons-for-free.com/iconfiles/png/512/clapper+cut+director+making+movie+take+icon-1320195777589696004.png'
                  }}
                /> 
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieDirector}>Director: {movie.director}</Text>
                <Text style={styles.movieCast}>Cast: {movie.actors}</Text>
                </View>

              )
            })
}     
          </ScrollView>
        </>
      )
    }

    return null
  
  }
}


export default App;
