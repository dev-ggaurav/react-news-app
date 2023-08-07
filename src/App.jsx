import Search from "./components/Search";
import Articles from "./components/Articles";
import Pagination from "./components/Pagination";

function App() {
  return (
    <div className="app">
      <h1 className="heading">React News App</h1>
      <Pagination />
      <Search />
      <Articles />
    </div>
  );
}

export default App;
