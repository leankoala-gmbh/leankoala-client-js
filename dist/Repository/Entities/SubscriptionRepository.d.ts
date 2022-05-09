import Repository from '../Repository';
import { IRSubResponseBillingAddress, IRSubResponseCompanySubscription, IRSubResponseCreditCard } from '../../typescript/interfaces/repos/subscriptionRepo.interface';
declare class SubscriptionRepository extends Repository {
    constructor();
    getCompanySubscription(company: string | number, args?: {}): Promise<IRSubResponseCompanySubscription>;
    setCompanyCreditCardPlans(company: string | number, args: {
        quantity: number;
    }): Promise<void>;
    setCompanyFreePlans(company: string | number, args: {
        quantity: number;
    }): Promise<any>;
    setCreditCard(company: string | number, args: IRSubResponseCreditCard): Promise<any>;
    setBillingAddress(company: string | number, args: IRSubResponseBillingAddress): Promise<any>;
    getBillingAddress(company: string | number, args?: {}): Promise<any>;
    getSubscribedFeatures(company: string | number, args?: {}): Promise<any>;
    getCompanyInvoices(company: string | number, args?: {}): Promise<any>;
    endTrials(providerIdentifier: any, args?: {}): Promise<any>;
}
export default SubscriptionRepository;
