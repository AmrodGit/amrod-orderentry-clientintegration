import { GraphQlSdkClient } from "../client";
import {
  PlaceOrderInput,
  PlaceOrderResponse,
  PlaceOrderRequest,
  toPlaceOrderInput,
} from "../models/order";

const PLACE_ORDER_MUTATION = `
  mutation PlaceOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      errors { __typename ... on BadRequestException { message } ... on ConflictException { message }
        ... on InputValidationException { message } ... on ServerError { message } }
      placeOrderPayloadType { orders { leadTimeInDays leadTimeInHours orderDate orderNumber salesOrderNumber totalExcl
        details { id items { name quantity sku unitPrice } branding { brandingCode brandingPosition brandingUnitPriceExcl description dyeChargeExcl dyeChargeName printQuantity setupChargeCode setupChargeExcl } } }
        warnings { code message warningType } }
    }
  }
`;

export class OrderEntryApi {
  constructor(private client: GraphQlSdkClient) {}

  placeOrder(request: PlaceOrderRequest): Promise<PlaceOrderResponse> {
    return this.executeOrder(toPlaceOrderInput(request), request.options.validateOnly);
  }

  validateOrder(request: PlaceOrderRequest): Promise<PlaceOrderResponse> {
    return this.executeOrder(toPlaceOrderInput(request), true);
  }

  private executeOrder(
    input: PlaceOrderInput,
    validateOnly: boolean
  ): Promise<PlaceOrderResponse> {
    const variables = {
      input: {
        ...input,
        options: { ...input.options, validateOnly },
      },
    };

    return this.client.execute<PlaceOrderResponse>(
      PLACE_ORDER_MUTATION,
      variables
    );
  }
}
