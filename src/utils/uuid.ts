import { v4, v7, validate } from 'uuid';

// Function to create a UUID
export function createUUID(
  version: 4 | 7 = 4,
  withHyphen: boolean = false,
): string {
  let id: string;

  switch (version) {
    case 4:
      id = v4();
      break;
    case 7:
      id = v7();
      break;
    default:
      id = v4(); // Fallback to version 4 if an invalid version is provided
      break;
  }

  return withHyphen ? id : removeHyphen(id);
}

// Function to remove hyphens from a UUID
export function removeHyphen(uuid: string): string {
  return uuid.replace(/-/g, '');
}

// Function to add hyphens to a non-hyphenated UUID
export function addHyphen(uuid: string): string {
  // Add hyphens only if the input is in non-hyphenated format (32 characters long)
  if (uuid.length === 32) {
    return uuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
  }
  return uuid; // Return unchanged if not in non-hyphenated format
}

// Function to validate a UUID
export function validateUUID(uuid: string): boolean {
  return validate(uuid);
}
