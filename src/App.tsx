import Dashboard from './pages/dsashboard';
import { useAppContext} from './context/contextProvider';

function App() {

  //${lightTheme ? 'bg-white' : 'bg-black'}`

  const {isHot}= useAppContext();

  return (
    <div className={`w-full h-full flex md:w-screen bg-gradient-to-br ${isHot?"from-yellow-400 to-red-700":"from-cyan-700 to-blue-700 "} md:h-[100vh]`}>
        <Dashboard/>
    </div>
  )
}

export default App;
