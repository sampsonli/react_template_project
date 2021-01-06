const Api = {
    getRemoteData: () => new Promise((resolve => {
            setTimeout(() => {
                resolve(999);
            }, 200);
        })),
};
export default Api;
