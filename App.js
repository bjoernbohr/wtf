import React from 'react';
import {
    FlatList,
    Text,
    View,
    Button
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
                    fuckOff: movieArray,
                }, function () {

                    let response = this.state.fuckOff;
                    let pushed = moviesUsed.toString();

                    response.forEach(matchIdFunction);
                    function matchIdFunction(item, index) {
                        for (let key in item) {
                            if (!pushed.includes(item.id)) {
                                console.log(false);

                            } else {
                                console.log(true);
                            };
                        }
                    }


                    });
            })
            .catch((error) => {
                console.error(error);
            });

        ;
    }




    render() {

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    title="Go to Details... again"
                    onPress={() => {
                        this.state.moviesPushed.push(this.state.fuckOff[0].id)
                        this.props.navigation.push('Details', {})
                    }}
                />
                <FlatList
                    data={this.state.fuckOff}
                    renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack/>;
    }
}