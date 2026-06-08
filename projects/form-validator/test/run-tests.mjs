import assert from "node:assert/strict";
import { between, custom, email, minLength, required, validate } from "../src/validator.js";

const schema = {
  name: [required(), minLength(3)],
  email: [required(), email()],
  age: [between(18, 80)],
  confirm: [custom((value, data) => value === data.password, "Passwords must match")],
};

const invalid = validate({ name: "Al", email: "bad", age: 15, password: "a", confirm: "b" }, schema);
assert.equal(invalid.valid, false);
assert.equal(invalid.errors.name, "Must be at least 3 characters");
assert.equal(invalid.errors.email, "Must be a valid email");
assert.equal(invalid.errors.age, "Must be between 18 and 80");
assert.equal(invalid.errors.confirm, "Passwords must match");

const valid = validate({ name: "Alex", email: "alex@example.com", age: 32, password: "a", confirm: "a" }, schema);
assert.equal(valid.valid, true);
assert.deepEqual(valid.errors, {});

console.log("Validator tests passed.");
