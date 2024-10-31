export type ContactInfo = {
  registrant_name: string;
  tech_contact_name: string;
  administrative_contact_name: string;
  contact_email: string;
};

export type DomainInfo = {
  domain_name: string;
  registrar: string;
  registration_date: string;
  expiration_date: string;
  est_domain_age: string;
  hostnames: string;
};

export type ResultData = {
  contactInfo: ContactInfo | null;
  domainInfo: DomainInfo | null;
};
