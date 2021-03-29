export const splitDesc = (str: string) => {
    if (str.length > 50) {
        return str.substring(0, 50).replace('/', "<br/>")
    } else {
        return str.replace('/', "<br/>");
    }
}