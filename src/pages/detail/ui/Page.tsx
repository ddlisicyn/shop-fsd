import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/getProductById';
import { useParams } from 'react-router-dom';

export function DetailPage() {
  const { id } = useParams();

  if (id === undefined) {
    return;
  }

  const { data } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProductById(id),
  });
  return <div></div>;
}
