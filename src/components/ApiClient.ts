class ApiClient {
  private host: string;

  constructor() {
    this.host = process.env.REACT_APP_API_PRODUCTS || '';
  }

  public fetch(url: string, method = 'GET'): Promise<Response> {
    return fetch(this.host + url, {
      method: method,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
}

export default ApiClient;
