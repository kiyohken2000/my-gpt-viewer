// trueを返すとボタンが無効、falseならボタンが有効
const isAddButtonCondition = ({text, safeWords}) => {
  const isLengthInvalid = text.length < 5 || text.length > 20;
  const isSafeWordIncluded = safeWords.some(safeWord => text.includes(safeWord));

  return isLengthInvalid || isSafeWordIncluded;
}

export { isAddButtonCondition }