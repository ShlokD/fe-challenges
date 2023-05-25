/** The response type of the API call */
export type ResponseType = PromotionType[];

/** Promotion Entity */
export type PromotionType = {
  id: string;
  name: string;
  description: string;
  heroImageUrl: string;
  onlyNewCustomers: boolean;
  termsAndConditionsButtonText: string;
  joinNowButtonText: string;
  sequence: number;
};
