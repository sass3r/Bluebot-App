import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the Control page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {

    dispositivos:Array<Object> = [];
    serialSelected:String = "";
    connStatus:String = "Desconectado";
    buttonColor:String = "";
    buttonName:String = "Conectar";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public bluetoothSerial: BluetoothSerial) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Control');
    this.getDispositivos();
  }

  getDispositivos(){
      var promesa:any = this.bluetoothSerial.list();
      promesa.then((devices)=>{
          console.log(devices);
          this.dispositivos = devices
      });
  }

    conectar(serial:string){
        let connection:Observable<BluetoothSerial>;
        if(this.buttonName == "Conectar"){
            connection = this.bluetoothSerial.connect(serial);
            connection.subscribe((data)=>{
                this.bluetoothSerial.isConnected().then((res)=>{
                    console.log(res);
                    this.connStatus = "Conectado";
                    this.buttonColor = "danger";
                    this.buttonName = "Desconectar";
                }).catch((res)=>{
                    console.log("Fail Connection");
                    console.log(res);
                    this.connStatus = "Error de conexion.";
                    this.buttonColor = "";
                    this.buttonName = "Conectar";
                });
            });
        }else if(this.buttonName == "Desconectar"){

            this.bluetoothSerial.disconnect()
                .then((res)=>{
                    console.log(res);
                    this.connStatus = "Desconectado";
                    this.buttonColor = "";
                    this.buttonName = "Conectar";
                })
                .catch((res)=>{
                    console.error(res);
                }); 
        }

    }

    adelante(){
        this.bluetoothSerial.write("AA")
            .then((res)=>{
                console.log("Envio?");
                console.log(res);
            })
            .catch((res)=>{
                console.error("Error");
                console.error(res);
            
            });
    }

    izquierda(){
        this.bluetoothSerial.write("DD")
            .then((res)=>{
                console.log("Envio?");
                console.log(res);
            })
            .catch((res)=>{
                console.error("Error");
                console.error(res);
            
            });
    }
    
    derecha(){
        this.bluetoothSerial.write("CC")
            .then((res)=>{
                console.log("Envio?");
                console.log(res);
            })
            .catch((res)=>{
                console.error("Error");
                console.error(res);
            
            });
    }

    retroceder(){
        this.bluetoothSerial.write("BB")
            .then((res)=>{
                console.log("Envio?");
                console.log(res);
            })
            .catch((res)=>{
                console.error("Error");
                console.error(res);
            
            });
    }

    abrirPinza(){
        this.bluetoothSerial.write("EE")
            .then((res)=>{
                console.log("Envio?");
                console.log(res);
            })
            .catch((res)=>{
                console.error("Error");
                console.error(res);
            
            });
    }

    cerrarPinza(){
        this.bluetoothSerial.write("FF")
            .then((res)=>{
                console.log("Envio?");
                console.log(res);
            })
            .catch((res)=>{
                console.error("Error");
                console.error(res);
            
            });
    }
}
