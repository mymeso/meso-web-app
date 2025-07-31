export type FieldDef = {
  key: string;
  label: string;
  group?: string;
  mandatory?: boolean;
  options?: { key: string; label: string }[];
  icon?: string;
};

export const SHOP_PROFILE = [
  { key: 'basic-info', label: 'Basic Info', icon: '/file.svg' },
  { key: 'about-you', label: 'About You', icon: '/globe.svg' },
];

export const BUSINESS_LOGISTICS = [
  { key: 'booking-policies', label: 'Booking Policies', icon: '/window.svg' },
  { key: 'scheduling', label: 'Scheduling', icon: '/window.svg' },
  { key: 'service-location', label: 'Service Location', icon: '/globe.svg' },
];

export const PERSONALIZATION = [
  { key: 'faq', label: 'Frequently Asked Questions', icon: '/file.svg' },
  { key: 'additional-questions', label: 'Additional Questions', icon: '/file.svg' },
  { key: 'customer-booking-form', label: 'Customer Booking Form', icon: '/file.svg' },
];

export const LIST_SERVICES = [
  { key: 'list-services', label: 'List Services', icon: '/file.svg' },
];