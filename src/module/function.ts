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

    checkRegArr (key: string, prop: any) {
      const itemkeyPattern = key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      let matchedValue = null;
      for (const key in prop) {
          if (Object.prototype.hasOwnProperty.call(prop, key)) {
              const value = prop[key];
              const regex = new RegExp(`.*${key}.*`);
              if (regex.test(itemkeyPattern)) {
                  matchedValue = value;
                  break;
              }
          }
      }
      return matchedValue;
    }
}