import assert from "node:assert/strict";
import { binarySearch } from "../src/binary-search.js";
import { deepClone } from "../src/deep-clone.js";
import { EventEmitter } from "../src/event-emitter.js";
import { LruCache } from "../src/lru-cache.js";

assert.equal(binarySearch([1, 3, 5, 7], 5), 2);
assert.equal(binarySearch([1, 3, 5, 7], 4), -1);

const source = { name: "demo", nested: { count: 2 } };
const copy = deepClone(source);
copy.nested.count = 10;
assert.equal(source.nested.count, 2);

const cache = new LruCache(2);
cache.set("a", 1);
cache.set("b", 2);
cache.get("a");
cache.set("c", 3);
assert.deepEqual(cache.keys(), ["a", "c"]);

let emitted = 0;
const events = new EventEmitter();
events.on("done", () => emitted++);
events.emit("done");
assert.equal(emitted, 1);

console.log("All tests passed.");
