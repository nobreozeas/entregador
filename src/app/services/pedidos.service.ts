import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Pedidos } from '../interfaces/pedidos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private pedidosCollection: AngularFirestoreCollection<Pedidos>;


  constructor(private afs: AngularFirestore) { 
    this.pedidosCollection = this.afs.collection<Pedidos>('pedidos');
  }

  addPedido(pedidos: Pedidos){
    return this.pedidosCollection.add(pedidos);
  }

  getPedidos(){
    return this.pedidosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getPedido(id: string){
    return this.pedidosCollection.doc<Pedidos>(id).valueChanges();
  }
  
  updatePedido(id: string, pedidos: Pedidos){
    return this.pedidosCollection.doc<Pedidos>(id).update(pedidos);
  }

  deletePedido(id: string){
    return this.pedidosCollection.doc(id).delete();
  }
}
