import { ComunicadorClient } from "../comunicador/ComunicadorClient";
import { ParserGBTP } from "../protocolo/ParserGBTP";
import { GBTPResponse } from "../protocolo/GBTPResponse";

export class BancoService {

    private comunicador = new ComunicadorClient();

    public async consultarSaldo(conta: string): Promise<GBTPResponse> {

        const mensagem = ParserGBTP.montarMensagem({
            operation: 'BALANCE',
            accountId: conta,
            toAccountId: '',
            value: 0
        });

        const resposta = await this.comunicador.enviarMsg(mensagem);

        return ParserGBTP.parseResposta(resposta);
    }

    public async depositar(conta: string, valor: number): Promise<GBTPResponse> {

        const mensagem = ParserGBTP.montarMensagem({
            operation: 'DEPOSIT',
            accountId: conta,
            toAccountId: '',
            value: valor
        });

        const resposta = await this.comunicador.enviarMsg(mensagem);

        return ParserGBTP.parseResposta(resposta);
    }

    public async sacar(conta: string, valor: number): Promise<GBTPResponse> {

        const mensagem = ParserGBTP.montarMensagem({
            operation: 'WITHDRAW',
            accountId: conta,
            toAccountId: '',
            value: valor
        });

        const resposta = await this.comunicador.enviarMsg(mensagem);

        return ParserGBTP.parseResposta(resposta);
    }

    public async transferir(
        origem: string,
        destino: string,
        valor: number
    ): Promise<GBTPResponse> {

        const mensagem = ParserGBTP.montarMensagem({
            operation: 'TRANSFER',
            accountId: origem,
            toAccountId: destino,
            value: valor
        });

        const resposta = await this.comunicador.enviarMsg(mensagem);

        return ParserGBTP.parseResposta(resposta);
    }
}