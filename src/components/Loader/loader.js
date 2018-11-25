import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { Spinner } from '@shoutem/ui';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#F5F8FB',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const Loader = props => {
  const { loading, color, ...attributes } = props;
  const spinnerColor = color || '#EE6C4D';

  return (
    <Modal
      transparent
      animationType="fade"
      visible={loading}
      onRequestClose={() => {
        console.log('closed modal');
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Spinner animating={loading} style={{ size: 'large', color: spinnerColor }} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
