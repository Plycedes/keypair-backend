const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).cathc((err) => next(err));
  };
};

export { asyncHandler };
