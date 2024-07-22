export function getNameInitials(value: string): string {
  return value.split(' ').map((word) => word[0].toUpperCase()).join('');
}