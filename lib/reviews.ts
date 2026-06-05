import reviewsData from "@/data/tripadvisor-reviews.json";

export type TripadvisorReview = {
  id: string;
  reviewerName: string;
  rating: number;
  date: string;
  excerpt: string;
  sourceUrl: string;
};

export const verifiedTripadvisorReviews = (reviewsData as TripadvisorReview[])
  .filter((review) => review.rating >= 4)
  .slice(0, 10);

export function getReviewAggregate(
  reviews: TripadvisorReview[] = verifiedTripadvisorReviews
) {
  if (reviews.length === 0) return null;

  const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return {
    ratingValue: Number(averageRating.toFixed(1)),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  };
}
