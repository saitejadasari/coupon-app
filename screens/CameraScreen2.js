import { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
// import { withNavigationFocus } from 'react-navigation';
import { useIsFocused } from '@react-navigation/native';
import { postImage } from '../utils/apiCalls';


function CameraScreen2({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused()
  console.log("focussed", isFocused);
  console.log("image", image);

  useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        console.log("camera permissions", cameraStatus);
        setHasCameraPermission(cameraStatus.status === 'granted');
  })();
    }, []);

const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
    }
  }

const postImageApi = async (image) => {
  const apiData = await postImage(image);
  console.log("api Data", apiData);
}

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
   <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
        {
          isFocused ?
          <Camera 
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio} 
          type={type}
          ratio={'1:1'} /> : <View />
        }
           
      </View>
      <Button
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        </Button>
       <Button title="Take Picture" onPress={() => takePicture()} />
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
        {image ? <Button title='Save' onPress={() => postImageApi(image)}/> : <View/>}
        {/* {image ? <Button title='navigate' onPress={() => navigation.navigate("Dashboard", {image: image})}/> : <View/>} */}
   </View>
  );
}


const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  }
});

// export default withNavigationFocus(CameraScreen2);
export default CameraScreen2;