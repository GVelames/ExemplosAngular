import { Component } from "@angular/core";
import { ConsultarNomesService } from "src/app/services/consultar-nomes.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    nomes: string[];

    constructor(private consultarNomes$: ConsultarNomesService){}

    listarNomes(){
        this.consultarNomes$.listarNomes().subscribe(
            response => this.nomes = response,
            error => console.log(error)
        );
    }

    limparNomes() {
        this.nomes = [];
    }
}