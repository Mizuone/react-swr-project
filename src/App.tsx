import { Route, Routes } from 'react-router-dom';

import { Dashboard } from './components/Dashboard';

export const App = () => {
  return (
    <>
      <div className='flex flex-row max-h-full h-screen'>
          <div className='flex-auto px-4'>
              <Routes>
                  <Route path="/" element={ <Dashboard /> } />
              </Routes>
          </div>
      </div>
    </>
  );
}