import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'pedidos',
        loadChildren: '../pedidos/pedidos.module#PedidosPageModule'
      },
      { 
        path: 'details',
        loadChildren: '../details/details.module#DetailsPageModule' 
      },
      { 
        path: 'details/:id',
        loadChildren: '../details/details.module#DetailsPageModule' 
      },
      {
        path: "my-account",
        loadChildren: "../my-account/my-account.module#MyAccountPageModule"
      },
      { 
        path: 'maps',
        loadChildren: '../maps/maps.module#MapsPageModule' 
      }
    ]
  },
  {
    path: 'pedidos',
    redirectTo: '/tabs/pedidos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
