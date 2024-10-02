import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import './index.css';
import './i18n/config.ts';
import InitPage from './pages/init.page';
import { RootStoreProvider } from './provider/store.provider';
import { UserProvider } from './provider/user.provider';
import {
  ApartmentPage,
  CollectionPage,
  NewProperty,
  NotFoundPage,
  PropertyCardPage,
  PropertyPage,
} from './router/lazy-router';
import { PagePath } from './shared/enums/page-path.enum';
import CardLayout from './widgets/layout/card.layout';
import Layout from './widgets/layout/layout';
import ObjectLayout from './widgets/layout/object.layout';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter([
  // {
  //   path: PagePath.EMPTY_PATH,
  //   element: (
  //     <Suspense fallback={<CircularProgress />}>
  //       <App />
  //     </Suspense>
  //   ),
  // },
  {
    path: `${PagePath.PROPERTY}/:id`,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ObjectLayout>
          <PropertyPage />
        </ObjectLayout>
      </Suspense>
    ),
  },
  {
    path: PagePath.EMPTY_PATH,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Layout>
          <ApartmentPage />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: PagePath.COLLECTION,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Layout>
          <CollectionPage />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: PagePath.NEW_PROPERTY,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Layout>
          <NewProperty />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: PagePath.MAP,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <CardLayout>
          <PropertyCardPage />
        </CardLayout>
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: PagePath.INSTALL,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <InitPage />
      </Suspense>
    ),
  },
]);

root.render(
  <RootStoreProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </RootStoreProvider>,
);
