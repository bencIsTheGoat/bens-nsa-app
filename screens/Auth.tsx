import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import { Alert, Box, Button, Center, Modal, Text } from 'native-base';
import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default () => {

  const { signIn } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(true)

  console.log('hi 2')

  return (
    <Center flex='1'>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            switch (credential.realUserStatus) {
              case 2: {
                return signIn(JSON.stringify(credential))
              }
              case 0:
              case 1:
              default: {

              }
            }
          } catch (e) {
            if (e.code === 'ERR_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
      {
        showModal && (
          <Modal isOpen={showModal} size='md'>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Account Verification Error</Modal.Header>
              <Modal.Body>
                <Text>
                  Please reach out to support to get your account verified.
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button>
                  Contact Support
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        )
      }
    </Center>
  );
}