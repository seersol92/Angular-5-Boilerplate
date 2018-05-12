import { Routes, RouterModule } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
    },
];
