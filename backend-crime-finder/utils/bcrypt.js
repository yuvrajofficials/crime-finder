import bcrypt from "bcryptjs"

async function hashing() {
    
    const actualPass = "mypass"
    const hashedPass = await bcrypt.hash(actualPass,12);
    console.log(hashedPass)
    
    const comparePass = await bcrypt.compare(actualPass,hashedPass)
    
    console.log(comparePass)
}

hashing()