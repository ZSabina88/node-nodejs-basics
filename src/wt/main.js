const performCalculations = async () => {
    const numCores = navigator.hardwareConcurrency;

    const workers = [];

    const results = [];

    for (let i = 0; i < numCores; i++) {
        const worker = new Worker('worker.js');

        worker.postMessage(10 + i);

        workers.push(worker);

        const resultPromise = new Promise((resolve) => {
            worker.onmessage = function (e) {
                resolve(e.data);
            };

            worker.onerror = function () {
                resolve({ status: 'error', data: null });
            };
        });

        results.push(resultPromise);
    }

    const finalResults = await Promise.all(results);

    console.log(finalResults);
};

await performCalculations();