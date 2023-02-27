import { RSA_PKCS1_PADDING } from 'constants';
import crypto, { KeyExportOptions } from 'crypto'

/**
 * generate RSA public key from n and e directly.
 * @param {*} n modulus of RSA
 * @param {*} e public exponent of RSA
 * @param {*} type type of key, can be 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only)
 * @param {*} format format of key, can be 'pem', 'der', or 'jwk',
 * @returns 
 */
export function generate_public_key(n: string, e = '010001', type: 'pkcs1' | 'spki' | 'pkcs8' | 'sec1' = 'spki', format: 'pem' | 'der' = 'pem') {
    // see https://nodejs.org/api/crypto.html#cryptocreatepublickeykey
    const key_object = crypto.createPublicKey({ format: "jwk", key: { "kty": "RSA", "n": Buffer.from(n, 'hex').toString('base64url'), "e": Buffer.from(e, 'hex').toString('base64url') } });
    return key_object.export({ format, type } as KeyExportOptions<'pem'>);
}

/**
 * encrypt data with RSA public key
 * @param data the data to be encrypted
 * @param public_key the RSA public key to encrypt data
 * @returns the encrypted data in hex format
 */
export function encrypt(data: string, public_key: string | Buffer) {
    const buffer = Buffer.from(data);
    // console.info(`RSA_PKCS1_OAEP_PADDING: ${RSA_PKCS1_OAEP_PADDING}, RSA_PKCS1_PADDING: ${RSA_PKCS1_PADDING}`) 
    // RSA_PKCS1_OAEP_PADDING: 4, RSA_PKCS1_PADDING: 1
    // The default recommended padding is RSA_PKCS1_OAEP_PADDING, but it is not supported by the server. 
    // Need to use the old RSA_PKCS1_PADDING instead.
    const encrypted = crypto.publicEncrypt({ key: public_key, padding: RSA_PKCS1_PADDING }, buffer);
    return encrypted.toString('hex');
}