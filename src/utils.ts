/**
 * Returns predictable hash number code.
 */
const hashCode = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++)h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return h;
};

const randomizeNumber = () => Math.random()*101|0 + Math.random()*101|0;

interface ClassInfo {
  readonly [name: string]: boolean;
}

/**
 * Maps classes from an object.
 */
const classMap = (classes: ClassInfo): string => Object.entries(classes).reduce((acc, current) => current[1] ? `${acc} ${current[0]}` : acc, "");

export {
  hashCode,
  classMap,
  randomizeNumber,
  ClassInfo
};