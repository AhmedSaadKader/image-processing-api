import request from "supertest"
import app from "../index"
import * as fs from "fs"

describe("GET API '/resize' check error response", () => {
    it("should return error 404 when missing params", async() => {
        const res = await request(app).get('/resize/?width=400&height=400')
        expect(res.statusCode).toBe(404)
    })
    it("should return error 500 when wrong image name", async() => {
        const res = await request(app).get('/resize/p?width=400&height=400')
        expect(res.statusCode).toBe(500)
    })
    it("should return error 500 when missing height query", async() => {
        const res = await request(app).get('/resize/palmtunnel?width=400')
        expect(res.statusCode).toBe(500)
    })
    it("should return error 500 when height query is 0", async() => {
        const res = await request(app).get('/resize/palmtunnel?width=400&height=0')
        expect(res.statusCode).toBe(500)
    })
})

describe("GET API '/resize'", () => {
    it("should return hi", async() => {
        const res = await request(app).get('/').send('hi')
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe('hi')
    })

    it("should return image after resizing", async() => {
        const res = await request(app).get('/resize/palmtunnel.jpg?width=400&height=400')
        expect(res.statusCode).toBe(200)
        expect(res.headers['content-type']).toBe('image/jpg')
    })

    it("should return a new image file in file system", async() => {
        const res = await request(app).get('/resize/palmtunnel.jpg?width=400&height=400')
        expect(res.statusCode).toBe(200)
        const outputFile = `./images/resized/palmtunnel400x400.jpg`
        expect(fs.existsSync(outputFile)).toBeTruthy()
    })
})

