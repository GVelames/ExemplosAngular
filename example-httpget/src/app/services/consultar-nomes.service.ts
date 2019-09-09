import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { map, tap, catchError }   from 'rxjs/operators';


@Injectable()
export class ConsultarNomesService {

    private url: string = "http://www.mocky.io/v2/5d75a2c13100004b3395064b"

    constructor(private http: HttpClient) {}

    listarNomes(): Observable<any> {
        // Para usar operadores do RXJS, eles devem estar dentro do método PIPE.
        return this.http.get(this.url).pipe(
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
}