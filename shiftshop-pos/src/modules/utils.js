import {v1 as uuidV1} from 'uuid';
import base32Encode from 'base32-encode';

export const minDelayFunction = timeout => {

    const delay = new Promise(resolve => setTimeout(resolve, timeout));

    return func => delay.then(func);

};

export const generateBarcode = () => {

    const newUUID = uuidV1(null, [], 0);

    return base32Encode(Buffer.from(newUUID, 'hex'), 'RFC4648', { padding: false });

};
