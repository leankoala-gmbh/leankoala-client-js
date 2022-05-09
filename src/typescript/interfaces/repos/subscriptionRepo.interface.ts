export interface IRSubResponseCreditCard {
  stripe_cc_source: any
  last_digits: string
  brand: string
}

export interface IRSubResponseBillingAddress {
  company_name: string
  country: string
  postal_code: string
  city: string
  street: string
  usident?: string
  email?: string
}

export interface IRSubResponseCompanySubscription {
  credit_card: {
    id: number
    brand: string
    last_digits: string
  }
  plans: {
    credit_card: number
    invoice: number
    trial: number
    plan: string
  }
  subscription_plan: string
  systems: {
    systems_all: number
    systems_used: number
    systems_free: number
  }
  tax_rate: number
  price_per_project: number
  status: string
  trial_end: number
}

export interface IRepoSubscription {
  getCompanySubscription(company: string|number, args: any): Promise<IRSubResponseCompanySubscription>
  setCompanyCreditCardPlans(company: string|number, args: { quantity: number }): Promise<void>
  setCompanyFreePlans(company: string|number, args: { quantity: number }): Promise<any>
  setCreditCard(company: string|number, args: IRSubResponseCreditCard): Promise<any>
  setBillingAddress(company: string|number, args: IRSubResponseBillingAddress): Promise<any>
  getBillingAddress(company: string|number, args?: object): Promise<any>
  getSubscribedFeatures(company: string|number, args?: object): Promise<any>
  getCompanyInvoices(company: string|number, args?: object): Promise<any>
  endTrials(providerIdentifier: any, args?: object): Promise<any>
}
