import { BalanceUseCase } from "../RegrasNegocio/BalanceUseCase";


class GUIClientOperantion {
    constructor(
        private butons = Array.from(document.querySelectorAll('.botao').values()),
        private saudacao = (document.querySelector('.saudacao'))
    ) { }
    private onClick(services: string[]): void {
        this.butons.find(buton => {

        })
    }
}