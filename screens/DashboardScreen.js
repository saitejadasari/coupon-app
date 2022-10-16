import { Component } from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import insert_doc, { drop_data, drop_db, get_query } from '../connections/query';
import apiCalls from '../utils/apiCalls';


export default class DashboardScreen extends Component{
  constructor(){
    super();
    this.state = {
      apiData: []
    }
  }

  async componentDidMount(){
    // const apiData = insert_doc("Dummy", "coupon", "50% off")
    const apiData = await get_query()
    // const apiData = drop_data()
    console.log("api data", apiData);
    this.setState({apiData: apiData});
  }

  render(){
    // console.log("props", JSON.stringify(this.props));
    // const image = this.props.route && this.props.route.params && this.props.route.params.image ? this.props.route.params.image : undefined;
    // console.log("Image", image);
    console.log("state", this.state);
    return (
      <View style={{ flex: 1 }}>
        {/* {
          image ? <View style={{flex:1}}><Image source={{uri: image}} style={{flex:1}}/> </View>: 
          <View>
            <Text>Dashboard!</Text>
          </View>
        } */}
        {/* {image && <Image source={{uri: image}} style={{flex:1}} />} */}

        <View style={{ flex: 1, margin: 20 }}>
        <FlatList
          data={this.state.apiData}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.company_name}, {item.coupon_id}</Text>
            </View>
          )}
        />
    </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 10
  }
});