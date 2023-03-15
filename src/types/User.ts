

interface UserSubscription {
  plan: string;
  status: string;
  payment_method: string;
  term: string;
}

interface UserCreditCard {
  cc_number: string;
}

interface UserAddressCoordinates {
  lat: number;
  lng: number;
}

interface UserAddress {
  city: string;
  street_name: string;
  street_address: string;
  zip_code: string;
  state: string;
  country: string;
  coordinates: UserAddressCoordinates
}

interface UserEmployment {
  title: string;
  key_skill: string;
}

export interface User {
  id: number;
	uid: string;
	password: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	avatar: string;
	gender: string;
	phone_number: string;
	social_insurance_number: string;
	date_of_birth: string;
	employment: UserEmployment;
	address: UserAddress;
	credit_card: UserCreditCard;
	subscription: UserSubscription;
}