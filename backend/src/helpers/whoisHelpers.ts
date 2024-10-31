// simple date formattter
const formatDateTime = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  return new Date(dateString).toLocaleString(undefined, options);
};

// Created a separated helper so it can be neat on the App.ts
export const extractWhoisData = (infoType: string, tempData: any) => {
  switch (infoType) {
    // check if infoType === domain_info, gather datas from whois API like
    // domain_name, registrar, reg_date, expiry_date, estimated_domain_age, hostnames(list of hostname available)
    case 'domain_info':
      return {
        domain_name: tempData.WhoisRecord.domainName,
        registrar: tempData.WhoisRecord.registrarName,
        registration_date: formatDateTime(tempData.WhoisRecord.registryData.createdDate),
        expiration_date: formatDateTime(tempData.WhoisRecord.registryData.expiresDate),
        est_domain_age: tempData.WhoisRecord.estimatedDomainAge,
        hostnames: (() => {
          const hostnamesList = tempData.WhoisRecord.nameServers.hostNames.slice(0, 3).join(', ');
          return hostnamesList.length > 25 ? hostnamesList.slice(0, 25) + '...' : hostnamesList; // check if its more than 25 char
        })()
      };

    // for infoType === contact_info, gather datas needed from whois API
    // registrant_name, tech_contact_name, administrative_contact_name, contact_email
    case 'contact_info':
      return {
        registrant_name: tempData.WhoisRecord.registrant.name || tempData.WhoisRecord.registrant.organization,
        tech_contact_name: tempData.WhoisRecord.technicalContact.name || tempData.WhoisRecord.technicalContact.organization,
        administrative_contact_name: tempData.WhoisRecord.administrativeContact.name || tempData.WhoisRecord.administrativeContact.organization,
        contact_email: tempData.WhoisRecord.registrant.email,
      };

    default:
      throw new Error('Invalid Info Type');
  }
};