

export interface RequestNBTP {
    OPERANTION: "BALANCE" | "DEPOSIT" | "WITHDRAW" | "TRANSFER"
    ID_ACOUNT: string
    TO_ID_ACOUNT: string | null
    VALUE: Number
}
export interface ResponseNBTP {
    STATUS: 'OK' | 'ERROR'
    MENSAGE: string
    VALUE: number
}
export default class ProtocoloNBTP {
    ///em codigos de entrada de string. retire toda indentação e quebra de linhas
    public resToString(Res: ResponseNBTP): string {
        return `STATUS:${Res.STATUS}\n` +
            `MENSAGE:${Res.MENSAGE}\n` +
            `VALUE:${Res.VALUE}`
    }
    public stringToRes(stringRes: string): ResponseNBTP {
        const ResSplit = stringRes.split("\n");
        let status = ResSplit[0]!.split("STATUS:")[1]
        let mensage = ResSplit[1]!.split("MENSAGE:")[1]
        let value = ResSplit[2]!.split("VALUE:")[1]

        return {
            STATUS: status as 'OK' | 'ERROR',
            MENSAGE: mensage,
            VALUE: Number(value)
        } as ResponseNBTP
    }
    public reqToString(Req: RequestNBTP): string {

        return `OPERANTION: ${Req.OPERANTION}\n` +
            `ID_ACOUNT: ${Req.ID_ACOUNT}\n` +
            `TO_ID_ACOUNT: ${Req.TO_ID_ACOUNT}\n` +
            `VALUE: ${Req.VALUE}`
    }
    public stringToReq(stringReq: string): RequestNBTP {
        const ReqSplit = stringReq.split("\n");
        let OPERANTION = ReqSplit[0]!.split("OPERANTION:")[1]
        let ID_ACOUNT = ReqSplit[1]!.split("ID_ACOUNT:")[1]
        let TO_ID_ACOUNT = ReqSplit[2]!.split("TO_ID_ACOUNT:")[1]
        let value = ReqSplit[3]!.split("VALUE:")[1]

        return {
            OPERANTION: OPERANTION as "BALANCE" | "DEPOSIT" | "WITHDRAW" | "TRANSFER",
            ID_ACOUNT: ID_ACOUNT,
            TO_ID_ACOUNT: TO_ID_ACOUNT,
            VALUE: Number(value)
        } as RequestNBTP
    }
}
///tests code area
