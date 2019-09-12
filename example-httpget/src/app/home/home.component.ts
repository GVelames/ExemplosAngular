import { Component } from "@angular/core";
import { ConsultarNomesService } from "src/app/services/consultar-nomes.service";
import { SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    nomes: string[];
    imagem: SafeUrl;

    constructor(private consultarNomes$: ConsultarNomesService){}

    ngOnInit() {
        this.nomes = [];
    }

    listarNomesFromServer(){
        this.consultarNomes$.listarNomesFromServer().subscribe(
            response => this.nomes = response,
            error => console.log(error)
        );
    }

    listarNomesFromJson(){
        this.consultarNomes$.listarNomesFromJson().subscribe(
            response => this.nomes = response,
            error => console.log(error)
        );
    }

    listarNomesFromTxt(){
        this.consultarNomes$.listarNomesFromTxt().subscribe(
            response => this.nomes = response,
            error => console.log(error)
        );
    }

    carregarImagem(){
        this.consultarNomes$.carregarImagem().subscribe(
            response => this.imagem = response,
            error => console.log(error)
        );
    }


    limparNomes() {
        this.nomes = [];
    }
}