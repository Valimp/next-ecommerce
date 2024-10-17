import bcrypt from 'bcrypt'

async function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    return hashedPassword
}

async function comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
}

export { hashPassword, comparePassword }