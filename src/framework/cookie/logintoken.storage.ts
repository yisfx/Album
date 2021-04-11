import { FastifyReply } from "fastify";


export function useLoginTokenStorage(cookie: FastifyReply) {

    const kookie = cookie;
    return {
        getToken() {
            return kookie.cookie[""]
        }
    }

}