import { Provider } from 'react-redux';
import store from './redux/store/store';
import Signup from './component/User/Signup/Signup';
import Login from './component/User/Login/Login';
import './App.css';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        hello world
        <Login />
        <Signup />
      </div>
    </Provider>
  );
}

export default App;
