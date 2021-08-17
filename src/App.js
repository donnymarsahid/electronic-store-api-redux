import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './access/Login';
import Register from './access/Register';
import AddProducts from './products/AddProducts';
import EditProducts from './products/EditProducts';
import Products from './products/Products';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/add" component={AddProducts} />
        <Route path="/edit/:id" component={EditProducts} />
        {/* Access */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
