import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Wrapper from "./components/Wrapper";
import Identity from "./components/Identity";
import Resume from "./components/Resume";

console.log(__dirname);

const App = () => (
	<Wrapper components={[Identity, Resume]} />
);

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
