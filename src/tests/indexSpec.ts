import request from "supertest"
import app from "../index"

describe("GET API '/'", () => {
    it("should return Hello, world!", async() => {
        const res = await request(app).get('/').send('Hello, world!')
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("Hello, world!")
        })
})