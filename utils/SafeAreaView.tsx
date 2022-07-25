import React from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@ui-kitten/components';

export default (props) => {
  const theme = useTheme();

  return (
    <SafeAreaView {...props} style={{ backgroundColor: theme[`background-basic-color-${props.level || 1}`], ...props.style }}>
      {props.children}
    </SafeAreaView>
  );
};
