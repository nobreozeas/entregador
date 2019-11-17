import { Component, OnInit } from "@angular/core";
import { Pedidos } from "src/app/interfaces/pedidos";
import { LoadingController, ToastController, NavController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { PedidosService } from "src/app/services/pedidos.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  private pedidos: Pedidos = {};
  private loading: any;
  private pedidoId: string = null;
  private pedidoSubscription: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private pedidoService: PedidosService,
    private NavCtrl: NavController
  ) {
    this.pedidoId = this.activeRoute.snapshot.params["id"];

    if (this.pedidoId) this.loadPedido();
  }

  ngOnInit() {}

  ngOnDestroy(){
    if (this.pedidoSubscription){
      this.pedidoSubscription.unsubscribe();
    }
  }

  loadPedido() {
    this.pedidoSubscription = this.pedidoService
      .getPedido(this.pedidoId)
      .subscribe(data => {
        this.pedidos = data;
      });
  }

  async savePedido() {
    await this.presentLoading();

    this.pedidos.userId = this.authService.getAuth().currentUser.uid;

    if(this.pedidoId){
      try{
        await this.pedidoService.updatePedido(this.pedidoId, this.pedidos);
        await this.loading.dismiss();
        await this.NavCtrl.navigateBack('/tabs/pedidos');

      }catch(error){

      }

    }else{
      this.pedidos.createdAt = new Date().getTime();

      try{
        await this.pedidoService.addPedido(this.pedidos);
        await this.loading.dismiss();

        this.NavCtrl.navigateBack('/tabs/pedidos');
      }catch(error){
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
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
