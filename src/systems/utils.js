const formatResponse = (status, message, data) => {
    return { status, message, data };
};

module.exports = {
    formatResponse,
};
