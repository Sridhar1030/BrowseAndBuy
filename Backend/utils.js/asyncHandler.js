function asyncHandler(requestHandler) {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) =>
            next(err)
        );
    };
}


// const asyncHandler = (fn) =>async () => {
//     try {
//         await fn(req, res , next);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

export  {asyncHandler};
