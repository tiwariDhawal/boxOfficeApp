import { Route, Switch } from "react-router";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        This is the home page
      </Route>
      <Route exact path="/starred">
        This is the starred page
      </Route>
      <Route>This is a 404 page</Route>
    </Switch>
  );
}

export default App;
