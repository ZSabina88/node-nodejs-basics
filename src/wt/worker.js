// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    postMessage({ status, data });
};
onmessage = function (e) {
    const { data } = e;

    try {
        const result = nthFibonacci(data);

        sendResult('resolved', result);
    } catch (error) {
        sendResult('error', null);
    }
};

sendResult();