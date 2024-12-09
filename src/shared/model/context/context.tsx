import { createContext, useContext, ReactNode, useReducer } from "react";

type CartProducts = {
    [code: string]: number;
};

export enum ActionTypes {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  REMOVE = 'REMOVE',
  CLEAR = 'CLEAR'
};

type Action = {
  type: keyof typeof ActionTypes;
  code?: string;
}

const LOCALSTORAGE_CART_KEY = 'cartProducts';
const CartContext = createContext<CartProducts | null>(null);
const CartDispatchContext = createContext<any>(null);
const cartReducer = (cartProducts: any, action: Action) => {
  const { type, code } = action;

  if (!code) {
    throw new Error('Не был передан code продукта!');
  }

  switch(action.type) {
    case ActionTypes.INCREASE: {
      const newCartProducts = {
        ...cartProducts,
        [code]: cartProducts[code] ? cartProducts[code]++ : 1,
      };
      localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(newCartProducts));
      return newCartProducts;
    }
    case ActionTypes.DECREASE: {
      const newCartProducts = {
        ...cartProducts,
        [code]: cartProducts[code]--,
      };
      localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(newCartProducts));
      return newCartProducts;
    }
    case ActionTypes.REMOVE: {
      const newCartProducts = cartProducts;
      delete newCartProducts[code];
      localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(newCartProducts));
      return newCartProducts;
    }
    case ActionTypes.CLEAR: {
      const newCartProducts = {};
      localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(newCartProducts));
      return newCartProducts;
    }
    default:
      throw new Error(`Ошибка взаимодействия с контекстом. Тип: ${type}, код: ${code}`);
  }
}
const initialCartState = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_KEY) || JSON.stringify({}));

function CartContextProvider({ children }: { children: ReactNode }) {
	const [cartProducts, dispatch] = useReducer(cartReducer, initialCartState);
  const handleIncrease = (code: string) => {
    dispatch({
      type: ActionTypes.INCREASE,
      code
    })
  };
  const handleDecrease = (code: string) => {
    dispatch({
      type: ActionTypes.DECREASE,
      code
    })
  };
  const handleRemove = (code: string) => {
    dispatch({
      type: ActionTypes.REMOVE,
      code
    })
  };
  const handleClear = () => {
    dispatch({
      type: ActionTypes.CLEAR
    })
  }

	return (
		<CartContext.Provider value={cartProducts}>
			<CartDispatchContext.Provider value={{ handleIncrease, handleDecrease, handleRemove, handleClear }}>
				{children}
			</CartDispatchContext.Provider>
		</CartContext.Provider>
	)
}

const useCart = () => useContext(CartContext);
const useCartDispatch = () => useContext(CartDispatchContext);

export { CartContextProvider, useCart, useCartDispatch }