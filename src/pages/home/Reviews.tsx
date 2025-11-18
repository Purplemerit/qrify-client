import React from "react";

// StarRating Component
interface StarRatingProps {
  rating: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, className = "" }) => {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      <img
        src="https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/196190384e6416bb3e0dd6a087be603ac4473a1f?placeholderIfAbsent=true"
        alt="5 star rating"
        className="aspect-[5.41] object-contain w-[108px] shrink-0 max-w-full"
      />
      <span className="text-base text-[rgba(34,14,39,1)] font-semibold whitespace-nowrap">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

// ReviewCard Component
interface ReviewCardProps {
  rating: number;
  reviewText: string;
  author?: {
    name: string;
    avatar: string;
    date: string;
  };
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  reviewText,
  author,
  className = "",
}) => {
  return (
    <article
      className={`bg-white shadow-[-4px_0px_12px_rgba(34,14,39,0.1)] flex flex-col overflow-hidden rounded-lg ${className}`}
    >
      <div className="px-6 py-6">
        {author && (
          <header className="flex items-stretch gap-[13px] mb-6">
            <img
              src={author.avatar}
              alt={`${author.name}'s profile picture`}
              className="aspect-[1] object-contain w-12 shrink-0 rounded-[50%]"
            />
            <div className="flex flex-col items-stretch my-auto">
              <h3 className="text-[rgba(34,14,39,1)] text-base font-bold">
                {author.name}
              </h3>
              <time
                dateTime={author.date}
                className="text-[rgba(88,91,112,1)] text-sm font-normal leading-loose"
              >
                {author.date}
              </time>
            </div>
          </header>
        )}

        <div className={author ? "mb-5" : "mb-5"}>
          <StarRating rating={rating} />
        </div>

        <blockquote className="text-[rgba(88,91,112,1)] text-sm font-normal leading-5">
          {reviewText}
        </blockquote>
      </div>
    </article>
  );
};

// ReviewsSection Component
const reviewsData = [
  {
    id: 1,
    rating: 5.0,
    reviewText:
      "Created the QR code in blink of a second. I created for My Road Safety Website address, for easy login to my followers. Thanks QRFY",
  },
  {
    id: 2,
    rating: 5.0,
    reviewText:
      "Created the QR code in blink of a second. I created for My Road Safety Website address, for easy login to my followers. Thanks QRFY",
    author: {
      name: "A D Joshi",
      avatar:
        "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/c2a656a65437dec0d353c491a54c29a29d4563ea?placeholderIfAbsent=true",
      date: "July 21, 2025",
    },
  },
  {
    id: 3,
    rating: 5.0,
    reviewText:
      "Created the QR code in blink of a second. I created for My Road Safety Website address, for easy login to my followers. Thanks QRFY",
  },
];

export function Reviews() {
  const [showingMore, setShowingMore] = React.useState(false);

  const handleSeeMoreReviews = () => {
    setShowingMore(!showingMore);
    // In a real app, this would load more reviews from an API
    // ...existing code...
  };

  return (
    <section className="flex flex-col overflow-hidden items-center justify-center px-20 py-60 max-md:px-5 max-md:py-[100px]">
      <div className="flex w-[938px] max-w-full flex-col items-stretch">
        <header className="text-center mb-[62px] max-md:mb-10">
          <h1 className="text-[rgba(34,14,39,1)] text-[40px] font-normal max-md:max-w-full">
            Our clients tell you why they should choose QRFY
          </h1>
          <p className="text-[rgba(88,91,112,1)] text-base font-semibold text-center self-center mt-[22px]">
            through their reviews in
          </p>
        </header>

        <div className="max-md:max-w-full max-md:mr-0.5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {reviewsData.map((review, index) => (
              <div
                key={review.id}
                className={`w-[33%] max-md:w-full ${
                  index > 0 ? "ml-5 max-md:ml-0" : ""
                }`}
              >
                <ReviewCard
                  rating={review.rating}
                  reviewText={review.reviewText}
                  author={review.author}
                  className={
                    review.author
                      ? "w-full pt-6 pb-[52px] max-md:mt-5"
                      : "min-h-60 self-stretch justify-center w-full my-auto py-[50px] max-md:mt-10"
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-[60px] max-md:mt-10 text-center">
          <button
            onClick={handleSeeMoreReviews}
            className="bg-white border self-center flex min-h-10 items-center gap-3 text-base text-[rgba(29,89,249,1)] font-bold justify-center px-5 py-[11px] rounded-3xl border-[rgba(224,224,224,1)] border-solid hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[rgba(29,89,249,0.5)] focus:ring-offset-2"
            aria-label={
              showingMore ? "Show fewer reviews" : "Show more reviews"
            }
          >
            <span className="self-stretch my-auto">
              {showingMore ? "Show fewer reviews" : "See more reviews"}
            </span>
          </button>
        </footer>
      </div>
    </section>
  );
}
