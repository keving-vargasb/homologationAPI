const utils = require('../util/util');

const quoteApplicationInAdminseg = async (quoteData) => {

    const quotation = await utils.fetchPOST({
        url: `${process.env.ADMINSEG_URL_API}/quote/results`,
        data: quoteData,
        headers: {
            apikey: process.env.ADMINSEG_API_KEY,
        },
    });
    return quotation;
}

const submitApplicationInAdminseg = async (quotationData) => {
    const quoteData = await utils.fetchPOST({
        url: `${process.env.ADMINSEG_URL_API}/application/submit`,
        data: quotationData,
        headers: {
            apikey: process.env.ADMINSEG_API_KEY,
        },
    });
    return quoteData;
}

module.exports = {
    quoteApplicationInAdminseg,
    submitApplicationInAdminseg
}