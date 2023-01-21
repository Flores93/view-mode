import { useContext } from 'react';
import { PublicAppContext } from '../context';

type ValidKeys =
  | 'images'
  | 'selectedImg'
  | 'viewMode'
  | 'imagesPerRequest'
  | 'loading'
  | 'favorites';

type DispatchParams = {
  [key in ValidKeys]?: any;
};

const useAppContext = () => {
  const { state, setState } = useContext(PublicAppContext);

  const dispatch = (newValue: DispatchParams) => {
    setState({
      ...state,
      ...newValue,
    });
  };
  return { state, dispatch };
};

export default useAppContext;
