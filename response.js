export function createResponse(success, errorMessage, data, message) {
  return {
    success,
    errorMessage,
    data,
    message,
  };
}
