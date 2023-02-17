export const formatPercentage = (percentage: number): string => {
  return percentage.toFixed(0) + "%";
};

export const countErrors = (actual: string, exprected: string) => {
  const exprectedCharacters = exprected.split("");

  return exprectedCharacters.reduce((errors, exprectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== exprectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccurancyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const correct = total - errors;
    return (correct / total) * 100;
  }
  return 0;
};
