
type Categories = 'security' | 'pest control' | 'landscaping' | 'pools';

type PromoStatus = 'LISTED' | 'UNLISTED' | 'REVIEW';

interface ListingPayload {
  _metadata: {
    status?: PromoStatus;
    lastModified?: string;
  };
  title: string;
  discount: string;
  url_website: string;

  expiration: string;
  desc: string;
  promo_img: {
    upload_time: number | null | undefined;
    filename: string;
  };

  businessName?: string;

  category?: string;

  uploaded?: string;
}