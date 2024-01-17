import { useRequest } from 'ahooks';
import { axios } from '../utils/axios';
export default function useBaseRequest(paramFn, options) {
	return useRequest((...args) => axios(paramFn.apply(undefined, [...args])), options);
}
