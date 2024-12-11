import base64 from 'base-64';

export default function decodeToken(token: string | null) {
    if (typeof token === 'string') {
        let payload = token.substring(
            token.indexOf('.') + 1,
            token.lastIndexOf('.')
        );
        let decodingInfo = base64.decode(payload);
        let decodedTokenInfo = JSON.parse(decodingInfo);
        return decodedTokenInfo;
    } else {
        return null;
    }
}
