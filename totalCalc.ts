// ResutlObjectの型定義
type basicCalcResult = { [han: string]: { [fu: string]: number } };
type calcResult = {
  [han: string]: { [fu: string]: { [type: string]: string } };
};
type totalCalcResult = { [player: string]: calcResult };

// 切り上げ用関数
const roundUp = (val: number, base: number): number =>
  Math.ceil(val / base) * base;

// 翻数と符数
const han = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const hu = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110];
const matrix: number[][] = han.flatMap((han: number): number[][] =>
  hu.map((fu: number): number[] => [han, fu])
);

// 基本点の算出
const basicCalc = (comb: number[]): number => 2 ** (comb[0] + 2) * comb[1];
const basicResult: basicCalcResult = {};
matrix.forEach((comb: number[]): void => {
  const han = `${comb[0]}翻`;
  const fu = `${comb[1]}符`;
  if (!basicResult[han]) basicResult[han] = {};
  switch (comb[0]) {
    // 3翻70符以上は満貫扱い
    case 3:
      comb[1] >= 70
        ? (basicResult[han][fu] = 2000)
        : (basicResult[han][fu] = basicCalc(comb));
      break;
    // 4翻40符以上は満貫扱い
    case 4:
      comb[1] >= 40
        ? (basicResult[han][fu] = 2000)
        : (basicResult[han][fu] = basicCalc(comb));
      break;
    // 5翻は満貫
    case 5:
      basicResult[han][fu] = 2000;
      break;
    // 6翻、7翻は跳満
    case 6:
    case 7:
      basicResult[han][fu] = 3000;
      break;
    // 8翻、9翻、10翻は倍満
    case 8:
    case 9:
    case 10:
      basicResult[han][fu] = 4000;
      break;
    // 11翻、12翻は三倍満
    case 11:
    case 12:
      basicResult[han][fu] = 6000;
      break;
    // 13翻は役満
    case 13:
      basicResult[han][fu] = 8000;
      break;
    default:
      basicResult[han][fu] = basicCalc(comb);
  }
});

// 親の点の算出
const parentResult: Readonly<calcResult> = Object.freeze(
  Object.keys(basicResult)
    .map((key: string) => ({
      [key]: Object.fromEntries(
        Object.entries(basicResult[key]).map(
          ([key, val]: [string, number]): [
            string,
            { [key: string]: string }
          ] => {
            const result: number = val * 2;
            return [
              key,
              {
                drawn: `${roundUp(result, 100) * 3}(${roundUp(
                  result,
                  100
                )}all)`,
                pickup: `${roundUp(result * 3, 100)}`,
              },
            ];
          }
        )
      ),
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {})
);
// 子の点の算出
const childResult: Readonly<calcResult> = Object.freeze(
  Object.keys(basicResult)
    .map((key: string) => ({
      [key]: Object.fromEntries(
        Object.entries(basicResult[key]).map(
          ([key, val]: [string, number]): [
            string,
            { [key: string]: string }
          ] => {
            const child: number = roundUp(val, 100);
            const parent: number = roundUp(val * 2, 100);
            const result: number = child * 2 + parent;
            return [
              key,
              {
                drawn: `${result}(${child}/${parent})`,
                pickup: `${roundUp(val * 4, 100)}`,
              },
            ];
          }
        )
      ),
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {})
);

export const totalResult = {
  parent: parentResult,
  children: childResult,
} as const satisfies totalCalcResult;
