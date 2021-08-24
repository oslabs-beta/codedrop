// /* All users much be authorized to use given routes in the graphql/dgraph database. This is done through a combo of
//  an API key and schema authorizations. We need a jwt generated for our user, which we can then pass to dgraph to define
//  allowable access */

 import jwt from "next-auth/jwt"

 const secret = process.env.JWT_SECRET
 console.log('secret: ', secret);

export default async function getToken (req) {
  const token = await jwt.getToken({req, secret})
  console.log('jwt: ', token);
  return token;
}


