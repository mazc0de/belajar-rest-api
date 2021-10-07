const error = (error, req, res, next) => {
    if (error) {
        res.json({
            status: 500,
            data: {
                message: "Oops! server error.",
            },
        });
    }
};
module.exports = error;