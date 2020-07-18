export async function makeRequest({
    method,
    url,
    payload,
    success,
    errCallback
}) {
    try {
        let res = await axios({
            method: method.toLowerCase(),
            url: url,
            data: payload
        });
        if (success) success(res, payload);
    } catch (err) {
        if (!errCallback) {
            console.log(err);
        } else {
            errCallback(err, payload);
        }
    }
}
