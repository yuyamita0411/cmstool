type JsonValue = string | number | boolean | null | JsonArray | JsonObject;
type JsonArray = JsonValue[];
interface JsonObject {
    [key: string]: JsonValue;
}

type NestedObject<T, Depth extends number> = Depth extends 0 
  ? T 
  : { [K in keyof T]: NestedObject<T[K], Depth extends 1 ? 0 : Depth extends 2 ? 1 : Depth extends 3 ? 2 : Depth extends 4 ? 3 : never> };

type MyNestedObject = NestedObject<JsonObject, 4>;

export { JsonValue, JsonArray, JsonObject, NestedObject, MyNestedObject };