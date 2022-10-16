import { Component } from 'react';
import {View, Text, Image, FlatList, Button} from 'react-native';
import apiCalls from '../utils/apiCalls';


export default class DashboardScreen extends Component{
  constructor(){
    super();
    this.state = {
      apiData: []
    }
  }

  async componentDidMount(){
    const apiData = await apiCalls();
    console.log("api data", apiData);
    this.setState({apiData: apiData});
  }

  render(){
    // console.log("props", JSON.stringify(this.props));
    // const image = this.props.route && this.props.route.params && this.props.route.params.image ? this.props.route.params.image : undefined;
    // console.log("Image", image);
    console.log("state", this.state);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* {
          image ? <View style={{flex:1}}><Image source={{uri: image}} style={{flex:1}}/> </View>: 
          <View>
            <Text>Dashboard!</Text>
          </View>
        } */}
        {/* {image && <Image source={{uri: image}} style={{flex:1}} />} */}

        <View style={{ flex: 1, padding: 24 }}>
        <FlatList
          data={this.state.apiData}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      
    </View>

      </View>
    );
  }
}