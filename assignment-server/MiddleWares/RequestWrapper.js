const RequestWrapper = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

exports.RequestWrapper = RequestWrapper