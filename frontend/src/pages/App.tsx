import { Route, Switch } from 'react-router-dom';
import ImageList from './ImageList';
import About from './About';
import NavbarComp from '../components/Navbar';
import PageNotFound from './PageNotFound';
import { ToastContainer } from 'react-toastify';
import '../styles/App.css';
import ImageUpload from './ImageUpload';

function App() {
  return (
    <div className="container fluid">
      <div id="content">
        <NavbarComp />

        <Switch>
          <Route path="/" exact component={ImageList} />
          <Route path="/upload" component={ImageUpload} />
          <Route path="/about" component={About} />
          <Route component={PageNotFound} />
        </Switch>
      </div>

      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
