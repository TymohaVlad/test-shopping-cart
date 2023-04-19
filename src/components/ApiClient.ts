class ApiClient {
    private host: string;
  
    constructor() {
      this.host = process.env.REACT_APP_API_PRODUCTS || '';
    }
  
    public fetch<T>(url: string, method: string = 'GET', body?: any): Promise<Response> {
      return fetch(this.host + url, {
        method: method,
        body: body,
        headers: {
          'Content-type': 'application/json',
        },
      });
    }
  }
  
  export default ApiClient;