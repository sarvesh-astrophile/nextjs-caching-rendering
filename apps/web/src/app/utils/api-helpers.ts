export const getData = async (apiURL: string, caller: string, options = {}) => {
    const url = new URL(apiURL);

    console.log(`[${caller}] Fetching data from ${url.pathname} started`);

    const startTime = performance.now();

    const response = await fetch(apiURL, options);

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    if (!response.ok) {
        console.log(`featch url ${url.pathname} failed`);
        throw new Error(`[${caller}] Error fetching data from ${url.pathname}`);
    }

    const data = await response.json();

    console.log(`[${caller}] Data fetched in ${duration}ms`);

    return data;
}