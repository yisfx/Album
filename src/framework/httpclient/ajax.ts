import { BaseResponse } from "../../model/response/baseResponse";

async function Ajax(api: string, request): Promise<BaseResponse> {
    try {
        let resp: any = await fetch("/ajax/api/" + api, {
            body: JSON.stringify(request),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer'
        });
        return resp;
    } catch (ex) {
        return { Result: "error", ErrorMessage: ex }
    }
}

export { Ajax }