# app.e2e-spec.ts
createTestAppModule: This function sets up a testing module using the '@nestjs/testing' module and then import AppModule to replicate your application'structure

## describe()
    this function is used to group related tests such as: AppController or AppModule
### let app: INestApplication
    app will represents our Nestjs app instance
### beforeAll() and afterAll()
    these are Jest lifecycle hooks, beforeAll(): we initialize the NestJS app and in afterAll() we close app instance to clean up after the test
### it()
    Jest's it() function is used to define individual test case. In this case, we have one test case for the '/api' endpoint
#### return request(app.getHttpServer())
    This line uses SuperTest to make an HTTP request to your application'HTTP server. 'app.getHttpServer()' retrieves the HTTP server instance from your Nestjs application

    '.get('api'): This line specifies the HTTP method GET and the API ENDPOINT you want to test

=> This test file sets up the testing environment, defines a tes case for the 'api' endpoint, and use SuperTest to make an HTTP request to that endpoint, verifying the response (you can adding more 'it' block to testing endpoint)
