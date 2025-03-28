import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {adData, categories} from '@utils/dummyData';
import AdCarousal from './AdCarousal';
import CustomeText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />
      <CustomeText variant="h5" fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen
      </CustomeText>
      <CategoryContainer data={categories}/>
      <CustomeText variant="h5" fontFamily={Fonts.SemiBold}>
       Bestsellers
      </CustomeText>
      <CategoryContainer data={categories}/>
      <CustomeText variant="h5" fontFamily={Fonts.SemiBold}>
      Snack & Drinks
      </CustomeText>
      <CategoryContainer data={categories}/>
      <CustomeText variant="h5" fontFamily={Fonts.SemiBold}>
       Home & Lifestyle
      </CustomeText>
      <CategoryContainer data={categories}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default Content;
