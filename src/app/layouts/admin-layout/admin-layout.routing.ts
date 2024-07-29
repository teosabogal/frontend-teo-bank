import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CrearProductoComponent } from '../../pages/crear-producto/crear-producto.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ListadoProductoComponent } from '../../pages/listado-producto/listado-producto.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'listado-producto',         component: ListadoProductoComponent },
    { path: 'crear-producto',          component: CrearProductoComponent },
    { path: 'maps',           component: MapsComponent }
];
