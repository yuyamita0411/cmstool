export class Function {
    matchesPattern(str: string, prefix: string) {
        const pattern = new RegExp(`^${prefix}\\d+$`);
        return pattern.test(str);
    }

    replaceValuesWithFalse(obj: any) {
        if (typeof obj !== 'object' || obj === null) {
          return false;
        }
      
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj[key] = this.replaceValuesWithFalse(obj[key]);
          }
        }
        return obj;
    }
}