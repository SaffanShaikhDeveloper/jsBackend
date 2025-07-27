//**                                               This is a wrapper function to accept a function and return it/exceute it */

//Mutliple way to create a function returning function
// Different ways

//Higher Order function

// 1) way

const asyncHandler = (requestHandlerFunctionName) => {
  (req, res, next) => {
    Promise.resolve(requestHandlerFunctionName(req, res, next)).catch((err) =>
      next(err)
    );
  };
};
export { asyncHandler };

// 2) way
/* 
const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    res.status(err.code || 500).json({
      success: false,
      message: err.message,
    });
  }
};
 */
