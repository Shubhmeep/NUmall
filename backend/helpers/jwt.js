var { expressjwt: jwt } = require("express-jwt"); //curly braces are added coz normal method is depracated

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL
    return jwt({
        secret,
        algorithms : ['HS256'],
        // isRevoked: isRevoked,
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

const isRevoked  = async (req, payload, done) => {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports = authJwt;