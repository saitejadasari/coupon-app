import { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { postImage } from '../utils/apiCalls';
import insert_doc from '../connections/query';


function CameraScreen2({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const isFocused = useIsFocused()
  const [appData, setAppData] = useState([]);
  console.log("focussed", isFocused);
  // console.log("image", image);

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
  // const apiData = await postImage(image);
  const apiData = {
    coupon_code: "Test Dummy",
    company: "Fake Co.",
    text: "Desc"
  }
  console.log("api Data", image, apiData);
  const inserted = await insert_doc(apiData.coupon_code, apiData.company, apiData.text);
  apiData.id = Math.floor(Math.random()*(2000+Math.ceil(Math.random())));
  // setAppData(apiData);
  // console.log("Inserted", inserted);
  // if(inserted){
    navigation.navigate("Dashboard", {"apiData": apiData});
  // }
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
          type={CameraType.back}
          ratio={'1:1'} /> : <View />
        }
           
      </View>
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

export default CameraScreen2;