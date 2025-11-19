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
        className="aspect-[5.41] object-contain w-20 md:w-[108px] shrink-0 max-w-full"
      />
      <span className="text-sm md:text-base text-[rgba(34,14,39,1)] font-semibold whitespace-nowrap">
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
      <div className="px-4 md:px-6 py-4 md:py-6">
        {author && (
          <header className="flex items-stretch gap-3 md:gap-[13px] mb-4 md:mb-6">
            <img
              src={author.avatar}
              alt={`${author.name}'s profile picture`}
              className="aspect-[1] object-contain w-10 md:w-12 shrink-0 rounded-[50%]"
            />
            <div className="flex flex-col items-stretch my-auto">
              <h3 className="text-[rgba(34,14,39,1)] text-sm md:text-base font-bold">
                {author.name}
              </h3>
              <time
                dateTime={author.date}
                className="text-[rgba(88,91,112,1)] text-xs md:text-sm font-normal leading-loose"
              >
                {author.date}
              </time>
            </div>
          </header>
        )}

        <div className={author ? "mb-4 md:mb-5" : "mb-4 md:mb-5"}>
          <StarRating rating={rating} />
        </div>

        <blockquote className="text-[rgba(88,91,112,1)] text-xs md:text-sm font-normal leading-5">
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
    author: {
      name: "Zara Smith",
      avatar:
        "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/c2a656a65437dec0d353c491a54c29a29d4563ea?placeholderIfAbsent=true",
      date: "July 21, 2025",
    },
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
    author: {
      name: "John Doe",
      avatar:
        "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/c2a656a65437dec0d353c491a54c29a29d4563ea?placeholderIfAbsent=true",
      date: "July 21, 2025",
    },
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
    <section className="flex flex-col overflow-hidden items-center justify-center px-5 md:px-10 lg:px-20 py-16 md:py-32 lg:py-60">
      <div className="flex w-full max-w-[938px] flex-col items-stretch">
        <header className="text-center mb-8 md:mb-12 lg:mb-[62px]">
          <h2 className="text-[rgba(34,14,39,1)] text-2xl md:text-3xl lg:text-[40px] font-normal">
            Our clients tell you why they should choose QRFY
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3 md:mt-[22px]">
            <p className="text-[rgba(88,91,112,1)] text-sm md:text-base font-semibold text-center">
              through their reviews in
            </p>
            <div className="w-20 h-6 md:w-28 md:h-8 flex-shrink-0">
              <svg
                width="120"
                height="40"
                viewBox="0 0 120 40"
                fill="none"
                className="w-full h-full"
              >
            <path
              d="M40.9166 10.9033C35.3553 10.9131 31.0843 15.2077 31.0997 20.7746C31.115 26.3164 35.4194 30.5734 41.0044 30.5595C46.5587 30.5469 50.8519 26.2328 50.8296 20.6868C50.8073 15.1409 46.5043 10.8922 40.9166 10.9033ZM43.1099 26.2105C41.028 27.1371 39.0591 26.7679 37.3493 25.2769C35.1351 23.3427 34.77 19.6278 36.5007 17.1391C36.9765 16.4417 37.6092 15.8657 38.3479 15.4572C39.0867 15.0488 39.911 14.8192 40.7546 14.7871C41.5981 14.755 42.4375 14.9212 43.2052 15.2723C43.9729 15.6234 44.6476 16.1497 45.175 16.8088C46.0431 17.8734 46.4946 19.2223 46.4932 21.2094C46.411 23.2187 45.4355 25.1737 43.1099 26.2105Z"
              fill="#DB4437"
            />
            <path
              d="M62.39 10.8965C56.7925 10.9049 52.4964 15.1995 52.5118 20.79C52.5229 26.3067 56.8496 30.5693 62.429 30.5624C67.9624 30.5554 72.2598 26.2817 72.2654 20.7859C72.2696 15.1828 67.9805 10.8895 62.39 10.8965ZM61.6765 26.6258C59.571 26.3904 57.7748 24.7865 57.1185 22.5639C56.2825 19.7268 57.4669 16.6598 59.8734 15.4155C63.3654 13.604 67.4664 15.9129 67.8788 19.9163C67.9067 20.195 67.9123 20.4737 67.9164 20.5518C67.915 24.3949 65.1323 27.0132 61.6765 26.6258Z"
              fill="#F4B400"
            />
            <path
              d="M106.894 23.6955C111.234 21.8979 115.578 20.0989 120.001 18.2693C119.661 17.489 119.397 16.7937 119.066 16.1318C116.568 11.1738 111.198 9.42227 106.556 12.127C103.512 13.9022 102.153 16.7365 101.958 20.1728C101.553 27.6055 108.623 32.6428 115.456 29.796C117.251 29.0477 118.661 27.8159 119.79 26.2023L116.446 23.9867C113.695 28.0695 108.226 27.1429 106.894 23.6955ZM110.057 14.8846C112.022 14.3272 114.052 15.1048 114.875 16.7937L106.162 20.4166C105.946 17.9335 107.646 15.5674 110.057 14.8846Z"
              fill="#DB4437"
            />
            <path
              d="M29.5186 13.9032H28.7243C24.661 13.9032 20.5977 13.9032 16.5344 13.9032C16.2808 13.9032 16.0285 13.9352 15.7749 13.9519H15.6356C15.5966 13.9742 15.5255 13.9951 15.5255 14.0188C15.5074 15.298 15.4907 16.5786 15.5004 17.8592C15.5004 17.9191 15.7485 17.9762 15.8808 18.0348C16.0406 18.0593 16.2015 18.0756 16.363 18.0835C19.3728 18.0835 22.3836 18.0835 25.3954 18.0835C25.1836 20.7311 24.0437 22.8519 21.8922 24.4447C17.4234 27.7555 8.75748 27.1884 5.5581 19.8922C3.70341 15.6631 4.24407 11.5775 7.25255 8.02695C10.2178 4.52519 14.8469 3.30312 19.0607 4.84011C20.4709 5.35429 21.7431 6.24192 22.993 6.91357L25.9277 4.16428C25.9277 4.16428 25.7159 4.00682 25.6336 3.93018C20.2772 -1.03332 12.0516 -1.32873 6.03745 3.23345C-1.18763 8.71949 -2.07387 19.0868 4.16882 25.6598C7.84477 29.5294 12.4209 31.051 17.6854 30.4658C23.524 29.8164 28.0722 25.7949 29.3542 20.2406C29.8448 18.162 29.9008 16.0044 29.5186 13.9032Z"
              fill="#4285F4"
            />
            <path
              d="M92.8047 11.5451H88.7512C88.7289 12.0412 88.7094 12.5066 88.6843 13.0584L87.8287 12.4091L86.8533 11.7569C85.0195 10.7355 83.0812 10.67 81.1164 11.2232C77.3694 12.2767 74.4766 15.6405 74.0892 19.4864C73.6586 23.7462 75.282 27.0794 78.9412 29.3201C81.9302 31.1497 86.0186 31.0926 88.5282 28.484C88.5491 28.4631 88.6104 28.484 88.6676 28.484C88.6676 29.2922 88.7372 30.1032 88.655 30.8975C88.4112 33.2343 87.1626 34.7476 85.1059 35.3064C82.9112 35.9028 80.7193 35.1893 79.3829 33.4168C79.0638 32.9988 78.8074 32.5264 78.4911 32.0234L74.8068 33.5562C76.8831 38.5364 82.3176 40.6015 87.2657 38.712L89.5733 37.3784C89.5805 37.3803 89.5879 37.3806 89.5952 37.3794C89.6025 37.3782 89.6095 37.3754 89.6156 37.3714C89.6218 37.3673 89.627 37.362 89.631 37.3557C89.635 37.3495 89.6377 37.3425 89.6388 37.3352L89.767 37.2168L89.9063 37.0775L90.3773 36.5856L90.3704 36.5688C90.7243 36.1188 91.1354 35.7021 91.4196 35.2116C92.4466 33.4405 92.8298 31.4953 92.8312 29.465C92.8312 23.6626 92.8312 17.8598 92.8312 12.0565C92.8354 11.9032 92.8173 11.7444 92.8047 11.5451ZM88.4934 23.4411C87.5486 25.7208 85.5072 26.8913 83.1118 26.6363C80.9074 26.4022 78.9872 24.5809 78.4897 22.2274C78.3852 21.7327 78.3504 21.2213 78.3128 20.8924C78.395 18.564 79.1739 16.7803 81.03 15.5903C81.579 15.2283 82.1945 14.979 82.8407 14.857C83.4869 14.7351 84.1509 14.7428 84.7941 14.8799C85.4373 15.017 86.0468 15.2806 86.5872 15.6554C87.1275 16.0302 87.5879 16.5088 87.9416 17.0632C89.2444 19.0754 89.4047 21.2408 88.4934 23.4411Z"
              fill="#4285F4"
            />
            <path
              d="M95.748 1.06836V29.938H99.9981V1.06836H95.748Z"
              fill="#0F9D58"
            />
              </svg>
            </div>
          </div>
        </header>

        <div className="w-full">
          <div className="gap-4 md:gap-5 flex flex-col md:flex-row items-stretch">
            {reviewsData.map((review, index) => (
              <div
                key={review.id}
                className={`w-full md:w-[33%] ${
                  index > 0 ? "md:ml-5" : ""
                }`}
              >
                <ReviewCard
                  rating={review.rating}
                  reviewText={review.reviewText}
                  author={review.author}
                  className={
                    review.author
                      ? "w-full pt-4 md:pt-6 pb-8 md:pb-[52px]"
                      : "min-h-48 md:min-h-60 self-stretch justify-center w-full my-auto py-8 md:py-[50px]"
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-8 md:mt-12 lg:mt-[60px] flex justify-center">
          <button
            onClick={handleSeeMoreReviews}
            className="bg-white border flex min-h-10 items-center gap-3 text-sm md:text-base text-[rgba(29,89,249,1)] font-bold justify-center px-4 md:px-5 py-2.5 md:py-[11px] rounded-3xl border-[rgba(224,224,224,1)] border-solid hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[rgba(29,89,249,0.5)] focus:ring-offset-2"
            aria-label={
              showingMore ? "Show fewer reviews" : "Show more reviews"
            }
          >
            <span>
              {showingMore ? "Show fewer reviews" : "See more reviews"}
            </span>
          </button>
        </footer>
      </div>
    </section>
  );
}
