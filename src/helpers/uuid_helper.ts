import { v4 as uuidv4 } from 'uuid';

class UuidHelper {
    static generateUuid = (): string => {
        return uuidv4();
    }
}

export default UuidHelper;