const crypto = require('crypto')
const uuid = require('uuid')
const PASS = 'Demo@987#'
const validator = require('validator')

exports.encryptData = async plainText => {
    var iv = crypto.randomBytes(16)
    const hash = crypto.createHash('sha512')
    const dataKey = hash.update(PASS, 'utf-8')
    const genHash = dataKey.digest('hex')
    const key = genHash.substring(0, 16)
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key), iv)
    let requestData = cipher.update(plainText, 'utf-8', 'base64')
    requestData +=
        cipher.final('base64') + ':' + Buffer.from(iv).toString('base64')
    return requestData
}
exports.decryptData = async encText => {
    var m = crypto.createHash('sha512')
    var datakey = m.update(PASS, 'utf-8')
    var genHash = datakey.digest('hex')
    var key = genHash.substring(0, 16)
    var result = encText.split(':')
    var iv = Buffer.from(result[1], 'base64')
    var decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key), iv)
    var decoded = decipher.update(result[0], 'base64', 'utf8')
    decoded += decipher.final('utf8')
    return decoded
}

exports.getRandom = (size = 10) => {
    return Math.floor(Math.random() * 9 * 10 ** (size - 1)) + 10 ** (size - 1)
}

exports.getTokenId = () => {
    validator.isStrongPassword('123')
    const bsid = uuid.v4().split('-').join('')
    const str = checksum(bsid)
    return bsid + str
}

const checksum = string => {
    const nDigit = string.length
    let sum = 0
    let isSecond = true

    for (let i = nDigit - 1; i >= 0; i--) {
        let digit = string[i].charCodeAt() - '0'.charCodeAt()
        if (isSecond) digit = digit * 2
        if (digit > 9) digit = digit - 9
        sum = sum + digit
        isSecond = !isSecond
    }
    return sum === 0 ? '0' : (10 - (sum % 10)).toString()
}

const checkInputs = async data => {
    const keyArr = Object.keys(data)
    let r = ''
    for await (let key of keyArr) {
        if (typeof data[key] === 'object') {
            r = await checkInputs(data[key])
            if (r) break
        } else if (
            typeof data[key] === 'string' ||
            typeof data[key] === 'undefined'
        ) {
            r = !data[key] ? key : ''
            if (r) break
        }
    }
    return r
}

exports.validateInputs = async data => {
    const found = await checkInputs(data)
    return { success: !found, key: found || null }
}
exports.uid = () => {
    return `0x${uuid.v4().split('-').join('')}`
}

exports.isValidDate = input => {
    const date = new Date(input)
    return !isNaN(date.getTime())
}

exports.x = (input = []) => {
    try {
        return input.map(item => (isNaN(item) ? item : parseInt(item)))
    } catch (error) {
        return []
    }
}