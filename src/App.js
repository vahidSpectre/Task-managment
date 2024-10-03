import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Loading from './components/common/Loading';

import './App.css';
function App() {
  const HomePage = React.lazy(() => import('./pages/Home'));
  const EditPage = React.lazy(() => import('./pages/EditTask'));
  const AddPage = React.lazy(() => import('./pages/AddTask'));
  const NotFound = React.lazy(() => import('./pages/NotFound'));

  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
      supportedLngs: ['en', 'fr'],
      fallbackLng: 'en',
      backend: {
        loadPath:
          'http://localhost:3000/assets/locales/{{lng}}/translation.json',
      },
      detection: {
        order: ['path', 'localStorage', 'cookie', 'htmlTag', 'subdomain'],
        caches: ['localStorage'],
      },
      lookupFromPathIndex: 1,
      checkWhitelist: true,
    });
  return (
    <div className='App'>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Sidebar>
                  <Header />
                  <HomePage />
                </Sidebar>
              </>
            }
          />
          <Route
            path='/add'
            element={
              <>
                <Sidebar>
                  <Header />
                  <AddPage />
                </Sidebar>
              </>
            }
          />
          <Route
            path='/edit/:id'
            element={
              <>
                <Sidebar>
                  <Header />
                  <EditPage />
                </Sidebar>
              </>
            }
          />
          <Route
            path='/notfound'
            element={
              <>
                <Sidebar>
                  <Header />
                  <NotFound />
                </Sidebar>
              </>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
