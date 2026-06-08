export const required = (message = "Required") => (value) => {
  if (value === null || value === undefined || String(value).trim() === "") return message;
  return null;
};

export const minLength = (length, message = `Must be at least ${length} characters`) => (value) => {
  if (String(value ?? "").length < length) return message;
  return null;
};

export const email = (message = "Must be a valid email") => (value) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? ""))) return message;
  return null;
};

export const between = (min, max, message = `Must be between ${min} and ${max}`) => (value) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max) return message;
  return null;
};

export const custom = (predicate, message = "Invalid") => (value, data) => {
  return predicate(value, data) ? null : message;
};

export function validate(data, schema) {
  const errors = {};

  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      const error = rule(data[field], data);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
