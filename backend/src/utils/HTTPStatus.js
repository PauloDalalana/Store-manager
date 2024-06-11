const HTTPStatus = (status) => {
  const statusHTTP = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    CREATED: 201,
    NO_CONTENT: 204,
    ERROR: 500,
  };
  return statusHTTP[status] || 500;
};

module.exports = HTTPStatus;