import { Component, OnInit, Input } from "@angular/core";
import { ProductModel } from "src/app/models/ProductModel";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { ServiceService } from "src/app/services/service.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-crear-producto",
  templateUrl: "./crear-producto.component.html",
  styleUrls: ["./crear-producto.component.scss"],
})
export class CrearProductoComponent implements OnInit {

  @Input() product = new ProductModel();
  @Input() mostrar: boolean = true;

  public copy: string;
  f = new Date();
  //fecha:any = (this.f.getFullYear()) + "-" + 0 + (this.f.getMonth() +1) + "-" +  this.f.getDate();

  fecha: any = this.f.getFullYear() + "-" + ('0' + (this.f.getMonth() + 1)).slice(-2) + "-" + ('0' + this.f.getDate()).slice(-2);
  minDate: string;

  constructor(private _services: ServiceService, private modal: NgbModal) {}

  ngOnInit() {
    this.minDate = this.fecha;
  }

  checkId(id: string, f: NgForm) {
    this._services.checkProductId(id).subscribe(exists => {
      if (exists) {
        f.controls['id'].setErrors({ exists: true });
      }
    });
  }

  // Al reutilizar este componente valido de que componente lo estoy llamando y así ejecuto los metodos correspondientes.

  onSubmit(f: NgForm) {

    if (f.invalid) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos!",
        text: "Por favor llene todos los campos.",
      });
      return;
    }

    Swal.fire({
      icon: "info",
      title: "Guardando información",
      text: "Espere un momento por favor...",
    });

    Swal.showLoading();

    if (this.mostrar) {
      this._services.createProduct(this.product).subscribe((resp) => {
        Swal.fire({
          icon: "success",
          title: "Guardado correctamente!",
        });
        f.reset();
      });
    } else {
      this._services.updateProduct(this.product).subscribe((resp) => {
        Swal.fire({
          icon: "success",
          title: "Editado correctamente!",
        });
        this.modal.dismissAll();
      });
    }
  }

  resetForm(f: NgForm){
    f.reset();
  }

  updateRevisionDate() {
    if (this.product.date_release) {
      const releaseDate = new Date(this.product.date_release);
      const revisionDate = new Date(releaseDate);
      revisionDate.setFullYear(releaseDate.getFullYear() + 1);
      this.product.date_revision = revisionDate.toISOString().split('T')[0];
    }
  }

  keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
        }
  }
}
