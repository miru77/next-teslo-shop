export interface DashboarSummaryResponse {
    numberOfOrders:          number;
    paidOrders:              number;
    numberOfClients:         number;
    numberOfProducts:        number;
    productsWithNoInventory: number;
    lowInventiry:            number;
    notPaidOrders:           number;
}
