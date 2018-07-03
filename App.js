import React from 'react';
import {
    FlatList,
    Text,
    View,
    Button
} from 'react-native';
import { createStackNavigator } from 'react-navigation';





class HomeScreen extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentWillMount(){
        return fetch('https://facebook.github.io/react-native/movies.json')

            .then((response) => response.json())
            .then((responseJson) => {
                let movieArray = [];

                this.setState({
                    dataSource: responseJson.movies,
                    movieList:  movieArray.push(responseJson.movies),
                    fuckOff: movieArray
                }, function() {
                });
            })
            .catch((error) =>{
                console.error(error);
            });

;
    }




    render(){


        return(
            <View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                    keyExtractor={(item, index) => index}
                />


                <Button
                    title='test'
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );

    }
}




class DetailsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
        },
            this.ArrayItems = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
    }


    componentWillMount(){
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.movies,
                }, function() {
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }



    render() {
        const randomizeItems = this.ArrayItems[Math.floor(Math.random()*this.ArrayItems.length)];
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId');
        const foobar =   <Text data={this.state.dataSource}> </Text>


        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>itemId: {(itemId)}</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() =>
                        this.props.navigation.push('Details', {
                            itemId: randomizeItems,
                        })}
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
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}