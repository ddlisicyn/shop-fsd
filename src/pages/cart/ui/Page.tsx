import { Container, Box, Typography, Stack } from "@mui/material";
import { getProductsByIds } from "../api/getProductsByIds";
import { useCart } from "../../../shared/model/context/context";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";

export function CartPage() {
    const cartProducts = useCart();
    const ids = Object.keys(cartProducts || {});
    console.log(ids)
    const { isLoading, data, error } = useQuery({
        queryKey: ['cart', ...ids],
        queryFn: () => getProductsByIds(ids),
    });

    console.log(isLoading, data, error)
	// const totalPrice = useMemo(() => Object.values(cartProducts).map(item => item.discountPrice * item.amount)
		// .reduce((acc, item) => acc + item, 0), [cartProducts]);

	return (
		<Container disableGutters sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }} >
			<Stack spacing={1}>
				{
					data ? 
					data.map(product => (
						<ProductCard product={product} />
					)) :
					'Корзина пуста'
				}
			</Stack>
			<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '10px'  }}>
				<Typography variant="h6">
					Итог:
				</Typography>
				<Typography variant="h6">
					{/* {totalPrice.toLocaleString('ru-RU')},00 ₽ */}
				</Typography>
			</Box>
			{/* <OrderForm /> */}
		</Container>
	)
}