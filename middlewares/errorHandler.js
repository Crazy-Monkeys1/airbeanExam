export default function errorHandler(error, req, res, next) {
  res.status(error.status).json({
    success: false,
    message: error.message,
  });
}
