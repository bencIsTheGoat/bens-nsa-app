import * as React from 'react';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Box, Text } from 'native-base';
import { CameraType, FaceDetectionResult } from 'expo-camera/build/Camera.types';
import { Dimensions, Image } from 'react-native';
import { useRef } from 'react';
import { useState } from 'react';
import { useSafeSWRConfig } from '../../utils/safeSWR';

const { width } = Dimensions.get('screen');

export default () => {
  const { cache } = useSafeSWRConfig();
  return (
    <Box>
      <Text>{JSON.stringify(cache.get('appleCredentials'))}</Text>
    </Box>
  );
  // const cameraRef = useRef<Camera>();
  // const [localImage, setLocalImage] = useState('');

  // React.useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //   })();
  // }, []);

  // const handleFacesDetected = async ({ faces }: FaceDetectionResult) => {
  //   const isSmiling = faces?.[0]?.smilingProbability >= 0.9;
  //   console.log('isSmiling', isSmiling);
  //   if (isSmiling) {
  //     try {
  //       const { uri } = await cameraRef.current.takePictureAsync();
  //       setLocalImage(uri);
  //     } catch (e) {}
  //   }
  // };

  // return (
  //   <Box>
  //     <Text>We gotta make sure your real bro</Text>
  //     {!!localImage && <Image source={{ uri: localImage }} style={{ width, aspectRatio: 1 }} />}
  //     <Camera
  //       ref={cameraRef}
  //       style={{ width, aspectRatio: 1, backgroundColor: 'red' }}
  //       // other props\
  //       type={CameraType.front}
  //       onFacesDetected={handleFacesDetected}
  //       faceDetectorSettings={{
  //         mode: FaceDetector.FaceDetectorMode.accurate,
  //         detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
  //         runClassifications: FaceDetector.FaceDetectorClassifications.all,
  //         minDetectionInterval: 1000,
  //         tracking: true,
  //       }}
  //     />
  //   </Box>
  // );
};
