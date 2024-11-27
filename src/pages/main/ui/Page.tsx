import { useEffect, useState, ChangeEvent, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ProductsList } from '../../../widgets/ProductsList';
import { getProducts } from '../api/getProducts';
import { Product } from '../../../entities/product/model/product';
import { Button, Pagination } from '@mui/material';
import { Spinner } from '../../../widgets/ProductsList/ui/Spinner';
import './index.css';

export function MainPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '') || 1;
  const category = searchParams.get('category') || 'all';
  const devicePixelRatio = useMemo((() => window.devicePixelRatio), []);
  const { isLoading, data, isFetched, isError, error, isPlaceholderData } = useQuery({
    queryKey: ['products', page, category],
    queryFn: () => getProducts(page, category),
    placeholderData: keepPreviousData
  });

  useEffect(() => {
    setProducts([]);
  }, [category]);

  useEffect(() => {
    if (data === undefined) {
      return;
    }

    const { docs } = data;

    if (typeof docs === 'object' && Array.isArray(docs) && docs.length !== 0) {
      setProducts((products) => products.concat(docs));
    }
  }, [data]);

  const nextPageClick = () => {
    setSearchParams({ category, page: `${page + 1}` });
  };

  const handlePageChange = (_: ChangeEvent<unknown>, chosenPage: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (chosenPage === page) {
      return;
    }

    setProducts([]);
    setSearchParams({ category, page: `${chosenPage}` });
  };

  return (
    <main className='main'>
      <ProductsList
        isLoading={isLoading}
        isPlaceholderData={isPlaceholderData}
        products={products}
        devicePixelRatio={devicePixelRatio}
      />
      {page !== data?.totalPages ? (
        <Button
          sx={{ width: '90%', marginTop: '10px' }}
          disabled={!isFetched}
          variant='outlined'
          onClick={nextPageClick}
        >
          {!isFetched ? <Spinner size={'24px'} /> : 'Показать еще'}
        </Button>
      ) : null}
      <Pagination
        count={data?.totalPages}
        color='primary'
        disabled={!isFetched}
        page={page}
        onChange={handlePageChange}
      />
    </main>
  );
}
