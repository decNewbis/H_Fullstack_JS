export function getNameInitials(value) {
  return value.split(' ').map((word) => word[0].toUpperCase()).join('');
}