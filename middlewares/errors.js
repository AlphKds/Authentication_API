function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        return res.status(400).json({ message: err });
    }

    if (typeof err === "object") {  // Perbaiki kondisi menjadi "object"
        return res.status(401).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
}

module.exports = {
    errorHandler,
};
