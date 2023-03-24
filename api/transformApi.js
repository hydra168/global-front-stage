import oldApiHandler from '@/api';

export default async ({ url, method, params, data }) => {
  return oldApiHandler[method](url, method === 'get' ? params : data);
};
