import request from 'supertest';

const testUser = {
  name: "User",
  surname: "Test",
  email: "test@mail.com",
  phoneNumber: "9999999999999",
  birth: new Date("2000-01-01"),
  password: "test@123T",
  passwordConfirm: "test@123T",
  termsAndAgree: true
}

const loginUser = {
  email: "test@mail.com",
  password: "test@123T"
}

describe("Test the Register route", () => {

  // it("Should POST /api/user/signup, register User", async () => {
  //   const result = await request('http://127.0.0.1:3000').post('/api/user/signup')
  //     .send(testUser)

  //   expect(result.statusCode).toBe(201)
  // })

  it("Should fail if a client enters a number in name", async () => {
    let wrongUser = testUser;
    wrongUser.name = "t3st"
    const result = await request('http://127.0.0.1:3000').post('/api/user/signup')
      .send(wrongUser)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.any(String)
      })
    )
  })

  it("Should fail if a client enters a weak password", async () => {
    let wrongUser = testUser;
    wrongUser.password = "t3st"
    const result = await request('http://127.0.0.1:3000').post('/api/user/signup')
      .send(wrongUser)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.any(String)
      })
    )
  })

  it("Should fail if a client enters a password confirmation diferent of a password", async () => {
    let wrongUser = testUser;
    wrongUser.password = "test@123TT"
    const result = await request('http://127.0.0.1:3000').post('/api/user/signup')
      .send(wrongUser)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.any(String)
      })
    )
  })

  it("Should fail if a client enters a invalid email", async () => {
    let wrongUser = testUser;
    wrongUser.email = "testmail.com"
    const result = await request('http://127.0.0.1:3000').post('/api/user/signup')
      .send(wrongUser)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.any(String)
      })
    )
  })

  it("Should fail if a client enters a letter in phone field", async () => {
    let wrongUser = testUser;
    wrongUser.phoneNumber = '9999999999l9'
    const result = await request('http://127.0.0.1:3000').post('/api/user/signup')
      .send(wrongUser)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.any(String)
      })
    )
  })
})


describe("Test the Login Route", () => {
  it("Should return token and status success", async () => {
    const result = await request('http://127.0.0.1:3000').post('/api/user/login')
      .send(loginUser)

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(
      expect.objectContaining({
        status: 'success',
        token: expect.any(String),
        data: expect.objectContaining({
          user:expect.any(Object)
        })
      })
    )
  })

  it("Should return a error message and status fail", async () => {
    loginUser.email = "wrongEmail@mail.com"
    const result = await request('http://127.0.0.1:3000').post('/api/user/login')
      .send(loginUser)

    expect(result.statusCode).toBe(401)
    expect(result.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.any(String),
      })
    )
  })
})


