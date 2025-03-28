import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '@utils/Scaling';
import Notice from '@components/dashboard/Notice';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const NoticeAnimation: FC<{
  noticePosition: any;
  children: React.ReactElement;
}> = ({noticePosition, children}) => {


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.noticeContainer, {transform: [{translateY: noticePosition.current}]}]}>
        {/* Notic Content */}
        <Notice />
      </Animated.View>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.current.interpolate({
              // NOTICE_HEIGHT is -76 somethinng means its not viewable in scroll 
              // it become 0 then its scroll down and visible so content under this 
              // have padding top of noticeHeight + 20
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NoticeHeight + 20],
            }),
          },
        ]}>
        {/* This Children is all content of the screen that pull up and pull  down  */}
        {children}
      </Animated.View>
    </View>
  );
};

export default NoticeAnimation;

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
