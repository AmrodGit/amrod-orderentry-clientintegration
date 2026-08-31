import { GraphQlSdkClient } from "../client";
import {
  ApproveJobCardInput,
  RequestJobCardChangeRequest,
  UpdateJobCardBrandingRequest,
  WorkflowMutationResponse,
} from "../models/order";

export class JobCardWorkflowApi {
  constructor(private client: GraphQlSdkClient) {}

  approve(input: ApproveJobCardInput): Promise<WorkflowMutationResponse> {
    const query = `
      mutation ApproveJobCard($input: ApproveJobCardInput!) {
        approveJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
      }
    `;

    return this.client.execute<WorkflowMutationResponse>(query, { input });
  }

  updateBranding(
    input: UpdateJobCardBrandingRequest
  ): Promise<WorkflowMutationResponse> {
    const query = `
      mutation UpdateJobCardBrandingInfo($input: UpdateJobCardBrandingInfoInput!) {
        updateJobCardBrandingInfo(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
      }
    `;

    return this.client.execute<WorkflowMutationResponse>(query, { input });
  }

  requestChange(
    input: RequestJobCardChangeRequest
  ): Promise<WorkflowMutationResponse> {
    const query = `
      mutation RequestJobCardChange($input: RequestChangeJobCardInput!) {
        requestChangeJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
      }
    `;

    return this.client.execute<WorkflowMutationResponse>(query, { input });
  }
}
