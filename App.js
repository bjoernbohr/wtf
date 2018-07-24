import React from 'react';
import {
    FlatList,
    Text,
    View,
    Button,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {createStackNavigator} from 'react-navigation';


class HomeScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentWillMount() {
        return fetch('https://facebook.github.io/react-native/movies.json')

            .then((response) => response.json())
            .then((responseJson) => {
                let movieArray = [];

                this.setState({
                    dataSource: responseJson.movies,
                    movieList: movieArray.push(responseJson.movies[Math.floor(Math.floor(Math.random() * responseJson.movies.length))]),
                    fuckOff: movieArray
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });

        ;
    }


    render() {
        return (
            <View>
                <FlatList
                    data={this.state.fuckOff}
                    renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                    keyExtractor={(item, index) => index}
                />

                <Button
                    title='test'
                    onPress={() =>
                        this.props.navigation.navigate('Details',)
                    }
                />
            </View>
        );
    }
}


const moviesUsed = [];

class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            moviesPushed: moviesUsed,
            renderProps: ''
        }
    }


    componentWillMount() {
        return fetch('https://randomuser.me/api/?results=10')

            .then((response) => response.json())
            .then((responseJson) => {

                let movieArray = [];

                this.setState({
                    dataSource: responseJson.results,
                    movieList: movieArray.push(responseJson.results[Math.floor(Math.floor(Math.random() * responseJson.results.length))]),
                    randomMovies: movieArray,
                    foobar: this.state.renderProps
                },
                function () {
                    let response = this.state.randomMovies;
                    let pushed = moviesUsed.toString();
                    response.forEach(matchIdFunction);

                    function matchIdFunction(item) {
                        if (!pushed.includes(item.id)) {
                                console.log(false);
                        } else {
                            console.log(true);
                        };
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });

        ;
    }


    render() {
        const win = Dimensions.get('window');
        return (
            <View>
                <Button
                    title='test'
                    onPress={() =>
                        this.props.navigation.navigate('More',
                            {name: this.state.randomMovies}
                            )
                    }
                />
                <FlatList
                    data={this.state.randomMovies}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => {
                                this.state.moviesPushed.push(this.state.randomMovies[0].id)
                                this.props.navigation.push('Details', {})
                            }}
                        >
                        <ImageBackground style={{flex:1, height: win.height, width: win.height, justifyContent:'center', alignItems: 'center'}} source={{uri: item.picture.large}}>
                            <Text style={{
                                fontWeight: 'bold',
                                color: 'white'
                            }}>{item.name.first}, {item.name.last}</Text>
                        </ImageBackground>
                        </TouchableOpacity >
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}



class MoreScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>{console.log(this.props.navigation.state.params.name)}</Text>
                <Text>{this.props.navigation.state.params.name[0].name.first}</Text>

            </View>
        )
    }

}


const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
        More: MoreScreen
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled:true,
            headerVisible: false
        }
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack/>;
    }
}