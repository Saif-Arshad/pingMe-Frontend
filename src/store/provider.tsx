import { Provider } from 'react-redux';
import { store } from '../store/store';
interface ProvidersProps {
    children: any;
}


export function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}