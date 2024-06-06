class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

module.exports = ApiResponse;



// The ApiResponse class is a template for creating responses in an API.
//  It takes three inputs: a status code, some data, 
//  and an optional message (defaulting to "Success"). 
//  It sets these as properties on the object, 
//  and also sets a success property to true if the status code is less than 400 
//  (indicating a successful response), or false otherwise.