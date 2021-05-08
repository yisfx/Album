export const splitDesc = (str: string, isFull?: boolean) => {
    if (str.length > 50 && !isFull) {
        return str.substring(0, 50).replace('/-/-/g', "<br/>")
    } else {
        return str.replace('/-/-/g', "<br/>");
    }
}