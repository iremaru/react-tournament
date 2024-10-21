import { MemberInfo, MemberPair } from '../models/member';

export const getPairs = (members: MemberInfo[]) => {
  const reSortedPairs: MemberInfo[] = [];
  let unassignedIndexs: number[] = [];
  const pairs: MemberPair[] = [];

  for (let i = 0; i < members.length; i++) {
    console.log(unassignedIndexs);
    unassignedIndexs = members.map((member, membIndex) =>
      membIndex !== i && !reSortedPairs.includes(member) ? membIndex : -1
    );
    const luckyIndex = getNewLuckyNumber([...unassignedIndexs]);
    const luckyMember = members[luckyIndex];
    reSortedPairs[i] = luckyMember;
  }

  members.forEach(
    (member, i) => (pairs[i] = { FromWho: member, ToWho: reSortedPairs[i] })
  );

  //Todo: Si hay un miembro que no le regala a nadie, vuelve a tirar.

  return pairs;
};

/* function getNewLuckyIndex(
  forbidenNumbers: number[],
  maxNumber: number
): number {
  const luckyIndex = Math.round(Math.random() * maxNumber);
  return forbidenNumbers.includes(luckyIndex)
    ? getNewLuckyIndex(forbidenNumbers, maxNumber)
    : luckyIndex;
} */

function getNewLuckyNumber(availableNumbers: number[]): number {
  const maxNumber = Math.max(...availableNumbers);
  const luckyIndex = Math.round(Math.random() * maxNumber);
  return availableNumbers.includes(luckyIndex)
    ? luckyIndex
    : getNewLuckyNumber(availableNumbers);
}
