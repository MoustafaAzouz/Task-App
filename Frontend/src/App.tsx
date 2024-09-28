import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import store from './redux/store';
import AppRoutes from './routes/Approutes';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter> 
                <AppRoutes />
            </BrowserRouter>
        </Provider>
    );
};

export default App;
