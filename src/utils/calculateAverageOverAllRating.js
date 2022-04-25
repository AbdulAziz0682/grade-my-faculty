/**
 * Calculates the average rating from given an array of ratings
 * @param {Array} ratings Array of ratings
 * @returns {Number} Average value of all ratings
 */

export function calculateAverageOverAllRating(ratings) {
  if (!Array.isArray(ratings)) return 0;
  let total = 0;
  ratings.forEach((r) => {
    if (r.overAllRating) {
      total += 5 * (Number(r.overAllRating) / 12);
    }
  });
  if (total === 0) return 0;
  return (total - 0.000001) / ratings.length;
}

/**
 * Maps numerical averageRating to String
 * @param {Number} averageRating Average rating value of all ratings
 * @returns {String} Returns string corressponding to the average
 */

export function mapAverageOverAllRating(average) {
  if (typeof average !== 'number') return 'N/A';
  if (typeof Number(average) !== 'number') return 'N/A';
  if (average >= 5 * (11 / 12)) return 'A+'; // 4.583333
  if (average >= 5 * (10 / 12) && average < 5 * (11 / 12)) return 'A'; // 4.16666, 4.583333
  if (average >= 5 * (9 / 12) && average < 5 * (10 / 12)) return 'A-'; // 3.75, 4.16666
  if (average >= 5 * (8 / 12) && average < 5 * (9 / 12)) return 'B+'; // 3.3333, 3.75
  if (average >= 5 * (7 / 12) && average < 5 * (8 / 12)) return 'B'; // 2.91666, 3.3333
  if (average >= 5 * (6 / 12) && average < 5 * (7 / 12)) return 'B-'; // 2.5, 2.91666
  if (average >= 5 * (5 / 12) && average < 5 * (6 / 12)) return 'C+'; // 2.083333, 2.5
  if (average >= 5 * (4 / 12) && average < 5 * (5 / 12)) return 'C'; // 1.6666, 2.08333
  if (average >= 5 * (3 / 12) && average < 5 * (4 / 12)) return 'C-'; // 1.25, 1.6666
  if (average >= 5 * (2 / 12) && average < 5 * (3 / 12)) return 'D'; // 0.83333, 1.25
  if (average >= 5 * (1 / 12) && average < 5 * (2 / 12)) return 'E'; // 0.41666, 0.83333
  if (average > 0 && average < 5 * (1 / 12)) return 'F';
  return 'N/A';
}
