import { createContext, ReactNode, useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import { Basic as Photo } from 'unsplash-js/dist/methods/photos/types';

export interface CustomPhoto extends Photo {
  newPhoto?: boolean;
  parentId?: string;
}

interface StateProps {
  images: CustomPhoto[];
  selectedImg: CustomPhoto | undefined;
  viewMode: boolean;
  imagesPerRequest: number;
  loading: boolean;
  favorites: string[];
}
export type ContextType = { state: StateProps; setState: any };

type Props = {
  children: ReactNode;
};

const initState = {
  images: [] as CustomPhoto[],
  selectedImg: undefined,
  viewMode: false,
  imagesPerRequest: 3,
  loading: false,
  favorites: [],
};

export const PublicAppContext = createContext<ContextType>({
  state: initState,
  setState: () => {},
});

const unsplashApi = createApi({
  accessKey: 'TF-wQG02j_NKTt15yalvw6YZlTC8BBDaS2VZ628Hmug',
});

const AppContext = ({ children }: Props) => {
  const [state, setState] = useState(initState);
  useEffect(() => {
    setState({ ...state, loading: true });
    unsplashApi.search
      .getPhotos({
        query: 'living room',
        orientation: 'landscape',
        perPage: state.imagesPerRequest,
        page: 1,
        orderBy: 'relevant',
      })
      .then((result) => {
        if (result.response?.results) {
          setState((prevState) => {
            const newImages = [...result.response.results].map((item) => {
              const newImagePath = `${
                item.urls.regular.split('&w=')[0]
              }&w=1920&h=600`;

              return {
                ...item,
                urls: {
                  ...item.urls,
                  regular: newImagePath,
                },
              };
            });

            const newImagesValue = prevState.images.length
              ? [{ ...newImages[newImages.length - 1], newPhoto: true }]
              : newImages;

            return {
              ...prevState,
              images: [...prevState.images, ...newImagesValue],
              selectedImg: newImages[0] as any,
              loading: false,
            };
          });
        } else {
          throw new Error('Unknown Error');
        }
      })
      .catch((err) => {
        console.error('Error :: getPhotos :: ', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.imagesPerRequest]);

  if (state.images.length === 0) {
    return <span>no data...</span>;
  }

  return (
    <PublicAppContext.Provider value={{ state, setState }}>
      {children}
    </PublicAppContext.Provider>
  );
};

export default AppContext;
