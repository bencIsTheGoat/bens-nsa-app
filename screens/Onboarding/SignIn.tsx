import * as AppleAuthentication from 'expo-apple-authentication';
import { useState } from 'react';
import { ScreenProps } from '../../types/navigation.types';
import { useSafeSWRConfig } from '../../utils/safeSWR';
import { Button, Card, Divider, Layout, Modal, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import SafeAreaView from '../../utils/SafeAreaView';
import LottieView from 'lottie-react-native';

export default ({ navigation }: ScreenProps<'SignIn'>) => {
  const [showModal, setShowModal] = useState(false);

  const { cache } = useSafeSWRConfig();

  const handlePress = async () => {
    try {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) throw new Error('Fucked');

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      navigation.replace('Onboarding', { credential });
    } catch (e) {
      setShowModal(true);
    }
  };

  return (
    <Layout level="1" style={styles.container}>
      <Layout style={styles.body}>
        <LottieView autoPlay source={require('../../assets/lottie/hearts.json')} />
      </Layout>
      <Divider />
      <Layout style={styles.footer} level="3">
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={handlePress}
        />
      </Layout>
      {showModal && (
        <Modal visible={showModal}>
          {/* <Modal.Content>
              <Modal.CloseButton onPress={() => setShowModal(false)} />
              <Modal.Header>Account Verification Error</Modal.Header>
              <Modal.Body>
                <Text>Please reach out to support to get your account verified.</Text>
              </Modal.Body>
              <Modal.Footer>
                <Button>Contact Support</Button>
              </Modal.Footer>
            </Modal.Content> */}
        </Modal>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { marginBottom: 30 },
  button: { aspectRatio: 7, width: '80%' },
  body: { flex: 8 },
  footer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
});
