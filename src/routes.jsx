import React from "react";
import { Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import  { Pet } from "./Pages/Pet/Pet";
import { PetAdmin } from "./Pages/PetAdmin/PetAdmin";
import { Vet } from "./Pages/Vet/Vet";
import { Category } from "./Pages/Category/Category";
import { Report } from "./Pages/Report/Report";
import { Publications } from "./Pages/Publications/Publications";
import { PublicationAdmin } from "./Pages/PublicationAdmin/PublicationAdmin";
import { Veterinary } from "./Pages/Veterinary/Veterinary";
import { AdoptionAppointment } from "./Pages/adoptionAppointment/adoptionAppointment";
import { Home } from './Pages/Home/Home';

import HomeChange from "./Components/HomeChange/HomeChange";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { element } from "prop-types";
import { HomeC } from "./Pages/Home/HomeC";


export const routes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/HomeChange',
    element: (
      <HomeChange>
        {/* Puedes renderizar algo aquí si lo necesitas */}
      </HomeChange>
    )
  },
  {
    path: '/Register',
    element: <Register />
  },
  {
    path: '/Home',
    element: (

        <Home />
    )
  },
  {
    path: '/HomeC',
    element: <HomeC/>
  },
  {
    path: '/Pet',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <Pet />
      </ProtectedRoute>
    )
  },
  {
    path: '/Vet',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <Vet />
      </ProtectedRoute>
    )
  },
  {
    path: '/PetAdmin',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <PetAdmin />
      </ProtectedRoute>
    )
  },
  {
    path: '/Category',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <Category />
      </ProtectedRoute>
    )
  },
  {
    path: '/Report',
    element: (
      <ProtectedRoute allowedRoles={['CLIENT']}>
        <Report />
      </ProtectedRoute>
    )
  },
  {
    path: '/Publications',
    element: (
      <ProtectedRoute allowedRoles={['CLIENT']}>
        <Publications />
      </ProtectedRoute>
    )
  },
  {
    path: '/PublicationAdmin',
    element: (
      <ProtectedRoute allowedRoles={['CLIENT']}>
        <PublicationAdmin />
      </ProtectedRoute>
    )
  },
  {
    path: '/Appointment',
    element: (
      <ProtectedRoute allowedRoles={['CLIENT']}>
        <AdoptionAppointment />
      </ProtectedRoute>
    )
  },
  {
    path: '/Veterinary',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <Veterinary />
      </ProtectedRoute>
    )
  },
  {
    path: '/unauthorized',
    element: <div>No tienes acceso a esta página</div>
  }
];
