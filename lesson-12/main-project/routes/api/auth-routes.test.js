const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const {User} = require("../../models/user");

const {PORT, DB_HOST_TEST} = process.env;

describe("test register route", ()=> {
    let server = null;

    beforeAll(async ()=> {
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST_TEST);
    });

    afterAll(async ()=> {
        server.close();
        await mongoose.connection.close();
    });

    beforeEach(()=> {

    })

    afterEach(async()=>{
        await User.deleteMany({});
    })

    test("register correct data", async()=> {
        const registerData = {
            name: "Bogdan",
            email: "bogdan@gmail.com",
            password: "123456"
        };

        const response = await request(app).post("/api/auth/register").send(registerData);
        expect(response.statusCode).toBe(201);
        expect(response.body.user.name).toBe(registerData.name);
        expect(response.body.user.email).toBe(registerData.email);

        const user = await User.findOne({email: registerData.email});
        expect(response.body.user.name).toBe(user.name);
        expect(response.body.user.email).toBe(user.email);
    })
})