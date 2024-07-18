import logo from './logo.svg';
import './App.css';
import CustomerTable from './components/CustomerTable/CustomerTable';
import CustomerGraph from './components/CustomerGraph/CustomerGraph';

function App() {
  return (
    <>
    <div className='main'>
      <div className='w-50'>
        <CustomerTable />
      </div>
      <div className='w-50'>
        <CustomerGraph />
      </div>
    </div>
    </>

  );
}

export default App;
