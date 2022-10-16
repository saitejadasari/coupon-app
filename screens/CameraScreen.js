import { Camera, CameraType } from 'expo-camera';
import { Component, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


class CameraScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isFocused: false
  };

  async componentDidMount() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log("camera status", status);
    this.setState({ hasCameraPermission: status === 'granted', isFocused: isFocused });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { isFocused } = this.props;
    console.log("state", this.state);
    console.log("props", JSON.stringify(this.props));
    console.log("focussed", isFocused);
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {(
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}
                    Flip{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          )}
        </View>
      );
    }
  }
}

export default CameraScreen;