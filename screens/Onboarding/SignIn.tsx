import * as AppleAuthentication from 'expo-apple-authentication';
import { Alert, Box, Button, Center, Modal, Text } from 'native-base';
import { useState } from 'react';
import { ScreenProps } from '../../types/navigation.types';
import { useSafeSWRConfig } from '../../utils/safeSWR';

export default ({ navigation }: ScreenProps<'SignIn'>) => {
  const [showModal, setShowModal] = useState(false);

  const { cache } = useSafeSWRConfig();

  const handlePress = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      cache.set('appleCredentials', credential);
      navigation.replace('Onboarding', {});
    } catch (e) {
      setShowModal(true);
    }
  };

  return (
    <Center flex="1">
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={handlePress}
      />
      {showModal && (
        <Modal isOpen={showModal} size="md">
          <Modal.Content>
            <Modal.CloseButton onPress={() => setShowModal(false)} />
            <Modal.Header>Account Verification Error</Modal.Header>
            <Modal.Body>
              <Text>Please reach out to support to get your account verified.</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button>Contact Support</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      )}
    </Center>
  );
};
