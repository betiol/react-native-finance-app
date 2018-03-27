import UserStorage from "@shared/UserStorage";
const { stringify } = require("querystring");
import Config from "react-native-config";
const BASE_URL = Config.BASE_URL;
// const BASE_URL = "http://192.168.1.8:3000/v1";
export class ValidationError extends Error {
  constructor(message, validationErrors) {
    super(message);

    this.name = "ValidationError";

    this.validationErrors = validationErrors;
  }
}

export default class Api {
  static async fetchResource(
    method = "GET",
    endpoint = "/",
    params = {},
    requireAuth = false
  ) {
    let headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    });

    if (requireAuth) {
      let tokenStorage = await UserStorage.getToken();
      headers.set("Authorization", tokenStorage);
    }

    let uri = BASE_URL + endpoint;
    let response;

    if (method === "GET" || method === "DELETE") {
      uri += "?" + stringify(params);
      response = await fetch(uri, { method, headers });
    } else {
      response = await fetch(uri, {
        method,
        headers,
        body: JSON.stringify(params)
      });
    }

    if (!response.ok) {
      let type = response.headers.get("Content-type");
      if (type && type.indexOf("json") != -1) {
        let jsonResponse = await response.json();
        if (jsonResponse.ModelState) {
          throw new ValidationError(jsonResponse.message);
        } else {
          throw new Error(
            jsonResponse.message ||
              jsonResponse.error_description ||
              jsonResponse.error
          );
        }
        return jsonResponse;
      } else {
        let textResponse = await response.text();
        throw new Error(textResponse);
      }
    }

    try {
      return await response.json();
    } catch (e) {
      return {};
    }
  }

  static async login({ email, password }) {
    let endpoint = "/login";
    return Api.fetchResource("POST", endpoint, {
      email,
      password
    });
  }

  static async register(user) {
    let endpoint = "/users";
    return Api.fetchResource("POST", endpoint, {
      user
    });
  }

  static async createAccount(account) {
    console.log(account);
    let endpoint = "/accounts";
    return Api.fetchResource(
      "POST",
      endpoint,
      {
        account
      },
      true
    );
  }

  static async account() {
    let res = await Api.getListResource("/accounts", {}, (requireAuth = true));
    return res;
  }

  static async accountTypes() {
    let res = await Api.getListResource(
      "/account_types",
      {},
      (requireAuth = true)
    );
    return res;
  }

  static async deleteOccurrence(id) {
    let res = await Api.fetchResource(
      "DELETE",
      `/occurrences/${id}`,
      {},
      (requireAuth = true)
    );
    return res;
  }

  static async fetchOccurrences() {
    let res = await Api.getListResource(
      "/occurrences",
      {},
      (requireAuth = true)
    );
    return res;
  }

  static async categories() {
    let res = await Api.getListResource(
      "/categories",
      {},
      (requireAuth = true)
    );
    return res;
  }

  static async dashboard() {
    let res = await Api.getListResource("/dashboard", {}, (requireAuth = true));
    return res;
  }

  static async typeOccurrences() {
    let res = await Api.getListResource("/types", {}, (requireAuth = true));
    console.log("RESSS", res);
    return res;
  }

  static async occurrences(occurrence) {
    console.log("api", occurrence);
    let endpoint = "/occurrences";
    return Api.fetchResource(
      "POST",
      endpoint,
      {
        occurrence
      },
      true
    );
  }

  static async transference(occurrence) {
    console.log("api", occurrence);
    let endpoint = "/occurrences/transfer";
    return Api.fetchResource(
      "POST",
      endpoint,
      {
        occurrence
      },
      true
    );
  }

  static async getListResource(resource, params = {}, requireAuth = false) {
    let endpoint = resource;
    return Api.fetchResource("GET", endpoint, params, requireAuth);
  }
}
