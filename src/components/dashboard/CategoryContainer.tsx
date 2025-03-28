import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import ScalePress from '@components/ui/ScalePress';
import {navigate} from '@utils/NavigationUtils';
import CustomeText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';

const CategoryContainer: FC<{data: any}> = ({data}) => {
  const renderItems = (items: any[]) => {
    return (
      <>
        {items?.map((item, index) => {
          return (
            <ScalePress
              key={index}
              style={styles.item}
              onPress={() => navigate('ProductCategories')}>
              <View style={styles.imageContainer}>
                <Image source={item?.image} style={styles.image} />
              </View>
              <CustomeText
                style={styles.text}
                variant="h8"
                fontFamily={Fonts.Medium}>
                {item?.name}
              </CustomeText>
            </ScalePress>
          );
        })}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  text: {
    textAlign: 'center',
  },
  item: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    // width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#E5F3F3',
    marginBottom: 8,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
export default CategoryContainer;
