import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { orderBurgerThunk, resetModalData } from '@slices';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const user = useSelector((state) => state.user.user);

  const { constructorItems, orderModalData, orderRequest } = useSelector(
    (state) => state.burgerConstructor
  );
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  // const orderRequest = false;

  // const orderModalData = null;

  const bunID = constructorItems.bun?._id as string;
  const ingredientsID: string[] = constructorItems.ingredients.map(
    (i) => i._id
  );

  let stringIdArray: string[] = [bunID, ...ingredientsID, bunID];

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    console.log('onOrderClick user', user);
    if (user) {
      dispatch(orderBurgerThunk(stringIdArray));
    } else {
      navigate('/login', { state: { from: '/' } });
    }
  };
  const closeOrderModal = () => {
    dispatch(resetModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
