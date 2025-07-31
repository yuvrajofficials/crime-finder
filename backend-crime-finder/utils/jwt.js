import jwt from 'jsonwebtoken';


const payload = {"name":"yuvraj"};
const secret = "new_name";

const jwtToken = jwt.sign(payload,secret,{expiresIn:'1h'});

console.log(jwtToken)

const decoded = jwt.decode(jwtToken)


console.log(decoded)