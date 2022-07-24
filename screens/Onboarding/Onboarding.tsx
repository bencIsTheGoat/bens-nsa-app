import * as React from 'react';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {
  VStack,
  Center,
  Button,
  Modal,
  Text,
  Box,
  AspectRatio,
  Progress,
  Spinner,
  Heading,
  FormControl,
  TextArea,
  KeyboardAvoidingView,
} from 'native-base';
import { CameraType, FaceDetectionResult } from 'expo-camera/build/Camera.types';
import { Dimensions, Image, KeyboardAvoidingViewComponent, Platform } from 'react-native';
import { useRef } from 'react';
import { useState } from 'react';
import { useSafeSWRConfig } from '../../utils/safeSWR';
import { ScreenProps } from '../../types/navigation.types';
import { useEffect } from 'react';

const { width } = Dimensions.get('screen');

export default ({
  route: {
    // params: { credential },
  },
}: ScreenProps<'Onboarding'>) => {
  const [showModal, setShowModal] = useState(false);
  const [localImage, setLocalImage] = useState('');
  const cameraRef = useRef<Camera>();
  const [text, setText] = useState('');

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const handleCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      // error
    }
  };

  const handleFacesDetected = async (result: FaceDetectionResult) => {
    const smilingProbability = result?.faces?.[0]?.smilingProbability ?? 0;
    if (smilingProbability >= 0.5) {
      const res = await cameraRef.current?.takePictureAsync();
      if (res && !localImage) {
        setLocalImage(res.uri);
      }
    }
  };

  useEffect(() => {
    if (!showModal) {
      handleCameraPermissions();
    }
  }, [showModal]);

  let body = (
    <AspectRatio ratio={1} width={Math.round(width * 0.9)}>
      <Camera
        ref={cameraRef}
        style={{ width }}
        // other props\
        type={CameraType.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 1000,
          tracking: true,
        }}
      />
    </AspectRatio>
  );

  if (showModal) {
    body = (
      <Modal isOpen={showModal} size="md">
        <Modal.Content>
          <Modal.CloseButton onPress={() => setShowModal(false)} />
          <Modal.Header>Welcome!</Modal.Header>
          <Modal.Body>
            <Text>Our mission is to provide a safe and fun experience for all.</Text>
            <Text>We're going to take a selfie of you smiling for your profile.</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={() => setShowModal(false)}>Continue</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }

  if (localImage) {
    body = (
      <>
        <Image source={{ uri: localImage }} style={{ aspectRatio: 1, width: Math.round(width * 0.9) }} />
        <TextArea onChangeText={handleChangeText} placeholder="Create your ad" />
        <Button onPress={() => setLocalImage('')}>Try Again</Button>
      </>
    );
  }

  return (
    <KeyboardAvoidingView
      h={{
        base: '400px',
        lg: 'auto',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Center flex="1">{body}</Center>
    </KeyboardAvoidingView>
  );
};
