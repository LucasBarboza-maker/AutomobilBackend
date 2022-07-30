import request from 'supertest';

const testUser = {
  name: "User",
  surname: "Test",
  email: "test@mail.com",
  phoneNumber: "9999999999999",
  birth: new Date("2000-01-01"),
  password: "test@123",
  passwordConfirm: "test@123",
  termsAndAgree: true
}

describe("Integration tests for User route", () => {

  it("Should POST /api/user/signup, register User", async () => {
    const result = await request('http://127.0.0.1:3000').post('/api/user/signup')
    .send(testUser)

    expect(result.statusCode).toBe(201)
  })
})

