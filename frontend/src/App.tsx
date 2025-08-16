import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { DefaultLayout } from './components/layouts';
import { publicRoutes } from './routes';
import { Null } from './constant';
function App() {
  return (
    <BrowserRouter>
      <div className="app">
          <Routes>
            {publicRoutes.map((route, index) => {
                const Page = route.component;
                switch (route.layout) {
                    case Null:
                        return <Route key={route.path} path={route.path} element={<Page />}></Route>;
                    default:
                        return (
                            <Route key={route.path} path="/" element={<DefaultLayout />}>
                                <Route path={route.path} element={<Page />}></Route>;
                            </Route>
                        );
                }
            })}
                    
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
