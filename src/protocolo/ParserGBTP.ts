import { GBTPRequest } from "./GBTPRequest.js";
import { GBTPResponse } from "./GBTPResponse";

export class ParserGBTP {

    public static montarMensagem(req: GBTPRequest): string {
        return `
OPERATION:${req.operation}
ACCOUNT_ID:${req.accountId}
TO_ACCOUNT_ID:${req.toAccountId}
VALUE:${req.value}
        `.trim();
    }

    public static parseResposta(msg: string): GBTPResponse {

        const linhas = msg.split('\n');

        const dados: any = {};

        linhas.forEach(linha => {
            const [chave, valor] = linha.split(':');
            dados[chave!] = valor;
        });

        return {
            status: dados.STATUS,
            message: dados.MESSAGE,
            balance: Number(dados.BALANCE)
        };
    }
}