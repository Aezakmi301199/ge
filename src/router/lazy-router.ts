import { lazy } from 'react';

const PropertyPage = lazy(() => import('../pages/property.page'));
const NotFoundPage = lazy(() => import('../pages/not-found.page'));
const ApartmentPage = lazy(() => import('../pages/properties.page'));
const PropertyCardPage = lazy(() => import('../pages/property-map.page'));
const NewProperty = lazy(() => import('../pages/new-property.page'));
const CollectionPage = lazy(() => import('../pages/collection.page'));

export { PropertyPage, NotFoundPage, ApartmentPage, NewProperty, PropertyCardPage, CollectionPage };
