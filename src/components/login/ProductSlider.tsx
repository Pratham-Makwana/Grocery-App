import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import {imageData} from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { screenHeight, screenWidth } from '@utils/Scaling';

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    // console.log(result);

    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll duration={5000} endPaddingWidth={0} style={styles.autoScroll}>
        <View style={styles.gridContainer}>
          {rows.map((row: any, rowIndex: number) => {
            // console.log(row);
            
            return (
              // <MemorizedRow />
              <MemoizeRow key={rowIndex} row={row} rowIndex={rowIndex}/>
            );
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{row: typeof imageData; rowIndex: number}> = ({
  row,
  rowIndex,
}) => {
  return <View style={styles.row}>
    {row.map((image , imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18

        return (
            <View key={imageIndex} style={[styles.itemContainer, {transform : [{translateX : horizontalShift}]}]}>
                <Image source={image} style={styles.image}/>
            </View>
        )
    })}
  </View>;
};

const MemoizeRow = React.memo(Row)

export default ProductSlider;

const styles = StyleSheet.create({
  autoScroll: {
    position: 'absolute',
    zIndex : -2
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  row: {
    flexDirection : 'row',
    marginBottom : 10
  },
 
  image : {
    height : '100%',
    width : '100%',
    resizeMode : 'contain'
  },
  itemContainer:{
    marginBottom : 12,
    marginHorizontal : 10,
    width : screenWidth * 0.26,
    height : screenWidth * 0.26,
    backgroundColor : '#f2f2f2',
    justifyContent : 'center',
    borderRadius : 25,
    alignItems : 'center'

  },
});
