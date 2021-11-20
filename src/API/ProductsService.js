import axios from "axios";

export default class ProductsService {
  static async getAll() {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response;
  }

  static async getById(id) {
    const response = await axios.get("https://fakestoreapi.com/products/" + id);
    return response.data;
  }
}
