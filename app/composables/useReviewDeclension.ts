export const useReviewDeclension = () => {
  const declineReviewWord = (count: number): string => {
    if (isNaN(count) || !isFinite(count)) {
      return `${count} отзывов`;
    }

    const lastDigit = Math.abs(count) % 10;
    const lastTwoDigits = Math.abs(count) % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${count} отзывов`;
    }

    switch (lastDigit) {
      case 1:
        return `${count} отзыв`;
      case 2:
      case 3:
      case 4:
        return `${count} отзыва`;
      default:
        return `${count} отзывов`;
    }
  };

  const getReviewWord = (count: number): string => {
    if (isNaN(count) || !isFinite(count)) {
      return "отзывов";
    }

    const lastDigit = Math.abs(count) % 10;
    const lastTwoDigits = Math.abs(count) % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "отзывов";
    }

    switch (lastDigit) {
      case 1:
        return "отзыв";
      case 2:
      case 3:
      case 4:
        return "отзыва";
      default:
        return "отзывов";
    }
  };

  return {
    declineReviewWord,
    getReviewWord
  };
};
