import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoute from "./routes/Route";
import store from "./redux/store";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
