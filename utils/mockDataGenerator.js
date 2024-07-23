const crypto = require('crypto');
const { faker } = require('@faker-js/faker');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generateHexCode = () => {
    return crypto.randomBytes(16).toString('hex');
}

const generateRandomEmail = () => {
    return faker.internet.email();
}

const generateAccessToken = (accessToken) => {
    return {
        access_token: accessToken,
        expires_in: 3584,
        id_token: generateHexCode(),
        scope: "/auth/userinfo.email /auth/userinfo.profile openid",
        token_type: "Bearer"
    }
}

const generateMockUser = (email) => {
    if (!email || !emailRegex.test(email)) {
        email = generateRandomEmail();
    }

    return {
        id: faker.datatype.uuid(),
        email: email,
        verified_email: true,
        name: faker.person.fullName(),
        given_name: faker.person.firstName(),
        picture: faker.image.avatar()
    }
}

module.exports = {
    generateHexCode,
    generateMockUser,
    generateAccessToken
};