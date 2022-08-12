import { useEffect } from 'react';
import TodoMain from './components/TodoMain';

function App() {
	useEffect(() => {
		console.log('render');
	});
	return <TodoMain />;
}

export default App;
