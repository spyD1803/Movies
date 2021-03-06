import React from 'react';
import { View, Image, Text,  StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ListComponent from '../common/ListComponent';
import Card from '../common/Card';
import { get_movies, select_movie } from '../../actions';
import { connect } from 'react-redux';
import { UPCOMING_MOVIES } from '../../utils/Constants';

class UpcomingMovies extends React.Component{
    
    static navigationOptions = {
    	title: 'Upcoming Movies India',
        drawerLabel:'Upcoming Movies India',
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor: '#E91E63',
            height: 45
        },
  	};

    state = {
          topMovies: []
    }
    
    componentDidMount(){
        // fetch()
        //     .then((response) => response.json())
        //     .then((responseJson) => {console.log(responseJson);this.setState({topMovies: responseJson['results']})})
        //     .catch((error) => console.log(error));

        this.props.get_movies('https://api.themoviedb.org/3/movie/upcoming?api_key=10b93db8c4746659e0310e8b4ce416e2&language=en-US&page=1&region=IN', UPCOMING_MOVIES);

    }

    renderItems({item, index}){
        return(
            <Card style={{ height: 240}} onPress={() => {this.props.select_movie(item.id), this.props.navigation.navigate('moviesDetail',{movies: item})}}>
                <Image 
                    style={styles.ImageStyle}                
                    source={{ uri: `https://image.tmdb.org/t/p/w342/${item.poster_path}`}}
                    resizeMode='stretch'
                />
                <View style={{ flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft:5}}>
                    <View style={{ flex:5}}>
                        <Text>{item.original_title}</Text>
                    </View>
                <View style={{ flex:1}}>
                    <Text>{item.vote_average}</Text>
                </View>    
                </View>
            </Card>
        );
    }

    render(){
        console.log(this.state.topMovies.length);
        return(
            <View>
                <ListComponent 
                    data={this.props.upcomingMovies}
                    renderItem={this.renderItems.bind(this)}
                    columns={2}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ImageStyle: {
        flex:6,
        width:'100%',          
        borderRadius:3,
    }
});

const mapStateToProps = (state) => {
    return {
        upcomingMovies: state.moviesReducer.UpcomingMovies
    }
}

export default connect(mapStateToProps, { get_movies, select_movie })(UpcomingMovies);