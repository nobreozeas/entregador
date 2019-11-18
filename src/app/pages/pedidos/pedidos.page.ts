import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/interfaces/pedidos';
import { Subscription } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  private pedidos = new Array<Pedidos>();
  private pedidosSubscription: Subscription;
  private loading: any;


  constructor(
    private pedidosService: PedidosService, 
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fcm: FCM) { 
    this.pedidosSubscription = this.pedidosService.getPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  ngOnInit() { 
    this.fcm.getToken().then(token => {
      console.log(token);
    });
  }

  ngOnDestroy(){
    this.pedidosSubscription.unsubscribe();
  }

  async logout(){
    try{
      await this.authService.logout();
    }catch(error){
      console.error(error);
    }
  }

  async deletePedido(id: string){
    try{
      await this.pedidosService.deletePedido(id);
    }catch(error){
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: "Aguarde..." });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
