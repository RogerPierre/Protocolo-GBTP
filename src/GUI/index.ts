import { BancoService } from "../RegrasNegocio/bancoService";
import { GBTPResponse } from "../protocolo/GBTPResponse";

export class Index {

    private bancoService: BancoService;

    constructor() {
        this.bancoService = new BancoService();

        this.configurarEventos();
    }

    private configurarEventos(): void {

        const btnSaldo = document.getElementById('btnSaldo');
        const btnDeposito = document.getElementById('btnDeposito');
        const btnSaque = document.getElementById('btnSaque');
        const btnTransferencia = document.getElementById('btnTransferencia');

        btnSaldo?.addEventListener('click', () => this.consultarSaldo());

        btnDeposito?.addEventListener('click', () => this.depositar());

        btnSaque?.addEventListener('click', () => this.sacar());

        btnTransferencia?.addEventListener('click', () => this.transferir());
    }

    private async consultarSaldo(): Promise<void> {

        const conta = this.getValorInput('accountId');

        const resposta = await this.bancoService.consultarSaldo(conta);

        this.exibirResposta(resposta);
    }

    private async depositar(): Promise<void> {

        const conta = this.getValorInput('accountId');
        const valor = Number(this.getValorInput('value'));

        const resposta = await this.bancoService.depositar(conta, valor);

        this.exibirResposta(resposta);
    }

    private async sacar(): Promise<void> {

        const conta = this.getValorInput('accountId');
        const valor = Number(this.getValorInput('value'));

        const resposta = await this.bancoService.sacar(conta, valor);

        this.exibirResposta(resposta);
    }

    private async transferir(): Promise<void> {

        const contaOrigem = this.getValorInput('accountId');
        const contaDestino = this.getValorInput('toAccountId');
        const valor = Number(this.getValorInput('value'));

        const resposta = await this.bancoService.transferir(
            contaOrigem,
            contaDestino,
            valor
        );

        this.exibirResposta(resposta);
    }

    private getValorInput(id: string): string {

        const elemento = document.getElementById(id) as HTMLInputElement;

        return elemento.value;
    }

    private exibirResposta(resposta: GBTPResponse): void {

        const resultado = document.getElementById('resultado');

        if (!resultado) return;

        resultado.innerHTML = `
            <p><strong>Status:</strong> ${resposta.status}</p>
            <p><strong>Mensagem:</strong> ${resposta.message}</p>
            <p><strong>Saldo:</strong> ${resposta.balance}</p>
        `;
    }
}

new Index();