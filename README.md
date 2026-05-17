# Protocolo-GBTP

Este projeto é uma aplicação cliente web para interagir com um servidor bancário simulado, utilizando um protocolo de texto personalizado chamado **GBTP** via WebSockets.

## 📋 Sobre o Projeto

O projeto implementa uma interface para a realização de operações bancárias básicas através de um protocolo leve baseado em texto. Ele envia requisições e recebe respostas de um servidor rodando localmente (`ws://localhost:7001`).

As operações suportadas são:
- Consulta de Saldo (`BALANCE`)
- Depósito (`DEPOSIT`)
- Saque (`WITHDRAW`)
- Transferência (`TRANSFER`)

## 🏗 Arquitetura do Projeto

A aplicação está dividida em camadas lógicas para garantir a separação de responsabilidades, construída com TypeScript:

- **`src/GUI` (`index.ts`)**: Controlador da interface do usuário. Faz a ligação (bind) dos eventos dos botões e campos de input HTML, atualizando a tela com as respostas do servidor.
- **`src/RegrasNegocio` (`BancoService.ts`)**: Encapsula as chamadas das operações bancárias, atuando como o intermediário principal entre a interface e o protocolo.
- **`src/comunicador` (`ComunicadorClient.ts`)**: Gerencia a conexão WebSocket e o envio/recebimento de dados via rede.
- **`src/protocolo`**:
  - `ParserGBTP.ts`: Responsável por serializar os dados no formato textual exigido pelo protocolo e realizar o *parse* (desserialização) das respostas do servidor para objetos TypeScript.
  - `GBTPRequest.ts` e `GBTPResponse.ts`: Interfaces de tipagem dos dados.

## 🔌 Especificação do Protocolo (GBTP)

A comunicação é baseada em texto plano com chaves e valores separados por dois pontos (`:`), e cada campo é separado por quebra de linha.

### Formato da Requisição (Request)

```text
OPERATION:<Tipo_da_Operacao>
ACCOUNT_ID:<Conta_Origem>
TO_ACCOUNT_ID:<Conta_Destino>
VALUE:<Valor>
```

### Formato da Resposta (Response)

```text
STATUS:<Status_da_Operacao>
MESSAGE:<Mensagem_Detalhada>
BALANCE:<Saldo_Atualizado>
```

## 🚀 Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento (via Parcel):
   ```bash
   npm run dev
   ```

Acesse a página no navegador através do endereço fornecido pelo Parcel (geralmente `http://localhost:1234`).

> **Nota**: Para testar a aplicação de fato, garanta que o servidor WebSocket correspondente ao protocolo GBTP esteja executando em segundo plano (`ws://localhost:7001`).