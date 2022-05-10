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

export interface IRSubResponseBillingAddress {
  address: {
    first_name: null
    last_name: null
    company_name: string
    country: string
    post_code: string
    city: string
    street: string
    usident: string
  }
}

export interface IRSubResponseSubFeatures {
  features: {
    [key: string]: {
      project: {
        id: number
        name: string
      }
      features?: {
        id: number
        name: string
        credits: number
      }[]
    }
  }
}

export interface IRSubResponseCompanyInvoices {
  invoices: {
    object: string
    data: {
      id: string
      object: any
      account_country: string
      account_name: string
      account_tax_ids: null
      amount_due: number
      amount_paid: number
      amount_remaining: number
      application: null
      application_fee_amount: null
      attempt_count: number
      attempted: boolean
      auto_advance: boolean
      automatic_tax: {
        enabled: boolean
        status: null
      }
      billing_reason: string
      charge: null | string
      collection_method: string
      created: number
      currency: string
      custom_fields: null
      customer: string
      customer_address: {
        city: string
        country: string
        line1: string
        line2: null | string
        postal_code: string
        state: null | string
      }
      customer_email: string
      customer_name: null
      customer_phone: null
      customer_shipping: null
      customer_tax_exempt: string
      customer_tax_ids: any[]
      default_payment_method: null
      default_source: null
      default_tax_rates: any[]
      description: string
      discount: null
      discounts: any[]
      due_date: null
      ending_balance: number
      footer: string
      hosted_invoice_url: string
      invoice_pdf: string
      last_finalization_error: null
      lines: {
        object: string
        data: {
          id: string
          object: string
          amount: number
          currency: string
          description: string
          discount_amounts: any[]
          discountable: boolean
          discounts: any[]
          livemode: boolean
          metadata: any[] | {
            [key: string]: string
          }
          period: {
            end: number
            start: number
          }
          plan: {
            id: string
            object: string
            active: boolean
            aggregate_usage: null
            amount: number
            amount_decimal: string
            billing_scheme: string
            created: number
            currency: string
            interval: string
            interval_count: number
            livemode: boolean
            metadata: any[]
            nickname: null
            product: string
            tiers_mode: null
            transform_usage: null
            trial_period_days: null
            usage_type: string
          }
          price: {
            id: string
            object: string
            active: boolean
            billing_scheme: string
            created: number
            currency: string
            livemode: boolean
            lookup_key: null
            metadata: any[]
            nickname: null
            product: string
            recurring: {
              aggregate_usage: null
              interval: string
              interval_count: number
              trial_period_days: null
              usage_type: string
            }
            tax_behavior: string
            tiers_mode: null
            transform_quantity: null
            type: string
            unit_amount: number
            unit_amount_decimal: string
          }
          proration: boolean
          proration_details: {
            credited_items: null
          }
          quantity: number
          subscription: string
          subscription_item: string
          tax_amounts: {
            amount: number
            inclusive: boolean
            tax_rate: string
          }[]
          tax_rates: {
            id: string
            object: string
            active: boolean
            country: null
            created: number
            description: null
            display_name: string
            inclusive: boolean
            jurisdiction: string
            livemode: boolean
            metadata: any[]
            percentage: number
            state: null
            tax_type: null
          }[]
          type: string[]
          has_more: boolean
          total_count: number
          url: string
        }
        livemode: boolean
        metadata: any[]
        next_payment_attempt: null
        number: string
        on_behalf_of: null
        paid: boolean
        paid_out_of_band: boolean
        payment_intent: null | string
        payment_settings: {
          payment_method_options: null
          payment_method_types: null
        }
        period_end: number
        period_start: number
        post_payment_credit_notes_amount: number
        pre_payment_credit_notes_amount: number
        quote: null
        receipt_number: null
        starting_balance: number
        statement_descriptor: null
        status: string
        status_transitions: {
          finalized_at: number
          marked_uncollectible_at: null
          paid_at: number
          voided_at: null
        }
        subscription: string
        subtotal: number
        tax: number
        test_clock: null
        total: number
        total_discount_amounts: any[]
        total_tax_amounts: {
          amount: number
          inclusive: boolean
          tax_rate: string
        }[]
        transfer_data: null
        webhooks_delivered_at: number
      }[]
      has_more: boolean
      url: string
    }
  }
}


export interface IRepoSubscription {
  getCompanySubscription(company: string | number, args?: object): Promise<IRSubResponseCompanySubscription>

  setCompanyCreditCardPlans(company: string | number, args: { quantity: number }): Promise<void>

  setCompanyFreePlans(company: string | number, args: { quantity: number }): Promise<void>

  setCreditCard(company: string | number, args: IRSubResponseCreditCard): Promise<void>

  setBillingAddress(company: string | number, args: IRSubResponseBillingAddress): Promise<void>

  getBillingAddress(company: string | number, args?: object): Promise<IRSubResponseBillingAddress>

  getSubscribedFeatures(company: string | number, args?: object): Promise<IRSubResponseSubFeatures>

  getCompanyInvoices(company: string | number, args?: object): Promise<IRSubResponseCompanyInvoices>

  endTrials(providerIdentifier: any, args?: object): Promise<any>
}
