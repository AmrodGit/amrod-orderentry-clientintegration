import { GraphQlSdkClient } from "../client";
import {
  ApproveJobCardInput,
  RequestJobCardChangeRequest,
  UpdateJobCardBrandingRequest,
  WorkflowMutationResponse,
} from "../models/order";

export class JobCardWorkflowApi {
  constructor(private client: GraphQlSdkClient) {}

  async approve(input: ApproveJobCardInput): Promise<WorkflowMutationResponse> {
    const query = `
      mutation ApproveJobCard($input: ApproveJobCardInput!) {
        approveJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
      }
    `;

    const response = await this.client.execute<{
      approveJobCard: WorkflowMutationResponse;
    }>(query, { input });
    return response.approveJobCard;
  }

  async updateBranding(
    input: UpdateJobCardBrandingRequest
  ): Promise<WorkflowMutationResponse> {
    const query = `
      mutation UpdateJobCardBrandingInfo($input: UpdateJobCardBrandingInfoInput!) {
        updateJobCardBrandingInfo(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
      }
    `;

    const response = await this.client.execute<{
      updateJobCardBrandingInfo: WorkflowMutationResponse;
    }>(query, { input });
    return response.updateJobCardBrandingInfo;
  }

  async requestChange(
    input: RequestJobCardChangeRequest
  ): Promise<WorkflowMutationResponse> {
    const query = `
      mutation RequestJobCardChange($input: RequestChangeJobCardInput!) {
        requestChangeJobCard(input: $input) { errors { __typename ... on ConflictException { message } } resultPayloadType { result } }
      }
    `;

    const response = await this.client.execute<{
      requestChangeJobCard: WorkflowMutationResponse;
    }>(query, { input });
    return response.requestChangeJobCard;
  }
}
