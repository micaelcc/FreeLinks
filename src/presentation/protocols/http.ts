type HttpRequest = {
  body?: any;
};

type HttpResponse = {
  data: any;
  statusCode: number;
};

export { HttpRequest, HttpResponse };
