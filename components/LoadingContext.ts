import { createContext } from 'react';

interface ILoadingContext {
    isLoading: boolean,
    setLoading: (loading: boolean ) => void
}

const LoadingContext = createContext(<ILoadingContext>{
    isLoading: false,
    setLoading: (loading: boolean ) => {}
});


export default LoadingContext;