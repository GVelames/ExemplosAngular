import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { map, tap, catchError }   from 'rxjs/operators';
import { DomSanitizer } from "@angular/platform-browser";


@Injectable()
export class ConsultarNomesService {


    /** Url com os nomes */
    private url: string = "http://www.mocky.io/v2/5d75a2c13100004b3395064b";
    /** Caminho do arquivo json */
    private arquivoJson: string = "assets/nomes.json";
    /** Caminho do arquivo txt */
    private arquivoTxt: string = "assets/nomes.txt";
    /** Caminho da imagem */
    private caminhoImagem: string = "/favicon.ico";



    constructor(private http$: HttpClient, private domSanitizer: DomSanitizer) {}


    /**
     * Listar os nomes do servidor
     */
    listarNomesFromServer(): Observable<any> {
        // Para usar operadores do RXJS, eles devem estar dentro do método PIPE.
        return this.http$.get(this.url).pipe(
            // Usamos este operador para manipular o item recebido e enviar o resultado para o ouvinte
            map((response) => {
                response[0] = 'Gilvan Sobrenome';
                return response;
            }),

            // Muito utilizado com o intuito de logar os resultados
            tap((response) => {
                    console.log("Log da execucao com sucesso.");
                },
                (error) => {
                    console.log("Log do erro ocorrido.", error);
            }),

            // Tratamento do erro ocorrido.
            // Podemos relançar o erro ou retornar um observable atráves do método OF
            catchError((err) => {
                console.log("Ocorreu um erro na execucao", err);
                return throwError("Error thrown from catchError");
                // return of(["Erro na execucao"]);
            })
        );
    }


    /**
     * Listar nomes de um arquivo json
     */
    listarNomesFromJson(): Observable<any> {
        return this.http$.get(this.arquivoJson);
    }


    /**
     * Listar nomes de um arquivo texto
     */
    listarNomesFromTxt(): Observable<any> {
        // Por default o responseType é json. Como estamos buscando um arquivo texto, devemos passar o valor 'text'
        return this.http$.get(this.arquivoTxt, { responseType: 'text' }).pipe(
            map(response => response.split(","))
        );
    }


    /**
     * Carregar uma imagem de determinado diretorio
     */
    carregarImagem(): Observable<any> {
        // Para buscar arquivos, devemos utilizar o responseType 'blob'. Uma ponto de atenção. Caso tenha que retorna um Observable<Blob>
        // devemos passar o seguinte valor no responseType: 'blob' as 'json'
        return this.http$.get(this.caminhoImagem, { responseType: 'blob' }).pipe(
            map( response => {
                return this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response));
            })
        );
    }
}