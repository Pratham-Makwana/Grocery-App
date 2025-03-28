// HOC : we can pass component as children
// its work as a layout

import {useCartStore} from '@state/cartStore';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import CardAnimationWrapper from './CardAnimationWrapper';
import CartSummary from './CartSummary';

const withCart = <P extends object>(
  WrappedComponet: React.ComponentType<P>,
): FC<P> => {
  const WithCardComponent: FC<P> = props => {
    const cart = useCartStore(state => state.cart);
    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);
    return (
      <View style={style.container}>
        <WrappedComponet {...props} />

        <CardAnimationWrapper cartCount={cartCount}>
          <CartSummary
            cartCount={cartCount}
            cartImage={cart![0]?.item?.image || null}
          />
        </CardAnimationWrapper>
      </View>
    );
  };

  return WithCardComponent;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withCart;
