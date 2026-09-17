export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Byte` scalar type represents non-fractional whole numeric values. Byte can represent values between 0 and 255. */
  Byte: { input: any; output: any; }
  /** The `Date` scalar represents an ISO-8601 compliant date type. */
  Date: { input: any; output: any; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The `Decimal` scalar type represents a decimal floating-point number. */
  Decimal: { input: any; output: any; }
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: { input: any; output: any; }
  /** The `Short` scalar type represents non-fractional signed whole 16-bit numeric values. Short can represent values between -(2^15) and 2^15 - 1. */
  Short: { input: any; output: any; }
  URL: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Represents a address. */
export type Address = {
  readonly __typename?: 'Address';
  /** The address code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The sales person identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The line 1 for the address. */
  readonly line1: Maybe<Scalars['String']['output']>;
  /** The line 2 for the address. */
  readonly line2: Maybe<Scalars['String']['output']>;
  /** The line 3 for the address. */
  readonly line3: Maybe<Scalars['String']['output']>;
  /** The line 4 for the address. */
  readonly line4: Maybe<Scalars['String']['output']>;
  /** The line 5 for the address. */
  readonly line5: Maybe<Scalars['String']['output']>;
  /**
   * Determines the type of the specified address based on its type identifier.
   *
   *
   * **Returns:**
   * The type of the address as an AddressType. Returns Postal if the type
   * lookup fails.
   */
  readonly type: AddressType;
};

export type AddressType =
  | 'PHYSICAL'
  | 'POSTAL';

/** Defines when a policy shall be executed. */
export type ApplyPolicy =
  /** After the resolver was executed. */
  | 'AFTER_RESOLVER'
  /** Before the resolver was executed. */
  | 'BEFORE_RESOLVER'
  /** The policy is applied in the validation step before the execution. */
  | 'VALIDATION';

export type ApproveJobCardError = ConflictException;

/**
 * Represents the input required to approve a job card, including details about the job card and its layout
 * configuration.
 */
export type ApproveJobCardInput = {
  /** This is the unique JobCard number of the job card to be approved. */
  readonly jobCardNumber: Scalars['String']['input'];
  /** This is the option number of the job card proof. */
  readonly optionNumber: InputMaybe<Scalars['Int']['input']>;
  /** This is the ID of the job card layout to be used for printing. */
  readonly proofId: Scalars['ID']['input'];
};

export type ApproveJobCardPayload = {
  readonly __typename?: 'ApproveJobCardPayload';
  readonly errors: Maybe<ReadonlyArray<ApproveJobCardError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/** Represents a logo. */
export type ArtworkDetails = Node & {
  readonly __typename?: 'ArtworkDetails';
  /** Specifies whether the artwork can be deleted. */
  readonly canDelete: Scalars['Boolean']['output'];
  /** Specifies whether the artwork can be edited. */
  readonly canEdit: Scalars['Boolean']['output'];
  /** Specifies whether the artwork can be moved. */
  readonly canMove: Scalars['Boolean']['output'];
  /** Specifies whether the artwork can be shared. */
  readonly canShare: Scalars['Boolean']['output'];
  /** The checksum for change tracking. */
  readonly checksum: Scalars['String']['output'];
  /** The creation date and time of the artwork. */
  readonly created: Scalars['DateTime']['output'];
  /** The artwork description. */
  readonly description: Maybe<Scalars['String']['output']>;
  /** The artwork file extension. */
  readonly extension: Scalars['String']['output'];
  /** The unique identifier for the artwork. */
  readonly id: Scalars['ID']['output'];
  /** The artwork identifier. */
  readonly internalId: Scalars['Long']['output'];
  /** The artwork file mimetype. */
  readonly mimeType: Scalars['String']['output'];
  /** The artwork name. */
  readonly name: Scalars['String']['output'];
  /** Specifies the ownership details of the artwork. */
  readonly owner: Owner;
  /**
   * The artwork file storage path.
   * @deprecated The Path property is deprecated and will be removed in future versions.
   */
  readonly path: Maybe<Scalars['String']['output']>;
  /** The artwork sharing permissions. */
  readonly security: Maybe<SharingSecurity>;
  /** The artwork filesize. */
  readonly size: Scalars['Long']['output'];
  /** The display file size of the artwork file. */
  readonly sizeFormatted: Scalars['String']['output'];
  /** The artwork status. */
  readonly status: ArtworkStatus;
  /** The tags associated with the artwork. */
  readonly tags: ReadonlyArray<ArtworkTag>;
  /** The artwork file thumbnail URL. */
  readonly thumbnailUrl: Maybe<Scalars['URL']['output']>;
  /** Specifies the artwork type. */
  readonly type: ArtworkType;
  /** The artwork file URL. */
  readonly url: Scalars['URL']['output'];
};

/** Represents an artwork file type. */
export type ArtworkFileType = Node & {
  readonly __typename?: 'ArtworkFileType';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The artwork file type code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the artwork file type. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the artwork file type. */
  readonly id: Scalars['ID']['output'];
  /** The artwork file type identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The MIME type of the artwork file. */
  readonly mimeType: Maybe<Scalars['String']['output']>;
  /** The last modified date and time of the artwork file type. */
  readonly modified: Scalars['DateTime']['output'];
  /** The artwork file type name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the artwork file type. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency checking. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents an artwork folder. */
export type ArtworkFolder = {
  readonly __typename?: 'ArtworkFolder';
  /** The unique identifier for the folder. */
  readonly id: Scalars['Long']['output'];
  /** The folder name. */
  readonly name: Scalars['String']['output'];
  /** The folder path within the owner's logo library relative to the root folder. */
  readonly path: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type ArtworkFolderContentsConnection = {
  readonly __typename?: 'ArtworkFolderContentsConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<ArtworkFolderContentsEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<ArtworkDetails>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ArtworkFolderContentsEdge = {
  readonly __typename?: 'ArtworkFolderContentsEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: ArtworkDetails;
};

/** Represents an artwork folder. */
export type ArtworkFolderDetails = Node & {
  readonly __typename?: 'ArtworkFolderDetails';
  /** Specifies whether the current owner can delete the folder. */
  readonly canDelete: Scalars['Boolean']['output'];
  /** Specifies whether the current owner can edit the folder. */
  readonly canEdit: Scalars['Boolean']['output'];
  /** Specifies whether the current owner can move the folder. */
  readonly canMove: Scalars['Boolean']['output'];
  /** Specifies whether the current owner can share the folder. */
  readonly canShare: Scalars['Boolean']['output'];
  /** The child folders associated with the artwork folder. */
  readonly childFolders: ReadonlyArray<ArtworkFolderDetails>;
  /** The unique identifier for the folder. */
  readonly id: Scalars['ID']['output'];
  /** The artwork folder identifier. */
  readonly internalId: Scalars['Long']['output'];
  /** The folder name. */
  readonly name: Scalars['String']['output'];
  /** The logo library owner associated with the folder. */
  readonly owner: Owner;
  /** The folder path within the owner's logo library relative to the root folder. */
  readonly path: Scalars['String']['output'];
  /** The folder sharing permissions. */
  readonly security: Maybe<SharingSecurity>;
};

/** A connection to a list of items. */
export type ArtworkQueryConnection = {
  readonly __typename?: 'ArtworkQueryConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<ArtworkQueryEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<ArtworkDetails>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ArtworkQueryEdge = {
  readonly __typename?: 'ArtworkQueryEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: ArtworkDetails;
};

/** Specifies the artwork status to query against. */
export type ArtworkQueryStatus =
  /** Include artwork that are active. */
  | 'ACTIVE'
  /** Include artwork that have been deleted. */
  | 'DELETED';

/** Represents a session for uploading artwork, including metadata and upload configuration. */
export type ArtworkSession = {
  readonly __typename?: 'ArtworkSession';
  /** The collection of headers associated with the request or response. */
  readonly headers: Maybe<ReadonlyArray<KeyValuePairOfStringAndString>>;
  /** The unique identifier for the entity. */
  readonly id: Scalars['ID']['output'];
  /** The URI to which the upload operation will be directed. */
  readonly uploadUri: Scalars['URL']['output'];
};

export type ArtworkStatus =
  | 'ACTIVE'
  | 'ARCHIVE'
  | 'DELETED'
  | 'PENDING'
  | 'PENDING_ACTIVE'
  | 'REJECTED';

/** Represents an artwork tag. */
export type ArtworkTag = {
  readonly __typename?: 'ArtworkTag';
  /** The artwork tag color. */
  readonly color: Scalars['String']['output'];
  /** The unique identifier for the artwork tag. */
  readonly id: Scalars['ID']['output'];
  /** The artwork tag name. */
  readonly name: Scalars['String']['output'];
};

/** Represents an artwork tag. */
export type ArtworkTagDetails = Node & {
  readonly __typename?: 'ArtworkTagDetails';
  /** Specifies whether the artwork tag can be edited. */
  readonly canEdit: Scalars['Boolean']['output'];
  /** The artwork tag color. */
  readonly color: Scalars['String']['output'];
  /** The unique identifier for the artwork tag. */
  readonly id: Scalars['ID']['output'];
  /** The artwork tag name. */
  readonly name: Scalars['String']['output'];
  /** Specifies the ownership details of the artwork tag. */
  readonly owner: Owner;
};

export type ArtworkType =
  | 'LOGO'
  | 'TEMPLATE';

/** Represents a product. */
export type AutocompleteProduct = {
  readonly __typename?: 'AutocompleteProduct';
  /** The product image URL. */
  readonly imageUrl: Scalars['String']['output'];
  /** The name of the product. */
  readonly name: Scalars['String']['output'];
  /** The sold-as style code of the product. */
  readonly soldAsCode: Scalars['String']['output'];
  /** The style code of the product. */
  readonly styleCode: Scalars['String']['output'];
};

/** Represents a variant of a product style. */
export type AutocompleteVariant = {
  readonly __typename?: 'AutocompleteVariant';
  /** The code for the variant. */
  readonly code: Scalars['String']['output'];
  /** The product variant image URL. */
  readonly imageUrl: Scalars['String']['output'];
  /** The name of the product. */
  readonly name: Scalars['String']['output'];
  /** The SKU (Stock Keeping Unit) for the variant. */
  readonly sku: Scalars['String']['output'];
  /** The sold-as style code of the product. */
  readonly soldAsCode: Scalars['String']['output'];
  /** The style code of the product. */
  readonly styleCode: Scalars['String']['output'];
};

/** Represents an exception that is thrown when a bad request is sent, typically due to malformed or incorrect data. */
export type BadRequestException = Error & {
  readonly __typename?: 'BadRequestException';
  /** Gets or sets additional data associated with the object as key-value pairs. */
  readonly additionalData: Maybe<ReadonlyArray<KeyValuePairOfStringAndString>>;
  /** Gets the error code associated with the exception. */
  readonly code: Scalars['Long']['output'];
  /** Gets the detailed error message associated with the current operation. */
  readonly errorDetail: Maybe<Scalars['String']['output']>;
  /** Gets the error message associated with the exception. */
  readonly message: Scalars['String']['output'];
};

/** Represents a behavior. */
export type Behavior = Node & {
  readonly __typename?: 'Behavior';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The behavior code. */
  readonly code: Scalars['String']['output'];
  /** The creation date and time of the behavior. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the behavior. */
  readonly id: Scalars['ID']['output'];
  /** The behavior identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the behavior. */
  readonly modified: Scalars['DateTime']['output'];
  /** The behavior name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the behavior. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency checking. */
  readonly timestamp: Scalars['Long']['output'];
};

export type BooleanOperationFilterInput = {
  readonly eq: InputMaybe<Scalars['Boolean']['input']>;
  readonly neq: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a branch. */
export type Branch = {
  readonly __typename?: 'Branch';
  /** The can collect status for the branch. */
  readonly canCollect: Scalars['Boolean']['output'];
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The code for the branch. */
  readonly code: Scalars['String']['output'];
  /** The company for the branch. */
  readonly company: Scalars['Int']['output'];
  /** The created date for the branch. */
  readonly created: Scalars['DateTime']['output'];
  /** Whether the branch is active or not. */
  readonly isActive: Scalars['Boolean']['output'];
  /** Whether the branch CIF is active or not. */
  readonly isCIFActive: Scalars['Boolean']['output'];
  /** Whether the branch is direct to client or not. */
  readonly isDirectToClient: Scalars['Boolean']['output'];
  /** Whether the branch is local or not. */
  readonly isLocal: Scalars['Boolean']['output'];
  /** Whether the branch is a master branch or not. */
  readonly isMaster: Scalars['Boolean']['output'];
  /** The modified date for the branch. */
  readonly modified: Scalars['DateTime']['output'];
  /** The name of the branch. */
  readonly name: Scalars['String']['output'];
  /** The source identifier for the branch. */
  readonly sourceIdentifier: Scalars['String']['output'];
  /** The timestamp for the branch. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents the details of a branding color associated with an order, including its type and color code. */
export type BrandingColorDetailInput = {
  /** The color code for the branding, represented as a string. This could be a hex code or any other format */
  readonly code: Scalars['String']['input'];
  /** The type of branding color, which indicates the purpose or category of the color used in the order branding. */
  readonly type: OrderBrandingColorType;
};

/**
 * Represents the detailed branding information for an order group, including specifications for branding position,
 * logos, colors, and additional metadata.
 */
export type BrandingDetailInput = {
  /** The branding code that identifies the specific branding to be used for the order group. */
  readonly brandingCode: Scalars['String']['input'];
  /**
   * The colors associated with the branding, represented as a list of BrandingColorDetail instances.
   * The number of colors supplied must match according to the branding specification.
   */
  readonly colors: InputMaybe<ReadonlyArray<BrandingColorDetailInput>>;
  /** The logo position placement within the branding, indicating where the logo should be positioned relative to the branding elements. */
  readonly logoPosition: InputMaybe<OrderBrandingLogoPositionType>;
  /** The size of the logo to be used in the branding, specified in millimeters. */
  readonly logoSize: InputMaybe<Scalars['Float']['input']>;
  /** The size type of the logo, which indicates if the LogoSize supplied is the Width or Height. */
  readonly logoSizeType: InputMaybe<OrderBrandingLogoSizeType>;
  /** The list of logos ids, from the Logo Library, that are to be used in the branding. */
  readonly logos: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
  /**
   * The metadata associated with the branding, which may include additional information or attributes related to the branding.
   * Example metadata could include details about the branding job, such as the foil color for the Foiling branding process.
   */
  readonly metadata: InputMaybe<ReadonlyArray<BrandingMetadataInput>>;
  /**
   * The packing instructions for the order group, which may include details on how the items should be packed or handled.
   * For internal use only, as it is not used in the branding specification.
   */
  readonly packingInstructions: InputMaybe<Scalars['String']['input']>;
  /** The branding position code according to the branding specification, which indicates where the branding should be applied. */
  readonly position: Scalars['String']['input'];
  /** The reference identifier for the branding job. */
  readonly reference: InputMaybe<Scalars['String']['input']>;
  /** The special instructions for the branding, which may include specific requirements or notes related to the branding. */
  readonly specialInstructions: InputMaybe<Scalars['String']['input']>;
};

/** Represents metadata associated with order branding, consisting of a key-value pair. */
export type BrandingMetadataInput = {
  /** The key for the metadata entry, which identifies the type of information stored. */
  readonly key: Scalars['String']['input'];
  /** The value associated with the key, which contains the actual data or information. */
  readonly value: InputMaybe<Scalars['String']['input']>;
};

/** Represents a branding method in the Moyo Data Gateway system. */
export type BrandingMethod = Node & {
  readonly __typename?: 'BrandingMethod';
  /** The checksum value used for data integrity verification and detecting changes to the record. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The unique code identifier for the branding method. */
  readonly code: Scalars['String']['output'];
  /**
   * Retrieves the color type associated with the specified branding method.
   *
   *
   * **Returns:**
   * A value of type BrandingMethodColorType representing the color type of the branding method. Returns
   * BrandingMethodColorType.NoColor if the color type is not defined.
   */
  readonly colorType: BrandingMethodColorType;
  /** The date and time when the branding method record was initially created in the system. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the branding method. */
  readonly id: Scalars['ID']['output'];
  /** The branding method identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The date and time when the branding method record was last modified. */
  readonly modified: Scalars['DateTime']['output'];
  /** The display name of the branding method. */
  readonly name: Scalars['String']['output'];
  /** The sort order index that determines the display sequence of branding methods in user interfaces. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source system identifier that originated this branding method record. */
  readonly sourceIdentifier: Scalars['String']['output'];
  /** The timestamp indicating when the record was last synchronized or updated from the source system. */
  readonly timestamp: Scalars['Long']['output'];
};

export type BrandingMethodColorType =
  | 'COLOR_SELECTION'
  | 'FULL_COLOR'
  | 'NO_COLOR';

/** Represents a branding option. */
export type BrandingOption = {
  readonly __typename?: 'BrandingOption';
  /** Gets the branding process for this option. */
  readonly brandingProcess: Maybe<BrandingProcess>;
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the branding option. */
  readonly id: Scalars['Int']['output'];
  /** Gets the inclusive branding options. */
  readonly inclusiveBrandingOptions: Maybe<ReadonlyArray<InclusiveBranding>>;
  /** The maximum colors for the branding option */
  readonly maximumColors: Maybe<Scalars['Int']['output']>;
  /** The maximum order quantity for the branding option */
  readonly maximumOrderQuantity: Maybe<Scalars['Int']['output']>;
  /** The minimum order quantity for the branding option */
  readonly minimumOrderQuantity: Maybe<Scalars['Int']['output']>;
  /** The maximum print height for the branding option */
  readonly printHeight: Scalars['Float']['output'];
  /** The print width for the branding option */
  readonly printWidth: Scalars['Float']['output'];
};

/** Represents a branding position. */
export type BrandingPosition = {
  readonly __typename?: 'BrandingPosition';
  /** Gets the branding options available for this position. */
  readonly brandingOptions: ReadonlyArray<BrandingOption>;
  /** The branding service code. */
  readonly brandingServiceCode: Maybe<Scalars['String']['output']>;
  /** The checksum used for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** An optional comment associated with the position. */
  readonly comment: Maybe<Scalars['String']['output']>;
  /** The component assigned to the position. */
  readonly component: Maybe<Scalars['Int']['output']>;
  /** The unique identifier of the position. */
  readonly id: Scalars['Int']['output'];
  /** Indicates whether this position can be customized. */
  readonly isCustomizable: Scalars['Boolean']['output'];
  /** Indicates whether this position is mandatory. */
  readonly isRequired: Scalars['Boolean']['output'];
  /** Indicates whether a template must be assigned to this position. */
  readonly isTemplateRequired: Scalars['Boolean']['output'];
  /** The multiplier applied to the position. */
  readonly multiplier: Scalars['Int']['output'];
  /** The display name of the position. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The position code or reference. */
  readonly position: Maybe<Scalars['String']['output']>;
  /** The print height of the position. */
  readonly printHeight: Scalars['Int']['output'];
  /** The print width of the position. */
  readonly printWidth: Scalars['Int']['output'];
};

/** Represents a branding process. */
export type BrandingProcess = {
  readonly __typename?: 'BrandingProcess';
  /** Gets the branding process for this option. */
  readonly brandingMethod: Maybe<BrandingMethod>;
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The code for the branding process. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The source created date for the branding process. */
  readonly created: Scalars['DateTime']['output'];
  /** The grouping for the branding process. */
  readonly grouping: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the branding process. */
  readonly id: Scalars['Int']['output'];
  /** The last modified date for the branding process. */
  readonly modified: Scalars['DateTime']['output'];
  /** The source identifier for the branding process. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency checking. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents a branding service. */
export type BrandingService = Node & {
  readonly __typename?: 'BrandingService';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The branding service code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the branding service. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the branding service. */
  readonly id: Scalars['ID']['output'];
  /** The branding service identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the branding service. */
  readonly modified: Scalars['DateTime']['output'];
  /** The branding service name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the branding service. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency checking. */
  readonly timestamp: Scalars['Long']['output'];
};

/** A connection to a list of items. */
export type ChildrenConnection = {
  readonly __typename?: 'ChildrenConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<ChildrenEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<Customer>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ChildrenEdge = {
  readonly __typename?: 'ChildrenEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: Customer;
};

/** Represents a color method. */
export type ColorMethod = Node & {
  readonly __typename?: 'ColorMethod';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The color method code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the color method. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the color method. */
  readonly id: Scalars['ID']['output'];
  /** The color method identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the color method. */
  readonly modified: Scalars['DateTime']['output'];
  /** The color method name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the color method. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency checking. */
  readonly timestamp: Scalars['Long']['output'];
};

export type CommitArtworkError = BadRequestException | ConflictException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for committing a new artwork. */
export type CommitArtworkInput = {
  /** The identifier of the artwork. */
  readonly id: Scalars['ID']['input'];
  /** Gets the collection of tag identifiers associated with the entity. */
  readonly tagIds: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
};

export type CommitArtworkPayload = {
  readonly __typename?: 'CommitArtworkPayload';
  readonly errors: Maybe<ReadonlyArray<CommitArtworkError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/**
 * Represents an exception that is thrown when a conflict occurs, such as when a record with matching information
 * already exists, preventing the operation from being processed.
 */
export type ConflictException = Error & {
  readonly __typename?: 'ConflictException';
  /** Gets or sets additional data associated with the object as key-value pairs. */
  readonly additionalData: Maybe<ReadonlyArray<KeyValuePairOfStringAndString>>;
  /** Gets the error code associated with the exception. */
  readonly code: Scalars['Long']['output'];
  /** Gets the detailed error message associated with the current operation. */
  readonly errorDetail: Maybe<Scalars['String']['output']>;
  /** Gets the error message associated with the exception. */
  readonly message: Scalars['String']['output'];
};

export type ContactStatus =
  | 'ACTIVE'
  | 'INACTIVE';

export type CreateArtworkError = BadRequestException | ConflictException | InputValidationException | UnauthorizedException;

export type CreateArtworkFolderError = BadRequestException | ConflictException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for creating a new folder. */
export type CreateArtworkFolderInput = {
  /** The name of the folder. */
  readonly name: Scalars['String']['input'];
  /** The parent folder identifier, if one exists. */
  readonly parentId: InputMaybe<Scalars['ID']['input']>;
};

export type CreateArtworkFolderPayload = {
  readonly __typename?: 'CreateArtworkFolderPayload';
  readonly artworkFolder: Maybe<ArtworkFolder>;
  readonly errors: Maybe<ReadonlyArray<CreateArtworkFolderError>>;
};

/** Input type for creating a new artwork. */
export type CreateArtworkInput = {
  /** The description of the artwork. */
  readonly description: InputMaybe<Scalars['String']['input']>;
  /** The extension of the artwork. */
  readonly extension: Scalars['String']['input'];
  /** The Folder of the artwork. */
  readonly folder: InputMaybe<Scalars['ID']['input']>;
  /** The mime type of the artwork. */
  readonly mimeType: Scalars['String']['input'];
  /** The name of the artwork. */
  readonly name: Scalars['String']['input'];
  /** The Type Identifier of the artwork. */
  readonly type: ArtworkType;
};

export type CreateArtworkPayload = {
  readonly __typename?: 'CreateArtworkPayload';
  readonly artworkSession: Maybe<ArtworkSession>;
  readonly errors: Maybe<ReadonlyArray<CreateArtworkError>>;
};

export type CreateArtworkTagError = BadRequestException | ConflictException | InputValidationException | UnauthorizedException;

/** Input type for creating a new artwork tag. */
export type CreateArtworkTagInput = {
  /**
   * The color of the artwork tag in hex format (e.g., "FF5733").
   * NOTE: The '#' is not required
   */
  readonly color: Scalars['String']['input'];
  /** The name of the artwork tag. */
  readonly name: Scalars['String']['input'];
};

export type CreateArtworkTagPayload = {
  readonly __typename?: 'CreateArtworkTagPayload';
  readonly artworkTag: Maybe<ArtworkTag>;
  readonly errors: Maybe<ReadonlyArray<CreateArtworkTagError>>;
};

/** Represents a credit note style */
export type CreditNote = Node & {
  readonly __typename?: 'CreditNote';
  /** The asset URI for the credit note. */
  readonly assetUri: Scalars['URL']['output'];
  /** The date of the credit note. */
  readonly creditNoteDate: Scalars['Date']['output'];
  /**
   * Asynchronously retrieves the collection of details associated with the specified credit note.
   *
   *
   * **Returns:**
   * A collection of credit note details for the specified credit note, or null if no details are found.
   */
  readonly creditNoteDetails: Maybe<ReadonlyArray<CreditNoteDetail>>;
  /** The number of the credit note. */
  readonly creditNoteNumber: Scalars['String']['output'];
  /** The unique identifier of the credit note */
  readonly id: Scalars['ID']['output'];
  /**
   * Gets the internal identifier of the specified credit note.
   *
   *
   * **Returns:**
   * The internal identifier of the specified credit note.
   */
  readonly internalId: Scalars['Int']['output'];
  /** The tax for the credit note. */
  readonly tax: Scalars['Float']['output'];
  /** The total excluding tax for the credit note. */
  readonly totalExcl: Scalars['Float']['output'];
};

/** Restricts the filter operations available when filtering credit notes by date range. */
export type CreditNoteDateRangeOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<CreditNoteDateRangeOperationFilterInput>>;
  readonly gt: InputMaybe<Scalars['DateTime']['input']>;
  readonly gte: InputMaybe<Scalars['DateTime']['input']>;
  readonly lt: InputMaybe<Scalars['DateTime']['input']>;
  readonly lte: InputMaybe<Scalars['DateTime']['input']>;
  readonly or: InputMaybe<ReadonlyArray<CreditNoteDateRangeOperationFilterInput>>;
};

/** Represents the details of a credit note, including product information and quantity. */
export type CreditNoteDetail = {
  readonly __typename?: 'CreditNoteDetail';
  /** The quantity for the credit note detail. */
  readonly quantity: Scalars['Int']['output'];
  /** The stock-keeping unit (SKU) identifier for the product. */
  readonly sku: Scalars['String']['output'];
};

export type CreditNoteFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<CreditNoteFilterInput>>;
  readonly creditNoteDate: InputMaybe<CreditNoteDateRangeOperationFilterInput>;
  readonly creditNoteNumber: InputMaybe<CreditNoteStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<CreditNoteFilterInput>>;
  readonly salesOrder: InputMaybe<SalesOrderFilterInput>;
};

/** Restricts the filter operations available when filtering credit notes. */
export type CreditNoteStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<CreditNoteStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<CreditNoteStringOperationFilterInput>>;
};

/** A connection to a list of items. */
export type CreditNotesConnection = {
  readonly __typename?: 'CreditNotesConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<CreditNotesEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<CreditNote>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CreditNotesEdge = {
  readonly __typename?: 'CreditNotesEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: CreditNote;
};

/** Represents a currency. */
export type Currency = Node & {
  readonly __typename?: 'Currency';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The currency code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The conversion factor used for currency exchange. */
  readonly conversionFactor: Scalars['Decimal']['output'];
  /** The creation date and time of the currency. */
  readonly created: Scalars['DateTime']['output'];
  /** The display format for the currency. */
  readonly displayFormat: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the currency. */
  readonly id: Scalars['ID']['output'];
  /** The currency identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** Indicates whether this currency is the master currency. */
  readonly isMaster: Scalars['Boolean']['output'];
  /** The last modified date and time of the currency. */
  readonly modified: Scalars['DateTime']['output'];
  /** The currency name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The number of decimal places for the currency. */
  readonly precision: Scalars['Byte']['output'];
  /** The sort index for the currency. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The symbol representing the currency. */
  readonly symbol: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency checking. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents a customer. */
export type Customer = Node & {
  readonly __typename?: 'Customer';
  /** The account clerk for the customer. */
  readonly accountsClerk: Maybe<Scalars['String']['output']>;
  /** The account contact for the customer. */
  readonly accountsContact: Scalars['String']['output'];
  /** The account contact email for the customer. */
  readonly accountsContactEmail: Scalars['String']['output'];
  /** The addresses associated with the customer. */
  readonly addresses: ReadonlyArray<Address>;
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The master associated with the customer. */
  readonly children: Maybe<ChildrenConnection>;
  /** The Customer code. */
  readonly code: Scalars['String']['output'];
  /** The company registration number for the customer. */
  readonly companyRegistrationNumber: Maybe<Scalars['String']['output']>;
  /** The contact number for the customer. */
  readonly contactNumber: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the customer. */
  readonly created: Scalars['DateTime']['output'];
  /** The credit limit for the customer. */
  readonly creditLimit: Scalars['Decimal']['output'];
  /** The contacts associated with the customer. */
  readonly customerContacts: ReadonlyArray<CustomerContact>;
  /** The customer group for the customer. */
  readonly customerGroup: Maybe<Scalars['String']['output']>;
  /** The customer group name for the customer. */
  readonly customerGroupName: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the customer. */
  readonly id: Scalars['ID']['output'];
  /** The customer identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The master associated with the customer. */
  readonly master: Maybe<Customer>;
  /** The last modified date and time of the customer. */
  readonly modified: Scalars['DateTime']['output'];
  /** The customer name. */
  readonly name: Scalars['String']['output'];
  /** The payment term associated with the customer. */
  readonly paymentTerm: Maybe<PaymentTerm>;
  /** The region associated with the customer. */
  readonly region: Maybe<Region>;
  /** The sales area associated with the customer. */
  readonly salesArea: Maybe<SalesArea>;
  /** The sales person associated with the customer. */
  readonly salesPerson: Maybe<SalesPerson>;
  /** The source identifier for the contact. */
  readonly sourceIdentifier: Scalars['String']['output'];
  /** The status associated with the customer. */
  readonly status: Maybe<EnumLookup>;
  /** The tax number for the customer. */
  readonly taxNumber: Maybe<Scalars['String']['output']>;
  /** The tax status associated with the customer. */
  readonly taxStatus: Maybe<EnumLookup>;
  /** The tier associated with the customer. */
  readonly tier: Maybe<Tier>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
  /** The vat deferment number for the customer. */
  readonly vatDefermentNumber: Maybe<Scalars['String']['output']>;
};


/** Represents a customer. */
export type CustomerchildrenArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};

/** Represents a contact. */
export type CustomerContact = Node & {
  readonly __typename?: 'CustomerContact';
  /** The branch name of the contact. */
  readonly branchName: Maybe<Scalars['String']['output']>;
  /** The checksum for the contact. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The unique code for the contact. */
  readonly code: Scalars['UUID']['output'];
  /** The date and time when the contact was created. */
  readonly created: Scalars['DateTime']['output'];
  /** The customer associated with the contact. */
  readonly customer: Maybe<Customer>;
  /** The email address of the contact. */
  readonly emailAddress: Maybe<Scalars['String']['output']>;
  /** The first name of the contact. */
  readonly firstName: Maybe<Scalars['String']['output']>;
  /** The full name of the contact. */
  readonly fullName: Maybe<Scalars['String']['output']>;
  /** The gender of the contact. */
  readonly gender: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the contact. */
  readonly id: Scalars['ID']['output'];
  /** The contact identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** Gets or sets a value indicating whether the contact is a master contact. */
  readonly isMastercontact: Scalars['Boolean']['output'];
  /** Gets or sets a value indicating whether the contact is a website user. */
  readonly isWebSiteUser: Scalars['Boolean']['output'];
  /** The job role of the contact. */
  readonly jobRole: Maybe<Scalars['String']['output']>;
  /** The last name of the contact. */
  readonly lastName: Maybe<Scalars['String']['output']>;
  /** The mobile number of the contact. */
  readonly mobileNumber: Maybe<Scalars['String']['output']>;
  /** The date and time when the contact was last modified. */
  readonly modified: Scalars['DateTime']['output'];
  /** The source identifier for the contact. */
  readonly sourceIdentifier: Scalars['String']['output'];
  /** The status associated with the contact. */
  readonly status: ContactStatus;
  /** Gets or sets a value indicating whether the contact is a sync user. */
  readonly syncUser: Scalars['Boolean']['output'];
  /** The telephone number of the contact. */
  readonly telephoneNumber: Maybe<Scalars['String']['output']>;
  /** The timestamp for the contact. */
  readonly timestamp: Scalars['Long']['output'];
  /** The date and time when the website was last modified. */
  readonly websiteLastModified: Maybe<Scalars['DateTime']['output']>;
};

/** A connection to a list of items. */
export type CustomersConnection = {
  readonly __typename?: 'CustomersConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<CustomersEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<Customer>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CustomersEdge = {
  readonly __typename?: 'CustomersEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: Customer;
};

/** Represents date details. */
export type DateDetails = Node & {
  readonly __typename?: 'DateDetails';
  /** Indicates the current day of the year. */
  readonly currentDay: Maybe<Scalars['Short']['output']>;
  /** Indicates the current month of the year. */
  readonly currentMonth: Maybe<Scalars['Short']['output']>;
  /** Indicates the current quarter of the year. */
  readonly currentQuarter: Maybe<Scalars['Short']['output']>;
  /** Indicates the current week of the year. */
  readonly currentWeek: Maybe<Scalars['Short']['output']>;
  /** Indicates the current year. */
  readonly currentYear: Maybe<Scalars['Short']['output']>;
  /** The actual date. */
  readonly date: Maybe<Scalars['Date']['output']>;
  /** The date two years ago from this date. */
  readonly date2YearsBack: Maybe<Scalars['Date']['output']>;
  /** The date three years ago from this date. */
  readonly date3YearsBack: Maybe<Scalars['Date']['output']>;
  /** The date one year ago from this date. */
  readonly dateLastYear: Maybe<Scalars['Date']['output']>;
  /** The day of the month. */
  readonly day: Maybe<Scalars['Byte']['output']>;
  /** The day of the year. */
  readonly dayOfYear: Maybe<Scalars['Short']['output']>;
  /** The suffix for the day (e.g., "st", "nd", "rd"). */
  readonly daySuffix: Maybe<Scalars['String']['output']>;
  /** The number of the day of the week within the month. */
  readonly dowInMonth: Maybe<Scalars['Byte']['output']>;
  /** The financial month for the date. */
  readonly financialMonth: Maybe<Scalars['Int']['output']>;
  /** The financial quarter for the date. */
  readonly financialQuarter: Maybe<Scalars['Int']['output']>;
  /** The financial year for the date. */
  readonly financialYear: Maybe<Scalars['Int']['output']>;
  /** The first date of the month. */
  readonly firstDateOfMonth: Maybe<Scalars['Date']['output']>;
  /** The first date of the quarter. */
  readonly firstDateOfQuater: Maybe<Scalars['Date']['output']>;
  /** The first date of the week. */
  readonly firstDateOfWeek: Maybe<Scalars['Date']['output']>;
  /** The first date of the year. */
  readonly firstDateOfYear: Maybe<Scalars['Date']['output']>;
  /** The name of the holiday (if applicable). */
  readonly holidayName: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the date. */
  readonly id: Scalars['ID']['output'];
  /** Gets the internal identifier of the date details record. */
  readonly internalId: Scalars['Int']['output'];
  /** Indicates if the date is a holiday. */
  readonly isHoliday: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the date falls on a weekend. */
  readonly isWeekend: Maybe<Scalars['Boolean']['output']>;
  /** The last date of the month. */
  readonly lastDateOfMonth: Maybe<Scalars['Date']['output']>;
  /** The last date of the quarter. */
  readonly lastDateOfQuater: Maybe<Scalars['Date']['output']>;
  /** The last date of the week. */
  readonly lastDateOfWeek: Maybe<Scalars['Date']['output']>;
  /** The last date of the year. */
  readonly lastDateOfYear: Maybe<Scalars['Date']['output']>;
  /** The month and year in "MMYYYY" format. */
  readonly mmyyyy: Maybe<Scalars['String']['output']>;
  /** The month of the year. */
  readonly month: Maybe<Scalars['Byte']['output']>;
  /** The full name of the month (e.g., "January"). */
  readonly monthName: Maybe<Scalars['String']['output']>;
  /** The month name and year in "Month YYYY" format. */
  readonly monthNameYYYY: Maybe<Scalars['String']['output']>;
  /** The first letter of the month name (e.g., "J"). */
  readonly monthName_FirstLetter: Maybe<Scalars['String']['output']>;
  /** The abbreviated name of the month (e.g., "Jan"). */
  readonly monthName_Short: Maybe<Scalars['String']['output']>;
  /** The month and year in "Month YYYY" format (e.g., "January 2025"). */
  readonly monthYear: Maybe<Scalars['String']['output']>;
  /** The quarter of the year (1-4). */
  readonly quarter: Maybe<Scalars['Byte']['output']>;
  /** The name of the quarter (e.g., "Q1"). */
  readonly quarterName: Maybe<Scalars['String']['output']>;
  /** Any special day designation for the date. */
  readonly specialDays: Maybe<Scalars['String']['output']>;
  /** The weekday of the same date last year. */
  readonly weekDayLastYear: Maybe<Scalars['String']['output']>;
  /** The full name of the weekday (e.g., "Monday"). */
  readonly weekDayName: Maybe<Scalars['String']['output']>;
  /** The first letter of the weekday name (e.g., "M"). */
  readonly weekDayName_FirstLetter: Maybe<Scalars['String']['output']>;
  /** The abbreviated name of the weekday (e.g., "Mon"). */
  readonly weekDayName_Short: Maybe<Scalars['String']['output']>;
  /** The week number of the month. */
  readonly weekOfMonth: Maybe<Scalars['Byte']['output']>;
  /** The week number of the year. */
  readonly weekOfYear: Maybe<Scalars['Byte']['output']>;
  /** The number representing the day of the week (0 = Sunday, 1 = Monday, etc.). */
  readonly weekday: Maybe<Scalars['Byte']['output']>;
  /** The year. */
  readonly year: Maybe<Scalars['Int']['output']>;
  /** The year and month in "YYYYMM" format. */
  readonly yyyymm: Maybe<Scalars['String']['output']>;
};

export type DeleteArtworkError = BadRequestException | ConflictException | NotFoundException | UnauthorizedException;

export type DeleteArtworkFolderError = BadRequestException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for renaming a folder. */
export type DeleteArtworkFolderInput = {
  /** The identifier of the folder. */
  readonly folderId: Scalars['ID']['input'];
};

export type DeleteArtworkFolderPayload = {
  readonly __typename?: 'DeleteArtworkFolderPayload';
  readonly errors: Maybe<ReadonlyArray<DeleteArtworkFolderError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/** Input type for deleting an artwork object. */
export type DeleteArtworkInput = {
  /** The identifier of the artwork. */
  readonly id: Scalars['ID']['input'];
};

export type DeleteArtworkPayload = {
  readonly __typename?: 'DeleteArtworkPayload';
  readonly errors: Maybe<ReadonlyArray<DeleteArtworkError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type DeleteArtworkTagError = BadRequestException | ConflictException | NotFoundException | UnauthorizedException;

/** Input type for deleting an artwork tag. */
export type DeleteArtworkTagInput = {
  /** Gets or sets a value indicating whether the operation should be forcibly executed. */
  readonly force: InputMaybe<Scalars['Boolean']['input']>;
  /** The identifier of the artwork tag. */
  readonly id: Scalars['ID']['input'];
};

export type DeleteArtworkTagPayload = {
  readonly __typename?: 'DeleteArtworkTagPayload';
  readonly errors: Maybe<ReadonlyArray<DeleteArtworkTagError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type DisablesGlobalSharingError = ConflictException | NotFoundException | UnauthorizedException;

export type DisablesGlobalSharingPayload = {
  readonly __typename?: 'DisablesGlobalSharingPayload';
  readonly errors: Maybe<ReadonlyArray<DisablesGlobalSharingError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type EnableGlobalSharingError = ConflictException | NotFoundException | UnauthorizedException;

/** Input type to enable global sharing. */
export type EnableGlobalSharingInput = {
  /** The value to see if sharing needs to be force enabled. */
  readonly forceEnable: InputMaybe<Scalars['Boolean']['input']>;
  /** The securityType for the global sharing record. */
  readonly securityType: SecurityType;
};

export type EnableGlobalSharingPayload = {
  readonly __typename?: 'EnableGlobalSharingPayload';
  readonly errors: Maybe<ReadonlyArray<EnableGlobalSharingError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/** Represents an enumeration lookup. */
export type EnumLookup = Node & {
  readonly __typename?: 'EnumLookup';
  /** The code for the enumeration lookup. */
  readonly code: Scalars['String']['output'];
  /** The description of the enumeration lookup. */
  readonly description: Scalars['String']['output'];
  /** The unique identifier for the enumeration lookup. */
  readonly id: Scalars['ID']['output'];
  /** The enum lookup identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The value of the enumeration lookup. */
  readonly value: Scalars['String']['output'];
  /** The numeric value associated with this instance. */
  readonly valueNumeric: Scalars['Int']['output'];
};

export type Error = {
  readonly message: Scalars['String']['output'];
};

/** Restricts the boolean filter operations available for gateway filters. */
export type GatewayBoolOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<GatewayBoolOperationFilterInput>>;
  readonly eq: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<GatewayBoolOperationFilterInput>>;
};

/** Restricts the date filter operations available for gateway filters. */
export type GatewayDateOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<GatewayDateOperationFilterInput>>;
  readonly eq: InputMaybe<Scalars['Date']['input']>;
  readonly gt: InputMaybe<Scalars['Date']['input']>;
  readonly gte: InputMaybe<Scalars['Date']['input']>;
  readonly lt: InputMaybe<Scalars['Date']['input']>;
  readonly lte: InputMaybe<Scalars['Date']['input']>;
  readonly or: InputMaybe<ReadonlyArray<GatewayDateOperationFilterInput>>;
};

/** Restricts the decimal filter operations available for gateway filters. */
export type GatewayDecimalOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<GatewayDecimalOperationFilterInput>>;
  readonly eq: InputMaybe<Scalars['Decimal']['input']>;
  readonly gt: InputMaybe<Scalars['Decimal']['input']>;
  readonly gte: InputMaybe<Scalars['Decimal']['input']>;
  readonly lt: InputMaybe<Scalars['Decimal']['input']>;
  readonly lte: InputMaybe<Scalars['Decimal']['input']>;
  readonly or: InputMaybe<ReadonlyArray<GatewayDecimalOperationFilterInput>>;
};

export type GatewayIdentityType =
  | 'INTEGRATOR'
  | 'SERVICE'
  | 'UNKNOWN'
  | 'USER';

/** Restricts the integer filter operations available for gateway filters. */
export type GatewayIntOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<GatewayIntOperationFilterInput>>;
  readonly eq: InputMaybe<Scalars['Int']['input']>;
  readonly gt: InputMaybe<Scalars['Int']['input']>;
  readonly gte: InputMaybe<Scalars['Int']['input']>;
  readonly lt: InputMaybe<Scalars['Int']['input']>;
  readonly lte: InputMaybe<Scalars['Int']['input']>;
  readonly or: InputMaybe<ReadonlyArray<GatewayIntOperationFilterInput>>;
};

/** Restricts the string filter operations available for gateway filters. */
export type GatewayStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<GatewayStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly or: InputMaybe<ReadonlyArray<GatewayStringOperationFilterInput>>;
};

/** Represents a gender. */
export type Gender = Node & {
  readonly __typename?: 'Gender';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The gender code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the gender. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the gender. */
  readonly id: Scalars['ID']['output'];
  /** The gender identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the gender. */
  readonly modified: Scalars['DateTime']['output'];
  /** The gender name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the gender. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency checking. */
  readonly timestamp: Scalars['Long']['output'];
};

export type GenderFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<GenderFilterInput>>;
  readonly code: InputMaybe<GenderStringOperationFilterInput>;
  readonly name: InputMaybe<GatewayStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<GenderFilterInput>>;
};

/** Restricts the filter operations available when filtering suppliers. */
export type GenderStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<GenderStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<GenderStringOperationFilterInput>>;
};

export type HistoryFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<HistoryFilterInput>>;
  readonly isTopSeller: InputMaybe<BooleanOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<HistoryFilterInput>>;
};

/** Represents an inclusive branding method. */
export type InclusiveBranding = {
  readonly __typename?: 'InclusiveBranding';
  /** Gets or sets the display name associated with the object. */
  readonly displayName: Scalars['String']['output'];
  /** The unique identifier for the inclusive branding. */
  readonly id: Scalars['Int']['output'];
  /** Indicates whether this position is mutually exclusive. */
  readonly isMutuallyExclusive: Scalars['Boolean']['output'];
  /** The maximum number of colors allowed for this inclusive branding method, if applicable. */
  readonly maximumColors: Maybe<Scalars['Int']['output']>;
  /** The minimum order quantity for this inclusive branding method. */
  readonly minimumOrderQuantity: Scalars['Int']['output'];
  /** The price associated with this inclusive branding method. */
  readonly price: Maybe<Scalars['Decimal']['output']>;
  /** The print code associated with this inclusive branding method. */
  readonly printCode: Maybe<Scalars['String']['output']>;
  /** The type of inclusive branding method. */
  readonly type: Scalars['Int']['output'];
};

/** Represents an exception that is thrown when input validation fails for a specific parameter. */
export type InputValidationException = Error & {
  readonly __typename?: 'InputValidationException';
  /** Gets or sets additional data associated with the object as key-value pairs. */
  readonly additionalData: Maybe<ReadonlyArray<KeyValuePairOfStringAndString>>;
  /** Gets the error code associated with the exception. */
  readonly code: Scalars['Long']['output'];
  /** Gets the detailed error message associated with the current operation. */
  readonly errorDetail: Maybe<Scalars['String']['output']>;
  /** Gets the error message associated with the exception. */
  readonly message: Scalars['String']['output'];
  /** Gets the name of the parameter that failed validation. */
  readonly parameterName: Scalars['String']['output'];
};

/** Represents a job card. */
export type JobCard = Node & {
  readonly __typename?: 'JobCard';
  /** The associated created date. */
  readonly created: Scalars['DateTime']['output'];
  /** The identifier for the job card. */
  readonly id: Scalars['ID']['output'];
  /** The job card's identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** Indicates whether the job card is active. Active job cards are those that are currently in progress or not yet completed/cancelled. */
  readonly isActive: Scalars['Boolean']['output'];
  /**
   * Retrieves the collection of assets associated with the specified job card.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a collection of job card assets
   * associated with the specified job card, or null if no assets are found.
   */
  readonly jobCardAssets: Maybe<ReadonlyArray<JobCardAsset>>;
  /**
   * Retrieves the branding details associated with the specified job card.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the branding details for the specified
   * job card.
   */
  readonly jobCardBrandingDetail: Maybe<JobCardBrandingDetail>;
  /**
   * Retrieves the date information associated with the specified job card for the current customer.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a JobCardDate object if date information
   * is found; otherwise, null.
   */
  readonly jobCardDate: Maybe<JobCardDate>;
  /**
   * Retrieves the details of a specified job card.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a collection of  JobCardDetail objects representing the details of the specified job card.
   */
  readonly jobCardDetail: Maybe<ReadonlyArray<JobCardDetail>>;
  /** The associated job card number. */
  readonly jobCardNumber: Scalars['String']['output'];
  /**
   * Retrieves the collection of proofs associated with the specified job card.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains an enumerable collection of
   * JobCardProof objects associated with the job card, or null if no proofs are found.
   */
  readonly jobCardProofs: Maybe<ReadonlyArray<JobCardProof>>;
  /** The associated last modified date. */
  readonly lastModifiedDate: Scalars['DateTime']['output'];
  /**
   * Retrieves a sales order associated with the specified job card.
   *
   *
   * **Returns:**
   * A SalesOrder object representing the sales order associated with the job card,  or null if no matching sales order is found.
   */
  readonly salesOrder: SalesOrder;
  /**
   * Retrieves the status of the specified job card.
   *
   *
   * **Returns:**
   * The resolved JobCardStatus value for the job card, or Unknown if the
   * status cannot be resolved.
   */
  readonly status: JobCardStatus;
};

/** Represents a job card asset. */
export type JobCardAsset = Node & {
  readonly __typename?: 'JobCardAsset';
  /** The unique id of the asset. */
  readonly assetId: Scalars['String']['output'];
  /** The created date for the job card asset. */
  readonly created: Scalars['DateTime']['output'];
  /** The identifier for the job card asset. */
  readonly id: Scalars['ID']['output'];
  /** The name for the job card asset. */
  readonly name: Scalars['String']['output'];
  /**
   * Asynchronously retrieves the asset type for the specified job card asset.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the asset type of the specified job
   * card asset. Returns JobCardAssetType.Unknown if the type cannot be determined.
   */
  readonly type: JobCardAssetType;
  /** The URL for the job card asset. */
  readonly url: Maybe<Scalars['URL']['output']>;
  /** Version of the Asset. Currently on Layout Proofs only. */
  readonly version: Maybe<Scalars['Int']['output']>;
};

export type JobCardAssetType =
  | 'APPROVAL'
  | 'UNKNOWN';

/** Represents a job card branding detail. */
export type JobCardBrandingDetail = {
  readonly __typename?: 'JobCardBrandingDetail';
  /** The branding code for the job card branding detail. */
  readonly brandingCode: Scalars['String']['output'];
  /** The branding placement for the job card branding detail. */
  readonly brandingPlacement: Maybe<Scalars['String']['output']>;
  /** The branding position for the job card branding detail. */
  readonly brandingPosition: Scalars['String']['output'];
  /** The branding size height for the job card branding detail. */
  readonly brandingSizeHeight: Maybe<Scalars['Float']['output']>;
  /** The branding size width for the job card branding detail. */
  readonly brandingSizeWidth: Maybe<Scalars['Float']['output']>;
  /** The colors for the job card branding detail. */
  readonly colors: Maybe<Scalars['String']['output']>;
  /** The foil color for the job card branding detail. */
  readonly foilColor: Maybe<Scalars['String']['output']>;
  /** The logo for the job card branding detail. */
  readonly logo: Maybe<Scalars['String']['output']>;
  /** The repeat option for the job card branding detail. */
  readonly repeatOption: JobCardRepeatType;
  /** The repeat reference for the job card branding detail. */
  readonly repeatReference: Maybe<Scalars['String']['output']>;
  /** The silicone color for the job card branding detail. */
  readonly siliconeColor: Maybe<Scalars['String']['output']>;
  /** The vinyl color for the job card branding detail. */
  readonly vinylColor: Maybe<Scalars['String']['output']>;
};

/** Represents a request to change a job card, including the job card number and associated branding details. */
export type JobCardBrandingDetailInput = {
  /** The branding detail for the job card change request, which includes all necessary information for applying branding to the job card. */
  readonly brandingDetail: BrandingDetailInput;
  /** The job card number that is being changed, which uniquely identifies the job card within the system. */
  readonly jobCardNumber: Scalars['String']['input'];
};

export type JobCardChangeRequestType =
  | 'CUSTOMER_REQUEST'
  | 'INSTRUCTION_NOT_FOLLOWED';

/** Represents a job card. */
export type JobCardDate = {
  readonly __typename?: 'JobCardDate';
  /** The action date for the job card date. */
  readonly actionDate: Maybe<Scalars['Date']['output']>;
  /** The due date for the job card date. */
  readonly dueDate: Maybe<Scalars['Date']['output']>;
  /** The lead time for the job card date. */
  readonly leadTime: Maybe<Scalars['Int']['output']>;
};

/** Restricts the filter operations available when filtering job cards by date. */
export type JobCardDateTimeOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<JobCardDateTimeOperationFilterInput>>;
  readonly gte: InputMaybe<Scalars['DateTime']['input']>;
  readonly lte: InputMaybe<Scalars['DateTime']['input']>;
  readonly or: InputMaybe<ReadonlyArray<JobCardDateTimeOperationFilterInput>>;
};

/** Represents a job card detail. */
export type JobCardDetail = {
  readonly __typename?: 'JobCardDetail';
  /** The quantity for the job card detail. */
  readonly quantity: Scalars['Int']['output'];
  /** The sku for the job card detail. */
  readonly sku: Scalars['String']['output'];
};

export type JobCardFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<JobCardFilterInput>>;
  readonly created: InputMaybe<JobCardDateTimeOperationFilterInput>;
  readonly isActive: InputMaybe<GatewayBoolOperationFilterInput>;
  readonly jobCardNumber: InputMaybe<JobCardStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<JobCardFilterInput>>;
  readonly salesOrder: InputMaybe<SalesOrderFilterInput>;
  readonly status: InputMaybe<JobCardStatusEnumOperationFilterInput>;
};

/** Represents a proof of a job card, including metadata such as creation date, version, and associated options. */
export type JobCardProof = Node & {
  readonly __typename?: 'JobCardProof';
  readonly assetId: Scalars['String']['output'];
  /** The date and time when the job card proof was created. */
  readonly created: Scalars['DateTime']['output'];
  /** The identifier of the job card proof. */
  readonly id: Scalars['ID']['output'];
  /** The job card proof's identifier. */
  readonly internalId: Scalars['Int']['output'];
  /**
   * Retrieves a collection of available proof options for the specified job card.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains an enumerable collection of job card
   * proof options, or null if no options are found.
   */
  readonly jobCardProofOptions: Maybe<ReadonlyArray<JobCardProofOption>>;
  /** The number of options associated with this job card proof. This property is used to track the number of different options or variations that are linked to this proof, which is used to indicate alternate layouts. */
  readonly numberOfOptions: Scalars['Int']['output'];
  /** The URL to access the proof. */
  readonly url: Maybe<Scalars['URL']['output']>;
  /** The version of the job card proof. This property is used to track the version of the proof, which is particularly relevant for layout proofs where multiple versions may exist. It helps in managing and differentiating between different iterations of the proof as changes are made. */
  readonly version: Scalars['Int']['output'];
};

/** Represents a selectable proofing option for a job card, including page range and recommendation status. */
export type JobCardProofOption = {
  readonly __typename?: 'JobCardProofOption';
  /** Indicates whether this proofing option is recommended. This property can be used to highlight preferred proofing options to users, guiding them towards the most suitable choice. */
  readonly isRecommended: Scalars['Boolean']['output'];
  /** The option number for the proofing option. This property is used to identify and differentiate between multiple proofing options that may be available for a single job card proof. It allows users to select specific options based on their preferences or requirements when reviewing proofs. */
  readonly number: Scalars['Int']['output'];
  readonly pageRange: Scalars['String']['output'];
};

export type JobCardRepeatType =
  | 'EXACT'
  | 'LOGO'
  | 'NONE';

export type JobCardStatus =
  | 'AWAITING_APPROVAL'
  | 'AWAITING_INFO'
  | 'AWAITING_LAYOUT'
  | 'AWAITING_PAYMENT'
  | 'CANCELLED'
  | 'CLOSED'
  | 'COMPLETE'
  | 'IN_PRODUCTION'
  | 'ON_HOLD'
  | 'UNKNOWN';

/** Restricts the filter operations available when filtering job cards by status. */
export type JobCardStatusEnumOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<JobCardStatusEnumOperationFilterInput>>;
  readonly eq: InputMaybe<JobCardStatus>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<JobCardStatus>>>;
  readonly neq: InputMaybe<JobCardStatus>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<JobCardStatus>>>;
  readonly or: InputMaybe<ReadonlyArray<JobCardStatusEnumOperationFilterInput>>;
};

/** Restricts the filter operations available when filtering job cards. */
export type JobCardStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<JobCardStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<JobCardStringOperationFilterInput>>;
};

/** A connection to a list of items. */
export type JobCardsConnection = {
  readonly __typename?: 'JobCardsConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<JobCardsEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<JobCard>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type JobCardsEdge = {
  readonly __typename?: 'JobCardsEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: JobCard;
};

export type KeyValuePairOfStringAndString = {
  readonly __typename?: 'KeyValuePairOfStringAndString';
  readonly key: Scalars['String']['output'];
  readonly value: Scalars['String']['output'];
};

export type ListGenderFilterTypeFilterInput = {
  readonly all: InputMaybe<GenderFilterInput>;
  readonly any: InputMaybe<Scalars['Boolean']['input']>;
  readonly none: InputMaybe<GenderFilterInput>;
  readonly some: InputMaybe<GenderFilterInput>;
};

export type ListPriceFilterTypeFilterInput = {
  readonly all: InputMaybe<PriceFilterInput>;
  readonly any: InputMaybe<Scalars['Boolean']['input']>;
  readonly none: InputMaybe<PriceFilterInput>;
  readonly some: InputMaybe<PriceFilterInput>;
};

export type ListRegionFilterTypeFilterInput = {
  readonly all: InputMaybe<RegionFilterInput>;
  readonly any: InputMaybe<Scalars['Boolean']['input']>;
  readonly none: InputMaybe<RegionFilterInput>;
  readonly some: InputMaybe<RegionFilterInput>;
};

export type ListStockLevelFilterTypeFilterInput = {
  readonly all: InputMaybe<StockLevelFilterInput>;
  readonly any: InputMaybe<Scalars['Boolean']['input']>;
  readonly none: InputMaybe<StockLevelFilterInput>;
  readonly some: InputMaybe<StockLevelFilterInput>;
};

export type ListStockProjectionFilterTypeFilterInput = {
  readonly all: InputMaybe<StockProjectionFilterInput>;
  readonly any: InputMaybe<Scalars['Boolean']['input']>;
  readonly none: InputMaybe<StockProjectionFilterInput>;
  readonly some: InputMaybe<StockProjectionFilterInput>;
};

/** Represents a logo. */
export type Logo = {
  readonly __typename?: 'Logo';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The logo code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the logo. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the logo. */
  readonly id: Scalars['Int']['output'];
  /** The logo identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the logo. */
  readonly modified: Scalars['DateTime']['output'];
  /** The logo name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The source identifier for the logo. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
  /** The type associated with the logo. */
  readonly type: Maybe<EnumLookup>;
  /** The logo URI. */
  readonly uri: Maybe<Scalars['String']['output']>;
};

/** Represents a manufacturing region. */
export type ManufacturingRegion = Node & {
  readonly __typename?: 'ManufacturingRegion';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The manufacturing region code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the manufacturing region. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the manufacturing region. */
  readonly id: Scalars['ID']['output'];
  /** The manufacturing region identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The logo associated with the manufacturing region. */
  readonly logo: Maybe<Logo>;
  /** The last modified date and time of the manufacturing region. */
  readonly modified: Scalars['DateTime']['output'];
  /** The name of the manufacturing region. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The region associated with the manufacturing region. */
  readonly region: Maybe<Region>;
  /** The sort index for the manufacturing region. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the manufacturing region. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

export type MoveArtworkFolderError = BadRequestException | ConflictException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for moving a folder. */
export type MoveArtworkFolderInput = {
  /** The identifier of the folder. */
  readonly folderId: Scalars['ID']['input'];
  /** The new parent folder identifier. */
  readonly parentId: Scalars['ID']['input'];
};

export type MoveArtworkFolderPayload = {
  readonly __typename?: 'MoveArtworkFolderPayload';
  readonly errors: Maybe<ReadonlyArray<MoveArtworkFolderError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type MoveArtworkToFolderError = BadRequestException | ConflictException | NotFoundException | UnauthorizedException;

/** Input type for committing a new artwork. */
export type MoveArtworkToFolderInput = {
  /** The identifier of the artwork. */
  readonly artworkId: Scalars['ID']['input'];
  /** Gets the collection of tag identifiers associated with the entity. */
  readonly folderId: Scalars['ID']['input'];
};

export type MoveArtworkToFolderPayload = {
  readonly __typename?: 'MoveArtworkToFolderPayload';
  readonly errors: Maybe<ReadonlyArray<MoveArtworkToFolderError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/** Mutation for managing job cards. */
export type Mutation = {
  readonly __typename?: 'Mutation';
  /**
   * Approves a job card based on the provided input and user context.
   *
   *
   * **Returns:**
   * A FieldResult`1 containing the result of the operation. If successful, the result contains a ResultPayloadType. If errors occur, the result contains a collection of exceptions.
   */
  readonly approveJobCard: ApproveJobCardPayload;
  /**
   * Commits an artwork to the system and optionally tags it with specified identifiers.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly commitArtwork: CommitArtworkPayload;
  /**
   * Initiates the creation of an artwork session using the specified input parameters.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 which includes the created artwork session or a list of validation errors.
   */
  readonly createArtwork: CreateArtworkPayload;
  /**
   * Creates a new artwork folder using the specified input parameters.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 with the details of the created artwork folder, or a collection of
   * validation errors if the creation fails.
   */
  readonly createArtworkFolder: CreateArtworkFolderPayload;
  /**
   * Creates a new artwork tag using the specified input parameters.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1
   * which includes the created artwork tag or a list of errors if the operation fails.
   */
  readonly createArtworkTag: CreateArtworkTagPayload;
  /**
   * Deletes an artwork based on the specified input parameters.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly deleteArtwork: DeleteArtworkPayload;
  /**
   * Deletes an artwork folder specified by the input parameters.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly deleteArtworkFolder: DeleteArtworkFolderPayload;
  /**
   * Deletes an artwork tag based on the specified input parameters.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly deleteArtworkTag: DeleteArtworkTagPayload;
  /**
   * Disables global sharing for the current user context.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly disablesGlobalSharing: DisablesGlobalSharingPayload;
  /**
   * Enables global sharing for the specified security type.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly enableGlobalSharing: EnableGlobalSharingPayload;
  /**
   * Moves an artwork folder to a new parent folder.
   *
   *
   * **Returns:**
   * A FieldResult`1 containing the result of the operation or any validation errors.
   */
  readonly moveArtworkFolder: MoveArtworkFolderPayload;
  /**
   * Moves an artwork to a specified folder.
   *
   *
   * **Returns:**
   * A FieldResult`1 containing the result of the operation. If successful, the result contains a ResultPayloadType. If an error occurs, the result contains the appropriate exception.
   */
  readonly moveArtworkToFolder: MoveArtworkToFolderPayload;
  /**
   * Places a sales order or validates the order details based on the specified input.
   *
   *
   * **Returns:**
   * A field result containing the order placement payload, including order details and any warnings. If validation
   * errors occur, the result contains the relevant errors.
   */
  readonly placeOrder: PlaceOrderPayload;
  readonly requestChangeJobCard: RequestChangeJobCardPayload;
  /**
   * Revokes all sharing permissions for the current user.
   *
   *
   * **Returns:**
   * A FieldResult`1 indicating the result of the operation, including any errors
   * encountered.
   */
  readonly revokeAllShares: RevokeAllSharesPayload;
  /**
   * Revokes the sharing of an artwork identified by the specified input.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly revokeSharedArtwork: RevokeSharedArtworkPayload;
  /**
   * Revokes access to a shared folder for a specified user or group.
   *
   *
   * **Returns:**
   * A FieldResult`1 indicating the success or failure of the operation, including any
   * validation or conflict errors.
   */
  readonly revokeSharedFolder: RevokeSharedFolderPayload;
  /**
   * Shares an artwork with specified contacts and customers, allowing for access control modifications.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly shareArtwork: ShareArtworkPayload;
  /**
   * Shares a folder with specified contacts and customers, allowing for access modifications.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly shareFolder: ShareFolderPayload;
  /**
   * Tags an artwork with the specified tags using the provided artwork tag service.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly tagArtwork: TagArtworkPayload;
  /**
   * Updates the artwork details using the specified input parameters.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly updateArtwork: UpdateArtworkPayload;
  /**
   * Updates an artwork folder using the specified input parameters.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly updateArtworkFolder: UpdateArtworkFolderPayload;
  /**
   * Updates the retention indicator for the asset associated with the specified artwork.
   *
   *
   * **Returns:**
   * A successful result payload, or a mapped error result when the request fails. Returns a conflict result when the artwork has no associated asset.
   */
  readonly updateArtworkRetentionIndicator: UpdateArtworkRetentionIndicatorPayload;
  /**
   * Updates the tag information for a specified artwork.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the updated artwork tag information.
   */
  readonly updateArtworkTag: UpdateArtworkTagPayload;
  /**
   * Updates global sharing to the specified security type.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a FieldResult`1 indicating the success or failure of the operation.
   */
  readonly updateGlobalSharing: UpdateGlobalSharingPayload;
  readonly updateJobCardBrandingInfo: UpdateJobCardBrandingInfoPayload;
};


/** Mutation for managing job cards. */
export type MutationapproveJobCardArgs = {
  input: ApproveJobCardInput;
};


/** Mutation for managing job cards. */
export type MutationcommitArtworkArgs = {
  input: CommitArtworkInput;
};


/** Mutation for managing job cards. */
export type MutationcreateArtworkArgs = {
  input: CreateArtworkInput;
};


/** Mutation for managing job cards. */
export type MutationcreateArtworkFolderArgs = {
  input: CreateArtworkFolderInput;
};


/** Mutation for managing job cards. */
export type MutationcreateArtworkTagArgs = {
  input: CreateArtworkTagInput;
};


/** Mutation for managing job cards. */
export type MutationdeleteArtworkArgs = {
  input: DeleteArtworkInput;
};


/** Mutation for managing job cards. */
export type MutationdeleteArtworkFolderArgs = {
  input: DeleteArtworkFolderInput;
};


/** Mutation for managing job cards. */
export type MutationdeleteArtworkTagArgs = {
  input: DeleteArtworkTagInput;
};


/** Mutation for managing job cards. */
export type MutationenableGlobalSharingArgs = {
  input: EnableGlobalSharingInput;
};


/** Mutation for managing job cards. */
export type MutationmoveArtworkFolderArgs = {
  input: MoveArtworkFolderInput;
};


/** Mutation for managing job cards. */
export type MutationmoveArtworkToFolderArgs = {
  input: MoveArtworkToFolderInput;
};


/** Mutation for managing job cards. */
export type MutationplaceOrderArgs = {
  input: PlaceOrderInput;
};


/** Mutation for managing job cards. */
export type MutationrequestChangeJobCardArgs = {
  input: RequestChangeJobCardInput;
};


/** Mutation for managing job cards. */
export type MutationrevokeSharedArtworkArgs = {
  input: RevokeSharedArtworkInput;
};


/** Mutation for managing job cards. */
export type MutationrevokeSharedFolderArgs = {
  input: RevokeSharedFolderInput;
};


/** Mutation for managing job cards. */
export type MutationshareArtworkArgs = {
  input: ShareArtworkInput;
};


/** Mutation for managing job cards. */
export type MutationshareFolderArgs = {
  input: ShareFolderInput;
};


/** Mutation for managing job cards. */
export type MutationtagArtworkArgs = {
  input: TagArtworkInput;
};


/** Mutation for managing job cards. */
export type MutationupdateArtworkArgs = {
  input: UpdateArtworkInput;
};


/** Mutation for managing job cards. */
export type MutationupdateArtworkFolderArgs = {
  input: UpdateArtworkFolderInput;
};


/** Mutation for managing job cards. */
export type MutationupdateArtworkRetentionIndicatorArgs = {
  input: UpdateArtworkRetentionIndicatorInput;
};


/** Mutation for managing job cards. */
export type MutationupdateArtworkTagArgs = {
  input: UpdateArtworkTagInput;
};


/** Mutation for managing job cards. */
export type MutationupdateGlobalSharingArgs = {
  input: UpdateGlobalSharingInput;
};


/** Mutation for managing job cards. */
export type MutationupdateJobCardBrandingInfoArgs = {
  input: UpdateJobCardBrandingInfoInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  readonly id: Scalars['ID']['output'];
};

/** Represents an exception that is thrown when a requested resource or record cannot be found. */
export type NotFoundException = Error & {
  readonly __typename?: 'NotFoundException';
  /** Gets or sets additional data associated with the object as key-value pairs. */
  readonly additionalData: Maybe<ReadonlyArray<KeyValuePairOfStringAndString>>;
  /** Gets the error code associated with the exception. */
  readonly code: Scalars['Long']['output'];
  /** Gets the detailed error message associated with the current operation. */
  readonly errorDetail: Maybe<Scalars['String']['output']>;
  /** Gets the error message associated with the exception. */
  readonly message: Scalars['String']['output'];
};

export type OrderBrandingColorType =
  | 'HEX'
  | 'MARATHON'
  | 'NONE'
  | 'PANTONE';

/** Represents the details of branding associated with an order, including pricing, setup charges, and lead times. */
export type OrderBrandingDetail = {
  readonly __typename?: 'OrderBrandingDetail';
  /** The branding code that identifies the specific branding applied to the order. */
  readonly brandingCode: Scalars['String']['output'];
  /** The branding position code according to the branding specification, which indicates where the branding is applied. */
  readonly brandingPosition: Scalars['String']['output'];
  /** The unit price for the branding, excluding tax, which is the cost per branded item. */
  readonly brandingUnitPriceExcl: Scalars['Float']['output'];
  /** The description of the branding, providing additional context or details about the branding applied. */
  readonly description: Scalars['String']['output'];
  /** The DYE charge for the branding, excluding tax, if applicable. */
  readonly dyeChargeExcl: Maybe<Scalars['Float']['output']>;
  /** The name of the DYE charge associated with the branding, if applicable. */
  readonly dyeChargeName: Maybe<Scalars['String']['output']>;
  /**
   * The Print Quantity for the branding, indicating how many items/brandings are branded.
   * Note: For a 2 sided product, this is the total quantity branded across both sides.
   */
  readonly printQuantity: Scalars['Int']['output'];
  /** The setup charge code associated with the branding, which indicates any additional setup fees. */
  readonly setupChargeCode: Maybe<Scalars['String']['output']>;
  /** The setup charge for the branding, excluding tax, which is a one-time fee for setting up the branding. */
  readonly setupChargeExcl: Maybe<Scalars['Float']['output']>;
};

export type OrderBrandingLogoPositionType =
  | 'BOTTOM_CENTER'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'MIDDLE_CENTER'
  | 'MIDDLE_LEFT'
  | 'MIDDLE_RIGHT'
  | 'TOP_CENTER'
  | 'TOP_LEFT'
  | 'TOP_RIGHT';

export type OrderBrandingLogoSizeType =
  | 'HEIGHT'
  | 'WIDTH';

/** Represents detailed information about an order collection, including the associated branch code. */
export type OrderCollectionDetailInput = {
  /** Represents the code of the collection branch associated with the order. */
  readonly branchCode: InputMaybe<Scalars['String']['input']>;
  /** Represents the type of collection for the order, indicating where and how the order will be collected. */
  readonly collectionType: OrderCollectionType;
};

export type OrderCollectionType =
  | 'BRANCH_DELIVERY_COLLECTION'
  | 'COLLECTION_HEAD_OFFICE'
  | 'COURIER';

/**
 * Represents the contact details associated with an order, including optional notification and branded order contact
 * information.
 */
export type OrderContactDetailInput = {
  /** The contact information for a branded logo24 order, which may include details such as name, email, and phone number. */
  readonly logo24: InputMaybe<OrderContactInput>;
  /** The primary contact for the order, which may include details such as name, email, and phone number. */
  readonly notifications: OrderContactNotificationDetailInput;
};

/** Represents the contact information associated with an order. */
export type OrderContactInput = {
  /** The contact number of the contact person for the order. */
  readonly contactNumber: InputMaybe<Scalars['String']['input']>;
  /** The email address of the contact person for the order. */
  readonly email: Scalars['String']['input'];
  /** The first name of the contact person for the order. */
  readonly firstName: Scalars['String']['input'];
  /** The last name of the contact person for the order. */
  readonly lastName: Scalars['String']['input'];
};

/**
 * Represents the details of notification contacts for an order, including the primary order contact and the branding
 * contact.
 */
export type OrderContactNotificationDetailInput = {
  /** The contact who will receive notifications about the branding associated with the order. */
  readonly branding: InputMaybe<OrderContactInput>;
  /** The contact who will receive notifications about the order. */
  readonly order: OrderContactInput;
};

export type OrderErrorType =
  | 'ACCOUNT'
  | 'CATALOGUE'
  | 'REQUEST'
  | 'SERVICE'
  | 'UNKNOWN';

/**
 * Represents the details of an order group, including its unique identifier, associated items, and optional branding
 * information.
 */
export type OrderGroupDetailInput = {
  /** The branding details associated with the order group, which may include logos, repeat branding, and other metadata. */
  readonly branding: InputMaybe<ReadonlyArray<BrandingDetailInput>>;
  /**
   * The unique identifier for the order group, which is used to match the response to the request.
   * The has no special meaning other than to ensure that the response can be matched to the request.
   */
  readonly id: Scalars['String']['input'];
  /** The items included in the order group, each represented by an instance of OrderGroupItemDetail. */
  readonly items: ReadonlyArray<OrderGroupItemDetailInput>;
};

/**
 * Represents the details of a grouped item within an order, including its unique identifier, associated items, and
 * optional branding information.
 */
export type OrderGroupItemDetail = {
  readonly __typename?: 'OrderGroupItemDetail';
  /** The list of branding details associated with the order, if applicable. */
  readonly branding: ReadonlyArray<OrderBrandingDetail>;
  /** The unique identifier for the item within the order, which is used to reference back to the requested grouping. */
  readonly id: Scalars['String']['output'];
  /** The list of order detail items, which includes individual products and their associated details. */
  readonly items: ReadonlyArray<OrderItemDetail>;
};

/**
 * Represents the details of an item within an order group, including its SKU, quantity, and optional price
 * information.
 */
export type OrderGroupItemDetailInput = {
  /**
   * The price of the item, which is the cost per unit of the SKU.
   * Optional, as it will only be used to generate warnings if the price input differed from the expected price.
   */
  readonly price: InputMaybe<Scalars['Float']['input']>;
  /** The unit quantity of the item, representing how many units of the SKU are included in the order. */
  readonly quantity: Scalars['Long']['input'];
  /** The SKU (Stock Keeping Unit) identifier for the item, which is used to uniquely identify the product. */
  readonly sku: Scalars['String']['input'];
};

/**
 * Represents a created order, containing details about the order's unique identifiers,  pricing information, and
 * associated order details.
 */
export type OrderItem = {
  readonly __typename?: 'OrderItem';
  /** The list of order group items, which includes individual products and their associated details. */
  readonly details: ReadonlyArray<OrderGroupItemDetail>;
  /** The Production Lead Time in Days for the order, if applicable. */
  readonly leadTimeInDays: Maybe<Scalars['Int']['output']>;
  /**
   * The Warehouse Lead Time in Hours for the order, if applicable.
   * Note: This is for future use and is not currently populated.
   */
  readonly leadTimeInHours: Maybe<Scalars['Int']['output']>;
  /** The order date, which indicates when the order was placed. */
  readonly orderDate: Scalars['Date']['output'];
  /** The unique identifier for the order, which is used to reference back to the requested order. */
  readonly orderNumber: Scalars['String']['output'];
  /** The unique identifier for the order, which is used to tie the requested order to the processed order. */
  readonly salesOrderNumber: Maybe<Scalars['String']['output']>;
  /** The total price for the order, excluding tax, which is the sum of all individual item totals. */
  readonly totalExcl: Scalars['Float']['output'];
};

/**
 * Represents the details of an item within an order, including its identifier, product information, pricing, and tax
 * details.
 */
export type OrderItemDetail = {
  readonly __typename?: 'OrderItemDetail';
  /** The name of the item, which is typically the product name or description. */
  readonly name: Scalars['String']['output'];
  /** The quantity of the item, representing how many units of the SKU are included in the order. */
  readonly quantity: Scalars['Int']['output'];
  /** The SKU (Stock Keeping Unit) identifier for the item, which is used to uniquely identify the product. */
  readonly sku: Scalars['String']['output'];
  /** The unit price of the item, which is the cost per unit of the SKU. */
  readonly unitPrice: Scalars['Float']['output'];
};

/** Represents configuration options for processing an order. */
export type OrderOptionsInput = {
  /** Indicates if Inclusive Branding should be applied to the order. */
  readonly applyInclusiveBranding: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates the type of order to process. */
  readonly orderType: OrderType;
  /** Indicates if the order should be processed or just validated. */
  readonly validateOnly: Scalars['Boolean']['input'];
};

export type OrderType =
  | 'DELIVERY'
  | 'LOGO24'
  | 'STANDARD';

/** Represents a warning associated with an order, including a code for categorization and a detailed message. */
export type OrderWarning = {
  readonly __typename?: 'OrderWarning';
  /** The code that identifies the type of warning, which can be used for categorization or filtering. */
  readonly code: Scalars['String']['output'];
  /** The warning message that provides details about the issue or condition that needs attention. */
  readonly message: Scalars['String']['output'];
  /** The type of warning that has occurred. */
  readonly warningType: OrderWarningType;
};

export type OrderWarningType =
  | 'NONE'
  | 'PRICE_DISCREPANCY';

/** Represents a logo library owner. */
export type Owner = {
  readonly __typename?: 'Owner';
  /** The associated customer contact. */
  readonly contact: OwnerContact;
  /** The associated customer. */
  readonly customer: OwnerCustomer;
};

/** Represents a logo library owner customer contact. */
export type OwnerContact = {
  readonly __typename?: 'OwnerContact';
  /** The contact code. */
  readonly code: Scalars['UUID']['output'];
  /** The contact email address. */
  readonly emailAddress: Scalars['String']['output'];
};

/** Represents a logo library owner customer. */
export type OwnerCustomer = {
  readonly __typename?: 'OwnerCustomer';
  /** The customer code. */
  readonly code: Scalars['String']['output'];
  /** The customer name. */
  readonly name: Scalars['String']['output'];
};

/** Represents the packaging details of a product. */
export type Packaging = {
  readonly __typename?: 'Packaging';
  /** The packaging comment */
  readonly comment: Maybe<Scalars['String']['output']>;
  /** The conversion quantity for the packaging. */
  readonly conversionQuantity: Scalars['Int']['output'];
  /** The creation date and time of the packaging. */
  readonly created: Scalars['DateTime']['output'];
  /** The Unit of Measure associated with the Packaging Unit. */
  readonly dimUnitOfMeasure: Maybe<UnitOfMeasure>;
  /** The height of the packaging. */
  readonly height: Scalars['Float']['output'];
  /** The tier identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The length of the packaging. */
  readonly length: Scalars['Float']['output'];
  /** The last modified date and time of the packaging. */
  readonly modified: Scalars['DateTime']['output'];
  /** The Type of Packaging (Eaches, Cartons, Pallets). */
  readonly packagingType: Maybe<EnumLookup>;
  /** The source identifier for the packaging. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for the packaging. */
  readonly timestamp: Scalars['Long']['output'];
  /** The weight of the packaging. */
  readonly weight: Scalars['Float']['output'];
  /** The Unit of Measure associated with the Packaging Unit's Weight. */
  readonly weightDimUnitOfMeasure: Maybe<UnitOfMeasure>;
  /** The width of the packaging. */
  readonly width: Scalars['Float']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  readonly __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  readonly hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  readonly hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor: Maybe<Scalars['String']['output']>;
};

/** Represents a payment term style. */
export type PaymentTerm = Node & {
  readonly __typename?: 'PaymentTerm';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The code or the payment term. */
  readonly code: Scalars['String']['output'];
  /** The creation date and time of the payment term. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the payment term. */
  readonly id: Scalars['ID']['output'];
  /**
   * Gets the internal identifier of the payment term.
   *
   *
   * **Returns:**
   * The internal identifier of the payment term.
   */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the payment term. */
  readonly modified: Scalars['DateTime']['output'];
  /** The name of the payment term. */
  readonly name: Scalars['String']['output'];
  /** The region associated with the payment term. */
  readonly region: Maybe<Region>;
  /** The source identifier for the payment term. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for the payment term. */
  readonly timestamp: Scalars['Long']['output'];
};

export type PaymentType =
  | 'NONE';

export type PlaceOrderError = BadRequestException | ConflictException | InputValidationException | ServerError;

/** Represents the input data required to create or process an order. */
export type PlaceOrderInput = {
  /** The collection detail for the order, which includes information about the collection point. */
  readonly collection: OrderCollectionDetailInput;
  /** The primary contact for the order, which includes details such as contact email and name. */
  readonly contact: OrderContactDetailInput;
  /** The order detail content, including products and their branding details. */
  readonly details: ReadonlyArray<OrderGroupDetailInput>;
  /** The options to control the processing of the order, such as whether to validate or process the order immediately. */
  readonly options: OrderOptionsInput;
  /** The unique identifier for the order, which is used to tie the requested order to the processed order. */
  readonly orderNumber: Scalars['String']['input'];
};

export type PlaceOrderPayload = {
  readonly __typename?: 'PlaceOrderPayload';
  readonly errors: Maybe<ReadonlyArray<PlaceOrderError>>;
  readonly placeOrderPayloadType: Maybe<PlaceOrderPayloadType>;
};

/**
 * Represents the result of an order processing operation, including successfully processed orders and any associated
 * warnings.
 */
export type PlaceOrderPayloadType = {
  readonly __typename?: 'PlaceOrderPayloadType';
  /** The list of orders that were successfully processed, each containing details about the order. */
  readonly orders: ReadonlyArray<OrderItem>;
  /** The list of warnings associated with the order processing, which may include issues or notes that need to be addressed. */
  readonly warnings: ReadonlyArray<OrderWarning>;
};

/** Represents the cost details for a product. */
export type Price = {
  readonly __typename?: 'Price';
  /** The creation date and time. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the cost. */
  readonly id: Scalars['Int']['output'];
  /** The last modified date and time. */
  readonly modified: Scalars['DateTime']['output'];
  /** The source identifier. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp. */
  readonly timestamp: Scalars['Long']['output'];
  /** The value of the price. */
  readonly value: Scalars['Decimal']['output'];
};

export type PriceFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<PriceFilterInput>>;
  readonly or: InputMaybe<ReadonlyArray<PriceFilterInput>>;
  readonly region: InputMaybe<RegionFilterInput>;
  readonly tier: InputMaybe<TierFilterInput>;
  readonly value: InputMaybe<GatewayDecimalOperationFilterInput>;
};

/** Represents a product style. */
export type Product = Node & {
  readonly __typename?: 'Product';
  /**
   * Retrieves the list of attributes associated with the specified product variant.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a list of product attributes for the
   * specified product, or null if no attributes are found.
   */
  readonly attributes: Maybe<ReadonlyArray<ProductAttribute>>;
  /** The creation date and time of the product. */
  readonly created: Scalars['DateTime']['output'];
  /**
   * Retrieves the default e-commerce details for a specified product.
   *
   *
   * **Returns:**
   * A ProductECommerceDetail object representing the e-commerce details of the product,  or null if no preferences are available.
   */
  readonly defaultECommerceDetail: Maybe<ProductECommerceDetail>;
  /**
   * Retrieves the e-commerce details for a product based on the specified color segment.
   *
   *
   * **Returns:**
   * A ProductECommerceDetail object containing the e-commerce details for the product and color segment,
   * or null if no matching details are found.
   */
  readonly eCommerceDetailByColor: Maybe<ProductECommerceDetail>;
  /**
   * Retrieves the gender associated with the specified product, if available.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the gender associated with the product,
   * or null if the product does not have a gender.
   */
  readonly gender: Maybe<Gender>;
  /** The unique identifier for the product. */
  readonly id: Scalars['ID']['output'];
  /**
   * Gets the internal identifier of the product.
   *
   *
   * **Returns:**
   * The internal identifier of the product.
   */
  readonly internalId: Scalars['Int']['output'];
  /** The introduction date of the product. */
  readonly introductionDate: Maybe<Scalars['Date']['output']>;
  /** Gets or sets a value indicating whether the product is active. */
  readonly isActive: Scalars['Boolean']['output'];
  /** Indication if the product is continuing or not. */
  readonly isContinuing: Scalars['Boolean']['output'];
  /** Gets or sets a value indicating whether the product is made to order. */
  readonly isMadeToOrder: Scalars['Boolean']['output'];
  /** Gets or sets a value indicating whether the product is physical. */
  readonly isPhysical: Scalars['Boolean']['output'];
  /**
   * Retrieves the collection of matching styles for the specified product.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a collection of matching styles for the
   * product, or null if no matching styles are found.
   */
  readonly matchingStyles: Maybe<ReadonlyArray<ProductMatchingStyle>>;
  /** The last modified date and time of the product. */
  readonly modified: Scalars['DateTime']['output'];
  /** The name of the product. */
  readonly name: Scalars['String']['output'];
  /**
   * Retrieves the collection of assets associated with the specified product.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains an enumerable collection of product
   * assets associated with the specified product.
   */
  readonly productAssets: ReadonlyArray<ProductAsset>;
  /**
   * Retrieves the brand information for a specified product.
   *
   *
   * **Returns:**
   * A ProductBrand object representing the brand of the product, or null if the product
   * does not have a brand.
   */
  readonly productBrand: Maybe<ProductBrand>;
  /**
   * Retrieves the collection of media items associated with the specified product.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains an enumerable collection of product
   * media items for the specified product. The collection is empty if no media items are found.
   */
  readonly productMedia: ReadonlyArray<ProductMedia>;
  /** The sold-as style code of the product. */
  readonly soldAsStyleCode: Scalars['String']['output'];
  /** The source identifier for the product. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /**
   * Gets the stock level of the product.
   *
   *
   * **Returns:**
   * The stock level of the product.
   */
  readonly stockLevel: Maybe<StockLevel>;
  /** The style code of the product. */
  readonly styleCode: Scalars['String']['output'];
  /** The timestamp for the product. */
  readonly timestamp: Scalars['Long']['output'];
  /**
   * Retrieves the product type for the specified product using the provided lookup service.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the product type if found; otherwise,
   * Unknown.
   */
  readonly type: ProductType;
  /**
   * Gets the variants associated with the product.
   *
   *
   * **Returns:**
   * A collection of variants associated with the product.
   */
  readonly variants: ReadonlyArray<Variant>;
};


/** Represents a product style. */
export type ProductattributesArgs = {
  where: InputMaybe<ProductAttributeFilterInput>;
};


/** Represents a product style. */
export type ProducteCommerceDetailByColorArgs = {
  segmentColorCode: InputMaybe<Scalars['String']['input']>;
  segmentColorId: InputMaybe<Scalars['ID']['input']>;
};


/** Represents a product style. */
export type ProductmatchingStylesArgs = {
  where: InputMaybe<ProductMatchingStyleFilterInput>;
};


/** Represents a product style. */
export type ProductproductAssetsArgs = {
  where: InputMaybe<ProductAssetFilterInput>;
};


/** Represents a product style. */
export type ProductproductMediaArgs = {
  where: InputMaybe<ProductImageFilterInput>;
};

/** Represents a asset associated with a catalog item. */
export type ProductAsset = {
  readonly __typename?: 'ProductAsset';
  /**
   * Retrieves the asset type for the specified product asset using the provided lookup service.
   *
   *
   * **Returns:**
   * A value of the ProductAssetType enumeration representing the asset type. Returns ProductAssetType.Unknown if the
   * type cannot be resolved.
   */
  readonly type: ProductAssetType;
  /**
   * Resolves the absolute URL for the specified product asset using the configured asset service and cache base URL.
   *
   *
   * **Returns:**
   * A URI representing the resolved asset URL if successful; otherwise, null if the asset does not exist, the base URL
   * is not configured, or the asset URI is invalid.
   */
  readonly url: Maybe<Scalars['URL']['output']>;
};

export type ProductAssetFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductAssetFilterInput>>;
  readonly or: InputMaybe<ReadonlyArray<ProductAssetFilterInput>>;
  readonly type: InputMaybe<ProductAssetTypeEnumOperationFilterInput>;
};

export type ProductAssetType =
  | 'BRANDING_GUIDE_LOGO24'
  | 'BRANDING_GUIDE_SIMPLE'
  | 'BRANDING_GUIDE_STANDARD'
  | 'BRANDING_LINE_DRAWING'
  | 'BRANDING_TEMPLATE';

/** Restricts the filter operations available when filtering by product asset type. */
export type ProductAssetTypeEnumOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductAssetTypeEnumOperationFilterInput>>;
  readonly eq: InputMaybe<ProductAssetType>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<ProductAssetType>>>;
  readonly neq: InputMaybe<ProductAssetType>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<ProductAssetType>>>;
  readonly or: InputMaybe<ReadonlyArray<ProductAssetTypeEnumOperationFilterInput>>;
};

/** Represents the attribute details for a product. */
export type ProductAttribute = {
  readonly __typename?: 'ProductAttribute';
  /** Gets or sets the data type associated with the attribute. */
  readonly datatype: Maybe<Scalars['String']['output']>;
  /** Gets or sets the grouping for the attribute. */
  readonly grouping: Maybe<Scalars['String']['output']>;
  /** The product attribute identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** Gets or sets the name of the attribute associated with the entity. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** Gets or sets the title of the attribute. */
  readonly title: Maybe<Scalars['String']['output']>;
  /** Gets or sets the numeric value associated with the property. */
  readonly valueNumeric: Maybe<Scalars['Decimal']['output']>;
  /** Gets or sets the text value associated with the property. */
  readonly valueText: Maybe<Scalars['String']['output']>;
};

export type ProductAttributeFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductAttributeFilterInput>>;
  readonly attributeTemplate: InputMaybe<ProductAttributeTemplateFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<ProductAttributeFilterInput>>;
};

export type ProductAttributeTemplateFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductAttributeTemplateFilterInput>>;
  readonly attributeDatatype: InputMaybe<GatewayStringOperationFilterInput>;
  readonly attributeGrouping: InputMaybe<GatewayStringOperationFilterInput>;
  readonly name: InputMaybe<GatewayStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<ProductAttributeTemplateFilterInput>>;
};

/** Represents a product brand. */
export type ProductBrand = Node & {
  readonly __typename?: 'ProductBrand';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The product brand code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the product brand. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the product brand. */
  readonly id: Scalars['ID']['output'];
  /** The product brand identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The logo associated with the product brand. */
  readonly logo: Maybe<Logo>;
  /** The last modified date and time of the product brand. */
  readonly modified: Scalars['DateTime']['output'];
  /** The product brand name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the product brand. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the product brand. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents a product category. */
export type ProductCategory = Node & {
  readonly __typename?: 'ProductCategory';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The child categories associated with the product category. */
  readonly childCategories: ReadonlyArray<ProductCategory>;
  /** The category code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the product category. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the product category. */
  readonly id: Scalars['ID']['output'];
  /** The product category identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the product category. */
  readonly modified: Scalars['DateTime']['output'];
  /** The product category name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The parent category associated with the product category. */
  readonly parentCategory: Maybe<ProductCategory>;
  /**
   * The path of the product category.
   *
   *
   * **Returns:**
   * The path of the product category.
   */
  readonly path: Scalars['String']['output'];
  /** The sort index for the product category. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the product category. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

export type ProductClassFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductClassFilterInput>>;
  readonly code: InputMaybe<ProductClassStringOperationFilterInput>;
  readonly name: InputMaybe<ProductClassStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<ProductClassFilterInput>>;
};

/** Restricts the filter operations available when filtering suppliers. */
export type ProductClassStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductClassStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly neq: InputMaybe<Scalars['String']['input']>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<ProductClassStringOperationFilterInput>>;
};

/**
 * Represents the e-commerce details of a product, including metadata such as timestamps,  web-friendly name, and
 * description.
 */
export type ProductECommerceDetail = {
  readonly __typename?: 'ProductECommerceDetail';
  /**
   * Retrieves the behavior associated with the specified product e-commerce detail.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the behavior associated with the
   * specified product e-commerce detail.
   */
  readonly behavior: Behavior;
  /**
   * Retrieves a collection of companion products for the specified e-commerce product detail.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The result contains an enumerable collection of companion
   * products. The collection may be empty if no companion products are found.
   */
  readonly companionProducts: ReadonlyArray<Product>;
  /** The date and time when the entity was created. */
  readonly created: Scalars['DateTime']['output'];
  /** The tag identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The date and time when the entity was last modified. */
  readonly modified: Scalars['DateTime']['output'];
  /** The web friendly name of the Product. */
  readonly name: Maybe<Scalars['String']['output']>;
  /**
   * Retrieves the promotion details for the specified product.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the promotion details associated with
   * the specified product.
   */
  readonly promotion: Promotion;
  /**
   * Retrieves a collection of products that are related to the specified e-commerce product detail.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The result contains an enumerable collection of related
   * products. The collection may be empty if no related products are found.
   */
  readonly relatedProducts: ReadonlyArray<Product>;
  /**
   * Retrieves the segment color associated with the specified product.
   *
   *
   * **Returns:**
   * A CancellationToken) object representing the segment color associated with the product,  or null if the product does not have an associated segment color.
   */
  readonly segmentColor: Maybe<SegmentColor>;
  /** The timestamp for the product web preferences. */
  readonly timestamp: Scalars['Long']['output'];
};

export type ProductFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductFilterInput>>;
  readonly gender: InputMaybe<ListGenderFilterTypeFilterInput>;
  readonly name: InputMaybe<ProductStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<ProductFilterInput>>;
  readonly productClass: InputMaybe<ProductClassFilterInput>;
  readonly regions: InputMaybe<ListRegionFilterTypeFilterInput>;
  readonly soldAsStyleCode: InputMaybe<ProductStringOperationFilterInput>;
  readonly styleCode: InputMaybe<ProductStringOperationFilterInput>;
  readonly type: InputMaybe<ProductTypeOperationFilterInput>;
};

export type ProductImageDimensionTemplate =
  | 'L_260_250'
  | 'M_270_150'
  | 'ORIGINAL_HIGH_RES'
  | 'S_151_141'
  | 'WEB_OPTIMIZED'
  | 'XL_460_350'
  | 'XS_46_45';

export type ProductImageFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductImageFilterInput>>;
  readonly mediaType: InputMaybe<ProductMediaTypeEnumOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<ProductImageFilterInput>>;
  readonly product: InputMaybe<ProductFilterInput>;
  readonly segmentColor: InputMaybe<SegmentColorFilterInput>;
};

export type ProductImageSource =
  | 'EXTERNAL'
  | 'INTERNAL';

/** Represents a product item group. */
export type ProductItemGroup = Node & {
  readonly __typename?: 'ProductItemGroup';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The product item group code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the product item group. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the product item group. */
  readonly id: Scalars['ID']['output'];
  /** The product item group identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the product item group. */
  readonly modified: Scalars['DateTime']['output'];
  /** The product item group name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the product item group. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the product item group. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents a matching style relationship for a product. */
export type ProductMatchingStyle = {
  readonly __typename?: 'ProductMatchingStyle';
  /**
   * Retrieves the related product that this matching style points to.
   *
   *
   * **Returns:**
   * The related product referenced by MatchingStyleId, or null if not found.
   */
  readonly matchingProduct: Maybe<Product>;
  /**
   * Asynchronously retrieves the matching style type for the specified product matching style.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the matching style type for the
   * specified product matching style. Returns ProductMatchingStyleType.Unknown if the type cannot be determined.
   */
  readonly type: ProductMatchingStyleType;
};

export type ProductMatchingStyleFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductMatchingStyleFilterInput>>;
  readonly or: InputMaybe<ReadonlyArray<ProductMatchingStyleFilterInput>>;
  readonly type: InputMaybe<ProductMatchingStyleTypeEnumOperationFilterInput>;
};

export type ProductMatchingStyleType =
  | 'GENDER';

/** Restricts the filter operations available when filtering by product matching style type. */
export type ProductMatchingStyleTypeEnumOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductMatchingStyleTypeEnumOperationFilterInput>>;
  readonly eq: InputMaybe<ProductMatchingStyleType>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<ProductMatchingStyleType>>>;
  readonly neq: InputMaybe<ProductMatchingStyleType>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<ProductMatchingStyleType>>>;
  readonly or: InputMaybe<ReadonlyArray<ProductMatchingStyleTypeEnumOperationFilterInput>>;
};

/** Represents a matching style relationship for a product. */
export type ProductMatchingStyleVariant = {
  readonly __typename?: 'ProductMatchingStyleVariant';
  /**
   * Asynchronously retrieves the product that matches the specified style variant.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the matching product if found;
   * otherwise, null.
   */
  readonly matchingProduct: Maybe<Product>;
  /**
   * Asynchronously retrieves the variant that matches the specified product matching style.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the matching variant if found;
   * otherwise, null.
   */
  readonly matchingVariant: Maybe<Variant>;
  /**
   * Asynchronously retrieves the matching style type for the specified product matching style variant.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the matching style type for the
   * specified variant, or ProductMatchingStyleType.Unknown if the type cannot be determined.
   */
  readonly type: ProductMatchingStyleType;
};

export type ProductMatchingStyleVariantFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductMatchingStyleVariantFilterInput>>;
  readonly or: InputMaybe<ReadonlyArray<ProductMatchingStyleVariantFilterInput>>;
  readonly type: InputMaybe<ProductMatchingStyleTypeEnumOperationFilterInput>;
};

/** Represents a media item associated with a product, including its identifying name and related metadata. */
export type ProductMedia = Node & {
  readonly __typename?: 'ProductMedia';
  /**
   * Retrieves all available asset URLs for the specified product media, including all supported image dimension
   * templates or the video template as applicable.
   *
   *
   * **Returns:**
   * A collection of URIs representing the asset URLs for each supported dimension template, or null if the media type
   * cannot be resolved.
   */
  readonly allUrlTemplateDimensions: Maybe<ReadonlyArray<Scalars['URL']['output']>>;
  /** Gets or sets the timestamp indicating when this media item was created. */
  readonly created: Scalars['DateTime']['output'];
  /** Gets or sets the unique identifier for the entity. */
  readonly id: Scalars['ID']['output'];
  /**
   * Asynchronously retrieves the media type for the specified product media.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the resolved media type for the product
   * media, or ProductMediaType.None if the type cannot be determined.
   */
  readonly mediaType: ProductMediaType;
  /**
   * Asynchronously retrieves the MIME type string associated with the specified product media.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the MIME type string if available;
   * otherwise, null.
   */
  readonly mimeType: Maybe<Scalars['String']['output']>;
  /** Gets or sets the timestamp indicating when this media item was last modified. */
  readonly modified: Scalars['DateTime']['output'];
  /** Gets or sets the name associated with this instance. */
  readonly name: Scalars['String']['output'];
  /**
   * Asynchronously resolves the absolute URL for the specified product media asset, applying the appropriate dimension
   * template and asset options.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the absolute URI of the product media
   * asset, or null if the media type cannot be resolved.
   */
  readonly url: Maybe<Scalars['URL']['output']>;
};


/** Represents a media item associated with a product, including its identifying name and related metadata. */
export type ProductMediaallUrlTemplateDimensionsArgs = {
  productImageSource: InputMaybe<ProductImageSource>;
};


/** Represents a media item associated with a product, including its identifying name and related metadata. */
export type ProductMediaurlArgs = {
  productImageDimensionTemplate: InputMaybe<ProductImageDimensionTemplate>;
  productImageSource: InputMaybe<ProductImageSource>;
};

export type ProductMediaType =
  | 'ADDITIONAL'
  | 'HERO'
  | 'VARIANT'
  | 'VARIANT_HERO'
  | 'VIDEO';

/** Restricts the filter operations available when filtering by product media type. */
export type ProductMediaTypeEnumOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductMediaTypeEnumOperationFilterInput>>;
  readonly eq: InputMaybe<ProductMediaType>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<ProductMediaType>>>;
  readonly neq: InputMaybe<ProductMediaType>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<ProductMediaType>>>;
  readonly or: InputMaybe<ReadonlyArray<ProductMediaTypeEnumOperationFilterInput>>;
};

/** A connection to a list of items. */
export type ProductMediasConnection = {
  readonly __typename?: 'ProductMediasConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<ProductMediasEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<ProductMedia>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ProductMediasEdge = {
  readonly __typename?: 'ProductMediasEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: ProductMedia;
};

/** Represents a component variant within a giftset, including its relationship metadata. */
export type ProductSetContent = {
  readonly __typename?: 'ProductSetContent';
  /** Indicates whether the component is automatically added. */
  readonly isAutoAddition: Scalars['Boolean']['output'];
  /** Indicates whether the component is brandable. */
  readonly isBrandable: Scalars['Boolean']['output'];
  /** Indicates whether the component is included in stock level calculations. */
  readonly isIncludedInStockLevel: Scalars['Boolean']['output'];
  /** Indicates whether the component is manufactured. */
  readonly isManufactured: Scalars['Boolean']['output'];
  /** Indicates whether the component is priced on the highest variant. */
  readonly isPricedOnHighestVariant: Scalars['Boolean']['output'];
  /** Indicates whether the component is visible on orders. */
  readonly isVisibleOnOrder: Scalars['Boolean']['output'];
  /** Indicates whether the component is visible on quotes. */
  readonly isVisibleOnQuote: Scalars['Boolean']['output'];
  /** Indicates whether the component is visible on the website. */
  readonly isVisibleOnWebsite: Scalars['Boolean']['output'];
  /** Indicates whether the component is a warehouse item. */
  readonly isWarehouseItem: Scalars['Boolean']['output'];
  /** Indicates whether the component has a zero price. */
  readonly isZeroPrice: Scalars['Boolean']['output'];
  /** The quantity multiplier for the component. */
  readonly multiplier: Scalars['Byte']['output'];
  /**
   * Gets the variant associated with the product set content.
   *
   *
   * **Returns:**
   * The variant associated with the product set content.
   */
  readonly variant: Maybe<Variant>;
};

export type ProductSetContentFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductSetContentFilterInput>>;
  readonly isVisibleOnQuote: InputMaybe<GatewayBoolOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<ProductSetContentFilterInput>>;
};

/** Restricts the filter operations available when filtering products. */
export type ProductStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<ProductStringOperationFilterInput>>;
};

export type ProductType =
  | 'GIFTSET'
  | 'PRODUCT'
  | 'SERVICE_ITEM';

/** Restricts the filter operations available when filtering by product type. */
export type ProductTypeOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<ProductTypeOperationFilterInput>>;
  readonly eq: InputMaybe<ProductType>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<ProductType>>>;
  readonly or: InputMaybe<ReadonlyArray<ProductTypeOperationFilterInput>>;
};

/** A connection to a list of items. */
export type ProductsConnection = {
  readonly __typename?: 'ProductsConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<ProductsEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<Product>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ProductsEdge = {
  readonly __typename?: 'ProductsEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: Product;
};

/** Represents a promotion. */
export type Promotion = Node & {
  readonly __typename?: 'Promotion';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The promotion code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the promotion. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the promotion. */
  readonly id: Scalars['ID']['output'];
  /** The promotion identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the promotion. */
  readonly modified: Scalars['DateTime']['output'];
  /** The promotion name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the promotion. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the promotion. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

export type PromotionFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<PromotionFilterInput>>;
  readonly code: InputMaybe<PromotionStringOperationFilterInput>;
  readonly name: InputMaybe<PromotionStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<PromotionFilterInput>>;
};

/** Restricts the filter operations available when filtering promotions. */
export type PromotionStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<PromotionStringOperationFilterInput>>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly or: InputMaybe<ReadonlyArray<PromotionStringOperationFilterInput>>;
};

/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type Query = {
  readonly __typename?: 'Query';
  /**
   * Retrieves the details of an artwork by its unique identifier.
   *
   *
   * **Returns:**
   * An ArtworkDetails object containing the details of the artwork if found; otherwise, null.
   */
  readonly artworkById: Maybe<ArtworkDetails>;
  /**
   * Retrieves an artwork file type by its code.
   *
   *
   * **Returns:**
   * The artwork file type with the specified code, or null if not found.
   */
  readonly artworkFileTypeByCode: Maybe<ArtworkFileType>;
  /**
   * Retrieves an artwork file type by its identifier.
   *
   *
   * **Returns:**
   * The artwork file type with the specified identifier, or null if not found.
   */
  readonly artworkFileTypeById: Maybe<ArtworkFileType>;
  /**
   * Retrieves all artwork file types.
   *
   *
   * **Returns:**
   * A collection of all artwork file types.
   */
  readonly artworkFileTypes: ReadonlyArray<ArtworkFileType>;
  /**
   * Retrieves the details of an artwork folder by its unique identifier.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the details of the artwork folder, or
   * null if the folder is not found.
   */
  readonly artworkFolderById: Maybe<ArtworkFolderDetails>;
  /**
   * Retrieves the contents of an artwork folder, supporting pagination.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a connection object with the paginated
   * artwork details.
   */
  readonly artworkFolderContents: Maybe<ArtworkFolderContentsConnection>;
  /**
   * Retrieves a collection of artwork folder details for the current user context.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains an enumerable collection of ArtworkFolderDetails.
   */
  readonly artworkFolders: ReadonlyArray<ArtworkFolderDetails>;
  /**
   * Queries artwork details based on specified criteria and returns a paginated connection of results.
   *
   *
   * **Returns:**
   * A task representing the asynchronous operation, containing a connection of ArtworkDetails.
   */
  readonly artworkQuery: Maybe<ArtworkQueryConnection>;
  /**
   * Retrieves the details of an artwork tag by its unique identifier.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the details of the artwork tag if found;
   * otherwise, null.
   */
  readonly artworkTagById: Maybe<ArtworkTagDetails>;
  /**
   * Retrieves a collection of artwork tags associated with the current user's customer and contact codes.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains an enumerable collection of ArtworkTagDetails.
   */
  readonly artworkTags: ReadonlyArray<ArtworkTagDetails>;
  /**
   * Searches for products by name, sold as code and style code.
   *
   *
   * **Returns:**
   * Products that match the search term.
   */
  readonly autocompleteProduct: ReadonlyArray<AutocompleteProduct>;
  /**
   * Searches for product variants by code, name and SKU.
   *
   *
   * **Returns:**
   * Product variants that match the search term.
   */
  readonly autocompleteVariant: ReadonlyArray<AutocompleteVariant>;
  /**
   * Retrieves a behavior by its code.
   *
   *
   * **Returns:**
   * The behavior with the specified code, or null if not found.
   */
  readonly behaviorByCode: Maybe<Behavior>;
  /**
   * Retrieves a behavior by its identifier.
   *
   *
   * **Returns:**
   * The behavior with the specified identifier, or null if not found.
   */
  readonly behaviorById: Maybe<Behavior>;
  /**
   * Retrieves all behaviors.
   *
   *
   * **Returns:**
   * A collection of all behaviors.
   */
  readonly behaviors: ReadonlyArray<Behavior>;
  /**
   * Retrieves a branding method by its code.
   *
   *
   * **Returns:**
   * The branding method with the specified code, or null if not found.
   */
  readonly brandingMethodByCode: Maybe<BrandingMethod>;
  /**
   * Retrieves a branding method by its identifier.
   *
   *
   * **Returns:**
   * The branding method with the specified identifier, or null if not found.
   */
  readonly brandingMethodById: Maybe<BrandingMethod>;
  /**
   * Retrieves all branding methods.
   *
   *
   * **Returns:**
   * A collection of all branding methods.
   */
  readonly brandingMethods: ReadonlyArray<BrandingMethod>;
  /**
   * Retrieves a branding service by its code.
   *
   *
   * **Returns:**
   * The branding service with the specified code, or null if not found.
   */
  readonly brandingServiceByCode: Maybe<BrandingService>;
  /**
   * Retrieves a branding service by its identifier.
   *
   *
   * **Returns:**
   * The branding service with the specified identifier, or null if not found.
   */
  readonly brandingServiceById: Maybe<BrandingService>;
  /**
   * Retrieves all branding services.
   *
   *
   * **Returns:**
   * A collection of all branding services.
   */
  readonly brandingServices: ReadonlyArray<BrandingService>;
  /**
   * Retrieves a color method by its code.
   *
   *
   * **Returns:**
   * The color method with the specified code, or null if not found.
   */
  readonly colorMethodByCode: Maybe<ColorMethod>;
  /**
   * Retrieves a color method by its identifier.
   *
   *
   * **Returns:**
   * The color method with the specified identifier, or null if not found.
   */
  readonly colorMethodById: Maybe<ColorMethod>;
  /**
   * Retrieves all color methods.
   *
   *
   * **Returns:**
   * A collection of all color methods.
   */
  readonly colorMethods: ReadonlyArray<ColorMethod>;
  /**
   * Retrieves a credit note by its unique identifier for the current customer.
   *
   *
   * **Returns:**
   * A CreditNote object representing the credit note if found; otherwise, null.
   */
  readonly creditNote: Maybe<CreditNote>;
  /**
   * Retrieves a paginated and filtered list of credit notes associated with a specific sales order number.
   *
   *
   * **Returns:**
   * A task representing the asynchronous operation, containing a connection of credit notes.
   */
  readonly creditNotes: Maybe<CreditNotesConnection>;
  /**
   * Retrieves all currencies.
   *
   *
   * **Returns:**
   * A collection of all currencies.
   */
  readonly currencies: ReadonlyArray<PaymentTerm>;
  /**
   * Retrieves a currency by its code.
   *
   *
   * **Returns:**
   * The currency with the specified code, or null if not found.
   */
  readonly currencyByCode: Maybe<Currency>;
  /**
   * Retrieves a currency by its identifier.
   *
   *
   * **Returns:**
   * The currency with the specified identifier, or null if not found.
   */
  readonly currencyById: Maybe<Currency>;
  /**
   * Retrieves a customer by their unique identifier.
   *
   *
   * **Returns:**
   * The customer with the specified identifier, or null if not found.
   */
  readonly customerById: Maybe<Customer>;
  /**
   * Retrieves a customer contact by its unique identifier.
   *
   *
   * **Returns:**
   * The customer contact if found; otherwise, null.
   */
  readonly customerContact: Maybe<CustomerContact>;
  /**
   * Retrieves all date detail records.
   *
   *
   * **Returns:**
   * A collection of all date detail records.
   */
  readonly dateDetails: ReadonlyArray<DateDetails>;
  /**
   * Retrieves a date details record by its identifier.
   *
   *
   * **Returns:**
   * The date details record with the specified identifier, or null if not found.
   */
  readonly dateDetailsById: Maybe<DateDetails>;
  /**
   * Retrieves the date details for the next working day based on the provided date.
   * If the provided date is a working day, it will return the details for that date.
   * Otherwise, it will return the details for the next working day.
   *
   *
   * **Returns:**
   * The date details for the next working day. Returns null if not found.
   */
  readonly dateDetailsForNextWorkingDay: Maybe<DateDetails>;
  /**
   * Retrieves the date details for the previous working day based on the provided date.
   * If the provided date is a working day, it will return the details for that date.
   * Otherwise, it will return the details for the previous working day.
   *
   *
   * **Returns:**
   * The date details for the previous working day. Returns null if not found.
   */
  readonly dateDetailsForPreviousWorkingDay: Maybe<DateDetails>;
  /**
   * Retrieves an enum lookup by its code.
   *
   *
   * **Returns:**
   * The enum lookup with the specified code, or null if not found.
   */
  readonly enumLookupByCode: Maybe<EnumLookup>;
  /**
   * Retrieves an enum lookup by its identifier.
   *
   *
   * **Returns:**
   * The enum lookup with the specified identifier, or null if not found.
   */
  readonly enumLookupById: Maybe<EnumLookup>;
  /**
   * Retrieves all enum lookups.
   *
   *
   * **Returns:**
   * A collection of all enum lookups.
   */
  readonly enumLookups: ReadonlyArray<EnumLookup>;
  /**
   * Retrieves a gender by its code.
   *
   *
   * **Returns:**
   * The gender with the specified code, or null if not found.
   */
  readonly genderByCode: Maybe<Gender>;
  /**
   * Retrieves a gender by its identifier.
   *
   *
   * **Returns:**
   * The gender with the specified identifier, or null if not found.
   */
  readonly genderById: Maybe<Gender>;
  /**
   * Retrieves all genders.
   *
   *
   * **Returns:**
   * A collection of all genders.
   */
  readonly genders: ReadonlyArray<Gender>;
  /**
   * Retrieves a job card by its unique identifier for the current customer context.
   *
   *
   * **Returns:**
   * A JobCard object representing the requested job card if found; otherwise, null.
   */
  readonly jobCard: Maybe<JobCard>;
  /**
   * Retrieves a job card asset by its unique identifier for the current customer context.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the job card asset if found; otherwise,
   * null.
   */
  readonly jobCardAsset: Maybe<JobCardAsset>;
  /**
   * Retrieves the job card proof asset associated with the specified identifier for the current customer.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the job card proof model if found;
   * otherwise, null.
   */
  readonly jobCardProof: Maybe<JobCardProof>;
  /**
   * Retrieves a paginated and filtered list of job cards based on the specified criteria.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a Connection`1
   * representing the paginated list of job cards.
   */
  readonly jobCards: Maybe<JobCardsConnection>;
  /**
   * Retrieves a manufacturing region by its code.
   *
   *
   * **Returns:**
   * The manufacturing region with the specified code, or null if not found.
   */
  readonly manufacturingRegionByCode: Maybe<ManufacturingRegion>;
  /**
   * Retrieves a manufacturing region by its identifier.
   *
   *
   * **Returns:**
   * The manufacturing region with the specified identifier, or null if not found.
   */
  readonly manufacturingRegionById: Maybe<ManufacturingRegion>;
  /**
   * Retrieves all manufacturing regions.
   *
   *
   * **Returns:**
   * A collection of all manufacturing regions.
   */
  readonly manufacturingRegions: ReadonlyArray<ManufacturingRegion>;
  /** Fetches an object given its ID. */
  readonly node: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  readonly nodes: ReadonlyArray<Maybe<Node>>;
  /**
   * Retrieves a payment term by its identifier.
   *
   *
   * **Returns:**
   * The payment term with the specified identifier, or null if not found.
   */
  readonly paymentTermById: Maybe<PaymentTerm>;
  /**
   * Retrieves a product brand by its code.
   *
   *
   * **Returns:**
   * The product brand with the specified code, or null if not found.
   */
  readonly productBrandByCode: Maybe<ProductBrand>;
  /**
   * Retrieves a product brand by its identifier.
   *
   *
   * **Returns:**
   * The product brand with the specified identifier, or null if not found.
   */
  readonly productBrandById: Maybe<ProductBrand>;
  /**
   * Retrieves all product brands.
   *
   *
   * **Returns:**
   * A collection of all product brands.
   */
  readonly productBrands: ReadonlyArray<ProductBrand>;
  /**
   * Retrieves a product by its identifier.
   *
   *
   * **Returns:**
   * The product with the specified identifier, or null if not found.
   */
  readonly productById: Maybe<Product>;
  /**
   * Retrieves a product by its sold-as code.
   *
   *
   * **Returns:**
   * The product with the specified sold-as code, or null if not found.
   */
  readonly productBySoldAsCode: Maybe<Product>;
  /**
   * Retrieves a product by its style code.
   *
   *
   * **Returns:**
   * The product with the specified style code, or null if not found.
   */
  readonly productByStyleCode: Maybe<Product>;
  /**
   * Retrieves all product categories.
   *
   *
   * **Returns:**
   * A collection of all product categories.
   */
  readonly productCategories: ReadonlyArray<ProductCategory>;
  /**
   * Retrieves a product category by its code.
   *
   *
   * **Returns:**
   * The product category with the specified code, or null if not found.
   */
  readonly productCategoryByCode: Maybe<ProductCategory>;
  /**
   * Retrieves a product category by its identifier.
   *
   *
   * **Returns:**
   * The product category with the specified identifier, or null if not found.
   */
  readonly productCategoryById: Maybe<ProductCategory>;
  /**
   * Retrieves a product item group by its code.
   *
   *
   * **Returns:**
   * The product item group with the specified code, or null if not found.
   */
  readonly productItemGroupByCode: Maybe<ProductItemGroup>;
  /**
   * Retrieves a product item group by its identifier.
   *
   *
   * **Returns:**
   * The product item group with the specified identifier, or null if not found.
   */
  readonly productItemGroupById: Maybe<ProductItemGroup>;
  /**
   * Retrieves all product item groups.
   *
   *
   * **Returns:**
   * A collection of all product item groups.
   */
  readonly productItemGroups: ReadonlyArray<ProductItemGroup>;
  /**
   * Retrieves the product media associated with the specified identifier.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the product media if found; otherwise,
   * null.
   */
  readonly productMedia: Maybe<ProductMedia>;
  /**
   * Retrieves a paginated list of product media items with support for filtering and paging.
   *
   *
   * **Returns:**
   * A connection object containing the paginated product media items and related paging information.
   */
  readonly productMedias: Maybe<ProductMediasConnection>;
  /**
   * Retrieves a paginated list of products, optionally filtered by product category, code or name.
   *
   *
   * **Returns:**
   * A paginated list of products.
   */
  readonly products: Maybe<ProductsConnection>;
  /**
   * Retrieves a promotion by its code.
   *
   *
   * **Returns:**
   * The promotion with the specified code, or null if not found.
   */
  readonly promotionByCode: Maybe<Promotion>;
  /**
   * Retrieves a promotion by its identifier.
   *
   *
   * **Returns:**
   * The promotion with the specified identifier, or null if not found.
   */
  readonly promotionById: Maybe<Promotion>;
  /**
   * Retrieves all promotions.
   *
   *
   * **Returns:**
   * A collection of all promotions.
   */
  readonly promotions: ReadonlyArray<Promotion>;
  /**
   * Retrieves a region by its code.
   *
   *
   * **Returns:**
   * The region with the specified code, or null if not found.
   */
  readonly regionByCode: Maybe<Region>;
  /**
   * Retrieves a region by its identifier.
   *
   *
   * **Returns:**
   * The region with the specified identifier, or null if not found.
   */
  readonly regionById: Maybe<Region>;
  /**
   * Retrieves all regions.
   *
   *
   * **Returns:**
   * A collection of all regions.
   */
  readonly regions: ReadonlyArray<Region>;
  /**
   * Retrieves a sales channel by its code.
   *
   *
   * **Returns:**
   * The sales channel with the specified code, or null if not found.
   */
  readonly salesChannelByCode: Maybe<SalesChannel>;
  /**
   * Retrieves a sales channel by its identifier.
   *
   *
   * **Returns:**
   * The sales channel with the specified identifier, or null if not found.
   */
  readonly salesChannelById: Maybe<SalesChannel>;
  /**
   * Retrieves all sales channels.
   *
   *
   * **Returns:**
   * A collection of all sales channels.
   */
  readonly salesChannels: ReadonlyArray<SalesChannel>;
  /**
   * Retrieves a sales order by its unique identifier.
   *
   *
   * **Returns:**
   * A SalesOrder object representing the sales order if found; otherwise, null.
   */
  readonly salesOrder: Maybe<SalesOrder>;
  /**
   * Retrieves a sales order asset by its unique identifier for the current customer context.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the sales order asset if found;
   * otherwise, null.
   */
  readonly salesOrderAsset: Maybe<SalesOrderAsset>;
  /**
   * Retrieves a paginated and filtered list of sales orders.
   *
   *
   * **Returns:**
   * A task representing the asynchronous operation, containing a connection object with the paginated sales orders.
   */
  readonly salesOrders: Maybe<SalesOrdersConnection>;
  /**
   * Retrieves a sales person by their code.
   *
   *
   * **Returns:**
   * The sales person with the specified code, or null if not found.
   */
  readonly salesPersonByCode: Maybe<SalesPerson>;
  /**
   * Retrieves a sales person by their ID.
   *
   *
   * **Returns:**
   * The sales person with the specified ID, or null if not found.
   */
  readonly salesPersonById: Maybe<SalesPerson>;
  /**
   * Retrieves a paginated list of sales persons.
   *
   *
   * **Returns:**
   * A paginated list of sales persons.
   */
  readonly salesPersons: Maybe<SalesPersonsConnection>;
  /**
   * Retrieves a paginated list of sales persons by region.
   *
   *
   * **Returns:**
   * A paginated list of sales persons in the specified region.
   */
  readonly salesPersonsByRegion: Maybe<SalesPersonsByRegionConnection>;
  /**
   * Retrieves a segment color by its code.
   *
   *
   * **Returns:**
   * The segment color with the specified code, or null if not found.
   */
  readonly segmentColorByCode: Maybe<SegmentColor>;
  /**
   * Retrieves a segment color by its identifier.
   *
   *
   * **Returns:**
   * The segment color with the specified identifier, or null if not found.
   */
  readonly segmentColorById: Maybe<SegmentColor>;
  /**
   * Retrieves all segment colors.
   *
   *
   * **Returns:**
   * A collection of all segment colors.
   */
  readonly segmentColors: ReadonlyArray<SegmentColor>;
  /**
   * Retrieves a segment size by its code.
   *
   *
   * **Returns:**
   * The segment size with the specified code, or null if not found.
   */
  readonly segmentSizeByCode: Maybe<SegmentSize>;
  /**
   * Retrieves a segment size by its identifier.
   *
   *
   * **Returns:**
   * The segment size with the specified identifier, or null if not found.
   */
  readonly segmentSizeById: Maybe<SegmentSize>;
  /**
   * Retrieves all segment sizes.
   *
   *
   * **Returns:**
   * A collection of all segment sizes.
   */
  readonly segmentSizes: ReadonlyArray<SegmentSize>;
  /**
   * Retrieves a size group by its code.
   *
   *
   * **Returns:**
   * The size group with the specified code, or null if not found.
   */
  readonly sizeGroupByCode: Maybe<SizeGroup>;
  /**
   * Retrieves a size group by its identifier.
   *
   *
   * **Returns:**
   * The size group with the specified identifier, or null if not found.
   */
  readonly sizeGroupById: Maybe<SizeGroup>;
  /**
   * Retrieves all size groups.
   *
   *
   * **Returns:**
   * A collection of all size groups.
   */
  readonly sizeGroups: ReadonlyArray<SizeGroup>;
  /** Retrieves a simple status message indicating that the Gateway API is running. This method can be used for health checks or to confirm that the API is operational. */
  readonly status: Scalars['String']['output'];
  /**
   * Retrieves a stock class by its code.
   *
   *
   * **Returns:**
   * The stock class with the specified code, or null if not found.
   */
  readonly stockClassByCode: Maybe<StockClass>;
  /**
   * Retrieves a stock class by its identifier.
   *
   *
   * **Returns:**
   * The stock class with the specified identifier, or null if not found.
   */
  readonly stockClassById: Maybe<StockClass>;
  /**
   * Retrieves all stock classes.
   *
   *
   * **Returns:**
   * A collection of all stock classes.
   */
  readonly stockClasss: ReadonlyArray<StockClass>;
  /**
   * Gets the stock level by ID.
   *
   *
   * **Returns:**
   * The stock level.
   */
  readonly stockLevelById: Maybe<StockLevel>;
  /**
   * Gets the stock level by item code.
   *
   *
   * **Returns:**
   * The stock level.
   */
  readonly stockLevelByItemCode: Maybe<StockLevel>;
  /**
   * Gets the stock level by SKU code.
   *
   *
   * **Returns:**
   * The stock level.
   */
  readonly stockLevelBySkuCode: Maybe<StockLevel>;
  /**
   * Gets the stock level by sold as and color code.
   *
   *
   * **Returns:**
   * The stock level.
   */
  readonly stockLevelBySoldAsAndColorCode: Maybe<StockLevel>;
  /**
   * Gets the stock level by sold as code.
   *
   *
   * **Returns:**
   * The stock level.
   */
  readonly stockLevelBySoldAsCode: Maybe<StockLevel>;
  /**
   * Gets the stock level by style and color code.
   *
   *
   * **Returns:**
   * The stock level.
   */
  readonly stockLevelByStyleAndColorCode: Maybe<StockLevel>;
  /**
   * Gets the stock level by style code.
   *
   *
   * **Returns:**
   * The stock level.
   */
  readonly stockLevelByStyleCode: Maybe<StockLevel>;
  /**
   * Gets the current index of stock level deltas.
   *
   *
   * **Returns:**
   * The stock level delta index.
   */
  readonly stockLevelDeltaIndex: StockLevelDeltaIndex;
  /**
   * Gets a paginated list of stock levels.
   *
   *
   * **Returns:**
   * A paginated list of stock levels.
   */
  readonly stockLevels: Maybe<StockLevelsConnection>;
  /**
   * Gets a paginated list of stock levels that have changed since a given timestamp.
   *
   *
   * **Returns:**
   * A paginated list of stock levels that have changed.
   */
  readonly stockLevelsDelta: Maybe<StockLevelsDeltaConnection>;
  /**
   * Retrieves a tier by its identifier.
   *
   *
   * **Returns:**
   * The tier with the specified identifier, or null if not found.
   */
  readonly tierById: Maybe<Tier>;
  /**
   * Retrieves a tier by its region code.
   *
   *
   * **Returns:**
   * The tier associated with the specified region code, or null if not found.
   */
  readonly tierByRegion: Maybe<Tier>;
  /**
   * Retrieves all tiers.
   *
   *
   * **Returns:**
   * A collection of all tiers.
   */
  readonly tiers: ReadonlyArray<Tier>;
  /**
   * Retrieves tiers by their region identifier.
   *
   *
   * **Returns:**
   * A collection of tiers associated with the specified region identifier.
   */
  readonly tiersByRegion: ReadonlyArray<Tier>;
  /**
   * Retrieves tiers by their region code.
   *
   *
   * **Returns:**
   * A collection of tiers associated with the specified region code.
   */
  readonly tiersByRegionCode: ReadonlyArray<Tier>;
  /**
   * Retrieves a unit of measure by its code.
   *
   *
   * **Returns:**
   * The unit of measure with the specified code, or null if not found.
   */
  readonly unitOfMeasureByCode: Maybe<UnitOfMeasure>;
  /**
   * Retrieves a unit of measure by its identifier.
   *
   *
   * **Returns:**
   * The unit of measure with the specified identifier, or null if not found.
   */
  readonly unitOfMeasureById: Maybe<UnitOfMeasure>;
  /**
   * Retrieves all units of measurement.
   *
   *
   * **Returns:**
   * A collection of all units of measurement.
   */
  readonly unitsOfMeasurement: ReadonlyArray<UnitOfMeasure>;
  /**
   * Retrieves a variant by its code.
   *
   *
   * **Returns:**
   * The variant with the specified code, or null if not found.
   */
  readonly variantByCode: Maybe<Variant>;
  /**
   * Retrieves a variant by its identifier.
   *
   *
   * **Returns:**
   * The variant with the specified identifier, or null if not found.
   */
  readonly variantById: Maybe<Variant>;
  /**
   * Retrieves a variant by its SKU.
   *
   *
   * **Returns:**
   * The variant with the specified SKU, or null if not found.
   */
  readonly variantBySku: Maybe<Variant>;
  /**
   * Retrieves a paginated and filterable list of product variants based on the specified criteria.
   *
   *
   * **Returns:**
   * A Connection`1 containing the paginated list of Variant objects that match the
   * specified criteria.
   */
  readonly variants: Maybe<VariantsConnection>;
  /** Retrieves the current version of the Gateway application by accessing the assembly information. This method can be used to verify the deployed version of the API and for debugging or informational purposes. */
  readonly version: Scalars['String']['output'];
  /**
   * Asynchronously retrieves a Viewer object containing the current user's identity, customer, and contact information,
   * utilizing caching to improve performance.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a Viewer object populated with the
   * user's identity, customer, contact, and impersonation information.
   */
  readonly viewer: Viewer;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryartworkByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryartworkFileTypeByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryartworkFileTypeByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryartworkFolderByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryartworkFolderContentsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  folderPath: Scalars['String']['input'];
  last: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryartworkQueryArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  extensions: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  first: InputMaybe<Scalars['Int']['input']>;
  ids: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
  last: InputMaybe<Scalars['Int']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  statuses: InputMaybe<ReadonlyArray<ArtworkQueryStatus>>;
  tags: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  types: InputMaybe<ReadonlyArray<ArtworkType>>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryartworkTagByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryautocompleteProductArgs = {
  excludeProductClass?: Scalars['Boolean']['input'];
  productClassCode: InputMaybe<Scalars['String']['input']>;
  searchTerm: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryautocompleteVariantArgs = {
  excludeProductClass?: Scalars['Boolean']['input'];
  productClassCode: InputMaybe<Scalars['String']['input']>;
  searchTerm: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerybehaviorByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerybehaviorByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerybrandingMethodByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerybrandingMethodByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerybrandingServiceByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerybrandingServiceByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerycolorMethodByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerycolorMethodByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerycreditNoteArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerycreditNotesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<CreditNoteFilterInput>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerycurrencyByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerycurrencyByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerycustomerByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerycustomerContactArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerydateDetailsByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerydateDetailsForNextWorkingDayArgs = {
  fromDate: InputMaybe<Scalars['Date']['input']>;
  leadTime: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerydateDetailsForPreviousWorkingDayArgs = {
  fromDate: InputMaybe<Scalars['Date']['input']>;
  leadTime: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryenumLookupByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryenumLookupByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerygenderByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerygenderByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryjobCardArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryjobCardAssetArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryjobCardProofArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryjobCardsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<JobCardFilterInput>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerymanufacturingRegionByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerymanufacturingRegionByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerynodeArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerynodesArgs = {
  ids: ReadonlyArray<Scalars['ID']['input']>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerypaymentTermByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductBrandByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductBrandByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductBySoldAsCodeArgs = {
  soldAsCode: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductByStyleCodeArgs = {
  styleCode: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductCategoryByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductItemGroupByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductItemGroupByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductMediaArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductMediasArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProductImageFilterInput>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryproductsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  productCategory: InputMaybe<Scalars['ID']['input']>;
  where: InputMaybe<ProductFilterInput>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerypromotionByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerypromotionByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryregionByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryregionByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryregionsArgs = {
  where: InputMaybe<RegionFilterInput>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysalesChannelByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysalesChannelByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysalesOrderArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysalesOrderAssetArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysalesOrdersArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<SalesOrderFilterInput>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysalesPersonByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysalesPersonByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysalesPersonsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<SalesPersonFilterInput>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysalesPersonsByRegionArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  regionId: Scalars['Int']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysegmentColorByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysegmentColorByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysegmentSizeByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysegmentSizeByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysizeGroupByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerysizeGroupByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockClassByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockClassByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockLevelByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockLevelByItemCodeArgs = {
  itemCode: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockLevelBySkuCodeArgs = {
  skuCode: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockLevelBySoldAsAndColorCodeArgs = {
  colorSegmentCode: Scalars['String']['input'];
  soldAsCode: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockLevelBySoldAsCodeArgs = {
  soldAsCode: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockLevelByStyleAndColorCodeArgs = {
  colorSegmentCode: Scalars['String']['input'];
  styleCode: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockLevelByStyleCodeArgs = {
  styleCode: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockLevelsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerystockLevelsDeltaArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  fromTimestamp: Scalars['Long']['input'];
  last: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerytierByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerytierByRegionArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerytiersByRegionArgs = {
  regionId: Scalars['Int']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QuerytiersByRegionCodeArgs = {
  regionCode: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryunitOfMeasureByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryunitOfMeasureByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryvariantByCodeArgs = {
  code: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryvariantByIdArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryvariantBySkuArgs = {
  sku: Scalars['String']['input'];
};


/**
 * Provides query operations for retrieving credit notes for the current customer, including retrieval by unique
 * identifier and querying with pagination and filtering.
 */
export type QueryvariantsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  productCategory: InputMaybe<Scalars['ID']['input']>;
  query: InputMaybe<Scalars['String']['input']>;
  where: InputMaybe<VariantFilterInput>;
};

/** Represents a region. */
export type Region = Node & {
  readonly __typename?: 'Region';
  /** The Accounts Company Code associated with the region. */
  readonly accountsCompany: Scalars['String']['output'];
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The region code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the region. */
  readonly created: Scalars['DateTime']['output'];
  /** The currency associated with the region. */
  readonly currency: Maybe<Currency>;
  /** The unique identifier for the region. */
  readonly id: Scalars['ID']['output'];
  /** The region identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the region. */
  readonly modified: Scalars['DateTime']['output'];
  /** The region name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the region. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the region. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The tiers associated with the region. */
  readonly tiers: ReadonlyArray<Tier>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

export type RegionFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<RegionFilterInput>>;
  readonly code: InputMaybe<RegionStringOperationFilterInput>;
  readonly name: InputMaybe<GatewayStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<RegionFilterInput>>;
};

/** Restricts the filter operations available when filtering suppliers. */
export type RegionStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<RegionStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<RegionStringOperationFilterInput>>;
};

export type RequestChangeJobCardError = ConflictException;

/** Represents the input data required to request a change to a job card. */
export type RequestChangeJobCardInput = {
  /** The type of change request being made for the job card. */
  readonly changeRequestType: JobCardChangeRequestType;
  /** The list of job card change requests, each containing the job card number and associated branding details. */
  readonly jobCards: ReadonlyArray<JobCardBrandingDetailInput>;
  /** The order number associated with the change request. */
  readonly salesOrderNumber: Scalars['String']['input'];
};

export type RequestChangeJobCardPayload = {
  readonly __typename?: 'RequestChangeJobCardPayload';
  readonly errors: Maybe<ReadonlyArray<RequestChangeJobCardError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/** Payload type for success status of request. */
export type ResultPayloadType = {
  readonly __typename?: 'ResultPayloadType';
  readonly result: ResultTypeStatus;
};

export type ResultTypeStatus =
  | 'OK';

export type RevokeAllSharesError = BadRequestException | NotFoundException | UnauthorizedException;

export type RevokeAllSharesPayload = {
  readonly __typename?: 'RevokeAllSharesPayload';
  readonly errors: Maybe<ReadonlyArray<RevokeAllSharesError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type RevokeSharedArtworkError = BadRequestException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for sharing of a artwork. */
export type RevokeSharedArtworkInput = {
  /** The Identifier of the artwork object. */
  readonly artworkId: Scalars['ID']['input'];
};

export type RevokeSharedArtworkPayload = {
  readonly __typename?: 'RevokeSharedArtworkPayload';
  readonly errors: Maybe<ReadonlyArray<RevokeSharedArtworkError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type RevokeSharedFolderError = BadRequestException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for sharing of a Folder. */
export type RevokeSharedFolderInput = {
  /** The Identifier of the Folder object. */
  readonly folderId: Scalars['ID']['input'];
};

export type RevokeSharedFolderPayload = {
  readonly __typename?: 'RevokeSharedFolderPayload';
  readonly errors: Maybe<ReadonlyArray<RevokeSharedFolderError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/** Represents a sales area style. */
export type SalesArea = {
  readonly __typename?: 'SalesArea';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The name of the sales area. */
  readonly code: Scalars['String']['output'];
  /** The creation date and time of the sales area. */
  readonly created: Scalars['DateTime']['output'];
  /**
   * Gets the internal identifier of the sales area.
   *
   *
   * **Returns:**
   * The internal identifier of the sales area.
   */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the sales area. */
  readonly modified: Scalars['DateTime']['output'];
  /** The name of the sales area. */
  readonly name: Scalars['String']['output'];
  /** The region associated with the sales area. */
  readonly region: Maybe<Region>;
  /** The source identifier for the sales area. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for the sales area. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents a sales channel. */
export type SalesChannel = Node & {
  readonly __typename?: 'SalesChannel';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The sales channel code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the sales channel. */
  readonly created: Scalars['DateTime']['output'];
  /** The description of the sales channel. */
  readonly description: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the sales channel. */
  readonly id: Scalars['ID']['output'];
  /** The sales channel identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the sales channel. */
  readonly modified: Scalars['DateTime']['output'];
  /** The sales channel name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the sales channel. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the sales channel. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents a sales order. */
export type SalesOrder = Node & {
  readonly __typename?: 'SalesOrder';
  /**
   * Retrieves the collection of assets associated with the specified sales order.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a collection of assets linked to the
   * sales order. The collection may be empty if no assets are associated.
   */
  readonly assets: Maybe<ReadonlyArray<SalesOrderAsset>>;
  /** The associated outstanding balance. */
  readonly balanceOutstanding: Scalars['Decimal']['output'];
  /**
   * Retrieves the collection branch associated with the specified sales order, if one is defined.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the collection branch if specified;
   * otherwise, null.
   */
  readonly collectionBranch: Maybe<Branch>;
  /**
   * Retrieves the customer contact information associated with the specified sales order.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the customer contact information if
   * found; otherwise, null.
   */
  readonly contact: Maybe<CustomerContact>;
  /**
   * Retrieves the collection of credit notes associated with the specified sales order.
   *
   *
   * **Returns:**
   * A collection of credit notes associated with the specified sales order, or null if no credit notes are found.
   */
  readonly creditNotes: Maybe<ReadonlyArray<CreditNote>>;
  /**
   * Retrieves the customer associated with the specified sales order asynchronously.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the customer model if found; otherwise,
   * null.
   */
  readonly customer: Maybe<Customer>;
  /** The associated customer reference number. */
  readonly customerReference: Scalars['String']['output'];
  /** The associated VAT exclusive discount. */
  readonly discountExcl: Scalars['Decimal']['output'];
  /** The identifier for the sales order. */
  readonly id: Scalars['ID']['output'];
  /**
   * Retrieves the collection of internal details associated with the specified sales order asynchronously.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains an enumerable collection of internal
   * details for the sales order, or null if no details are found.
   */
  readonly internalDetails: Maybe<ReadonlyArray<SalesOrderInternalDetail>>;
  /** The Sales order's  identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The associated internal line count. */
  readonly internalLineCount: Scalars['Int']['output'];
  /** The associated invoice date. */
  readonly invoiceDate: Maybe<Scalars['DateTime']['output']>;
  /** The associated invoice number. */
  readonly invoiceNumber: Maybe<Scalars['String']['output']>;
  /** The active status for the sales order. */
  readonly isActive: Scalars['Boolean']['output'];
  /** The paid status for the sales order. */
  readonly isPaid: Scalars['Boolean']['output'];
  /**
   * Retrieves the collection of job cards associated with the specified sales order.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a collection of job cards linked to the
   * specified sales order. The collection will be empty if no job cards are found.
   */
  readonly jobCards: Maybe<ReadonlyArray<JobCard>>;
  /** The associated last modified date. */
  readonly lastModifiedDate: Scalars['DateTime']['output'];
  /** The associated line count for the sales order. */
  readonly lineCount: Scalars['Int']['output'];
  /** The associated order date. */
  readonly orderDate: Scalars['Date']['output'];
  /**
   * Retrieves the packaging information associated with the specified sales order.
   *
   *
   * **Returns:**
   * A collection of SalesOrderPackaging models representing the packaging information for the specified sales order, or
   * null if no packaging information is found.
   */
  readonly packaging: Maybe<ReadonlyArray<SalesOrderPackaging>>;
  /** The associated packaging count for the sales order. */
  readonly packagingCount: Scalars['Int']['output'];
  /**
   * Retrieves the payment history associated with the specified sales order.
   *
   *
   * **Returns:**
   * A collection of payment history records for the specified sales order, or null if no payment history exists.
   */
  readonly paymentHistory: Maybe<ReadonlyArray<SalesOrderPaymentHistory>>;
  /**
   * Asynchronously retrieves the collection of details associated with the specified sales order.
   *
   *
   * **Returns:**
   * A collection of sales order details for the specified sales order, or null if no details are found.
   */
  readonly salesOrderDetails: Maybe<ReadonlyArray<SalesOrderDetail>>;
  /** The associated sales order number. */
  readonly salesOrderNumber: Scalars['String']['output'];
  /**
   * Retrieves the status of the specified sales order.
   *
   *
   * **Returns:**
   * The status of the sales order as a SalesOrderStatus. Returns Unknown
   * if the status ID cannot be resolved.
   */
  readonly status: SalesOrderStatus;
  /** The associated tax amount. */
  readonly tax: Scalars['Decimal']['output'];
  /** The associated VAT exclusive total. */
  readonly totalExcl: Scalars['Decimal']['output'];
};


/** Represents a sales order. */
export type SalesOrderassetsArgs = {
  where: InputMaybe<SalesOrderAssetFilterInput>;
};

/** Represents a sales order asset. */
export type SalesOrderAsset = Node & {
  readonly __typename?: 'SalesOrderAsset';
  /** The unique id of the asset. */
  readonly assetId: Scalars['String']['output'];
  /** The created date for the asset. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the asset. */
  readonly id: Scalars['ID']['output'];
  /** The name for the asset. */
  readonly name: Scalars['String']['output'];
  /**
   * Retrieves the asset type for the specified sales order asset.
   *
   *
   * **Returns:**
   * A value of type SalesOrderAssetType representing the asset type. Returns Unknown if the type cannot be determined.
   */
  readonly type: SalesOrderAssetType;
  /** The Url for the asset. */
  readonly url: Maybe<Scalars['URL']['output']>;
};

export type SalesOrderAssetFilterInput = {
  readonly Type: InputMaybe<SalesOrderAssetTypeEnumOperationFilterInput>;
  readonly and: InputMaybe<ReadonlyArray<SalesOrderAssetFilterInput>>;
  readonly name: InputMaybe<GatewayStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<SalesOrderAssetFilterInput>>;
};

export type SalesOrderAssetType =
  | 'COLLECTION_NOTE'
  | 'PROOF_OF_COLLECTION'
  | 'SALES_ORDER'
  | 'TAX_INVOICE'
  | 'UNKNOWN';

/**
 * Represents a filter input type for performing filter operations on the SalesOrderAssetType enumeration in GraphQL
 * queries.
 */
export type SalesOrderAssetTypeEnumOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SalesOrderAssetTypeEnumOperationFilterInput>>;
  readonly eq: InputMaybe<SalesOrderAssetType>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<SalesOrderAssetType>>>;
  readonly neq: InputMaybe<SalesOrderAssetType>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<SalesOrderAssetType>>>;
  readonly or: InputMaybe<ReadonlyArray<SalesOrderAssetTypeEnumOperationFilterInput>>;
};

/** Restricts the boolean filter operations available when filtering sales orders. */
export type SalesOrderBoolOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SalesOrderBoolOperationFilterInput>>;
  readonly eq: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<SalesOrderBoolOperationFilterInput>>;
};

/** Restricts the filter operations available when filtering sales orders by date. */
export type SalesOrderDateTimeOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SalesOrderDateTimeOperationFilterInput>>;
  readonly gte: InputMaybe<Scalars['DateTime']['input']>;
  readonly lte: InputMaybe<Scalars['DateTime']['input']>;
  readonly or: InputMaybe<ReadonlyArray<SalesOrderDateTimeOperationFilterInput>>;
};

/** Represents a sales order detail. */
export type SalesOrderDetail = {
  readonly __typename?: 'SalesOrderDetail';
  /** The tax amount for the sales order detail. */
  readonly lineTax: Scalars['Decimal']['output'];
  /** The line total excluding VAT for the sales order detail. */
  readonly lineTotalExcl: Scalars['Decimal']['output'];
  /** The quantity for the sales order detail. */
  readonly quantity: Scalars['Int']['output'];
  /** The row number for the sales order detail. */
  readonly rowNumber: Scalars['Int']['output'];
  /** The sku for the sales order detail. */
  readonly sku: Scalars['String']['output'];
  /** The unit discount excluding VAT for the sales order detail. */
  readonly unitDiscountExcl: Scalars['Decimal']['output'];
  /** The unit price excluding VAT for the sales order detail. */
  readonly unitPriceExcl: Scalars['Decimal']['output'];
};

export type SalesOrderFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SalesOrderFilterInput>>;
  readonly customerReference: InputMaybe<SalesOrderStringOperationFilterInput>;
  readonly invoiceNumber: InputMaybe<SalesOrderStringOperationFilterInput>;
  readonly isActive: InputMaybe<SalesOrderBoolOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<SalesOrderFilterInput>>;
  readonly orderDate: InputMaybe<SalesOrderDateTimeOperationFilterInput>;
  readonly salesOrderNumber: InputMaybe<SalesOrderStringOperationFilterInput>;
  readonly status: InputMaybe<SalesOrderStatusEnumOperationFilterInput>;
};

/** Represents a sales order internal detail. */
export type SalesOrderInternalDetail = {
  readonly __typename?: 'SalesOrderInternalDetail';
  /** The tax amount for the sales order internal detail. */
  readonly lineTax: Scalars['Decimal']['output'];
  /** The line total excluding VAT for the sales order internal detail. */
  readonly lineTotalExcl: Scalars['Decimal']['output'];
  /** The quantity for the sales order internal detail. */
  readonly quantity: Scalars['Int']['output'];
  /** The row number for the sales order internal detail. */
  readonly rowNumber: Scalars['Int']['output'];
  /** The sku for the sales order internal detail. */
  readonly sku: Scalars['String']['output'];
  /** The unit discount excluding VAT for the sales order internal detail. */
  readonly unitDiscountExcl: Scalars['Decimal']['output'];
  /** The unit price excluding VAT for the sales order internal detail. */
  readonly unitPriceExcl: Scalars['Decimal']['output'];
};

/** Represents the packaging details of a product. */
export type SalesOrderPackaging = {
  readonly __typename?: 'SalesOrderPackaging';
  readonly dimUnitOfMeasure: Scalars['Int']['output'];
  readonly height: Scalars['Float']['output'];
  readonly length: Scalars['Float']['output'];
  readonly number: Scalars['Int']['output'];
  readonly weight: Scalars['Float']['output'];
  readonly weightUnitOfMeasure: Scalars['Int']['output'];
  readonly width: Scalars['Float']['output'];
};

/** Represents a sales order payment history. */
export type SalesOrderPaymentHistory = {
  readonly __typename?: 'SalesOrderPaymentHistory';
  /** The amount for the sales order payment history. */
  readonly amount: Scalars['Decimal']['output'];
  /** The date for the sales order payment history. */
  readonly date: Scalars['DateTime']['output'];
  /** The payment type for the sales order payment history. */
  readonly paymentType: PaymentType;
};

export type SalesOrderStatus =
  | 'CANCELLED'
  | 'CLOSED'
  | 'DELIVERY_IN_TRANSIT'
  | 'DELIVERY_PENDING'
  | 'DISPATCH_PENDING'
  | 'IN_TRANSIT'
  | 'NEW'
  | 'PICKED'
  | 'READY_FOR_COLLECTION'
  | 'READY_FOR_TRANSIT'
  | 'RECEIVED_AT_BRANCH'
  | 'RECEIVED_BY_WAREHOUSE'
  | 'UNKNOWN';

/** Restricts the filter operations available when filtering sales orders by status. */
export type SalesOrderStatusEnumOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SalesOrderStatusEnumOperationFilterInput>>;
  readonly eq: InputMaybe<SalesOrderStatus>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<SalesOrderStatus>>>;
  readonly neq: InputMaybe<SalesOrderStatus>;
  readonly nin: InputMaybe<ReadonlyArray<InputMaybe<SalesOrderStatus>>>;
  readonly or: InputMaybe<ReadonlyArray<SalesOrderStatusEnumOperationFilterInput>>;
};

/** Restricts the filter operations available when filtering sales orders. */
export type SalesOrderStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SalesOrderStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<SalesOrderStringOperationFilterInput>>;
};

/** A connection to a list of items. */
export type SalesOrdersConnection = {
  readonly __typename?: 'SalesOrdersConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<SalesOrdersEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<SalesOrder>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SalesOrdersEdge = {
  readonly __typename?: 'SalesOrdersEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: SalesOrder;
};

/** Represents a sales person. */
export type SalesPerson = Node & {
  readonly __typename?: 'SalesPerson';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The sales person code. */
  readonly code: Scalars['String']['output'];
  /** The creation date and time of the sales person. */
  readonly created: Scalars['DateTime']['output'];
  /** The customers associated with the sales person. */
  readonly customers: Maybe<CustomersConnection>;
  /** The sales person direct number. */
  readonly directNumber: Maybe<Scalars['String']['output']>;
  /** The sales person first name. */
  readonly firstname: Scalars['String']['output'];
  /** The unique identifier for the sales person. */
  readonly id: Scalars['ID']['output'];
  /** The sales person identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The sales person last name. */
  readonly lastname: Scalars['String']['output'];
  /** The last modified date and time of the sales person. */
  readonly modified: Scalars['DateTime']['output'];
  /** The sales person primary email. */
  readonly primaryEmail: Scalars['String']['output'];
  /** The region associated with the sales person. */
  readonly region: Maybe<Region>;
  /** The sales person secondary email. */
  readonly secondaryEmail: Maybe<Scalars['String']['output']>;
  /** The source identifier for the sales person. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};


/** Represents a sales person. */
export type SalesPersoncustomersArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};

export type SalesPersonFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SalesPersonFilterInput>>;
  readonly code: InputMaybe<SalesPersonStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<SalesPersonFilterInput>>;
  readonly primaryEmail: InputMaybe<SalesPersonStringOperationFilterInput>;
};

/** Restricts the filter operations available when filtering salespersons. */
export type SalesPersonStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SalesPersonStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<SalesPersonStringOperationFilterInput>>;
};

/** A connection to a list of items. */
export type SalesPersonsByRegionConnection = {
  readonly __typename?: 'SalesPersonsByRegionConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<SalesPersonsByRegionEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<SalesPerson>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SalesPersonsByRegionEdge = {
  readonly __typename?: 'SalesPersonsByRegionEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: SalesPerson;
};

/** A connection to a list of items. */
export type SalesPersonsConnection = {
  readonly __typename?: 'SalesPersonsConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<SalesPersonsEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<SalesPerson>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SalesPersonsEdge = {
  readonly __typename?: 'SalesPersonsEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: SalesPerson;
};

export type SecurityType =
  | 'READ_ONLY'
  | 'READ_WRITE';

/** Represents a segment color. */
export type SegmentColor = Node & {
  readonly __typename?: 'SegmentColor';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The segment color code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the segment color. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the segment color. */
  readonly id: Scalars['ID']['output'];
  /** The URI of the segment color image. */
  readonly imageUri: Maybe<Scalars['String']['output']>;
  /** The segment color identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the segment color. */
  readonly modified: Scalars['DateTime']['output'];
  /** The segment color name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the segment color. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the segment color. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
  /** The web color associated with the segment color. */
  readonly webColor: Maybe<WebColor>;
};

export type SegmentColorFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SegmentColorFilterInput>>;
  readonly code: InputMaybe<SegmentColorOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<SegmentColorFilterInput>>;
};

/** Restricts the filter operations available when filtering suppliers. */
export type SegmentColorOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SegmentColorOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<SegmentColorOperationFilterInput>>;
};

/** Represents a segment size. */
export type SegmentSize = Node & {
  readonly __typename?: 'SegmentSize';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The segment size code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the segment size. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the segment size. */
  readonly id: Scalars['ID']['output'];
  /** The segment size identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the segment size. */
  readonly modified: Scalars['DateTime']['output'];
  /** The segment size name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The size group associated with the segment size. */
  readonly sizeGroup: Maybe<SizeGroup>;
  /** The sort index for the segment size. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the segment size. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
  /** The type associated with the segment size. */
  readonly type: Maybe<EnumLookup>;
  /** The unit of measure associated with the segment size. */
  readonly unitOfMeasure: Maybe<UnitOfMeasure>;
};

export type SegmentSizeFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SegmentSizeFilterInput>>;
  readonly code: InputMaybe<SegmentSizeOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<SegmentSizeFilterInput>>;
};

/** Restricts the filter operations available when filtering segment sizes. */
export type SegmentSizeOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<SegmentSizeOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<SegmentSizeOperationFilterInput>>;
};

export type ServerError = Error & {
  readonly __typename?: 'ServerError';
  readonly errorType: OrderErrorType;
  readonly items: Maybe<ReadonlyArray<Scalars['String']['output']>>;
  readonly message: Scalars['String']['output'];
  readonly requestReference: Scalars['String']['output'];
};

export type ShareArtworkError = BadRequestException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for sharing of a artwork. */
export type ShareArtworkInput = {
  /** The Identifier of the artwork object. */
  readonly artworkId: Scalars['ID']['input'];
  /** List of Contact Ids to removed share access. */
  readonly contactIdsRevoke: ReadonlyArray<Scalars['UUID']['input']>;
  /** List of Contact Ids to share with. */
  readonly contactIdsShare: ReadonlyArray<Scalars['UUID']['input']>;
  /** List of Customer Codes to remove share access. */
  readonly customerCodesRevoke: ReadonlyArray<Scalars['String']['input']>;
  /** List of Customer Code to share with. */
  readonly customerCodesShare: ReadonlyArray<Scalars['String']['input']>;
  /** The Access  granted to the shared artwork. */
  readonly sharedAccess: InputMaybe<SecurityType>;
};

export type ShareArtworkPayload = {
  readonly __typename?: 'ShareArtworkPayload';
  readonly errors: Maybe<ReadonlyArray<ShareArtworkError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type ShareFolderError = BadRequestException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for sharing of a Folder. */
export type ShareFolderInput = {
  /** List of Contact Ids to removed share access. */
  readonly contactIdsRevoke: ReadonlyArray<Scalars['UUID']['input']>;
  /** List of Contact Ids to share with. */
  readonly contactIdsShare: ReadonlyArray<Scalars['UUID']['input']>;
  /** List of Customer Codes to remove share access. */
  readonly customerCodesRevoke: ReadonlyArray<Scalars['String']['input']>;
  /** List of Customer Code to share with. */
  readonly customerCodesShare: ReadonlyArray<Scalars['String']['input']>;
  /** The Identifier of the Folder object. */
  readonly folderId: Scalars['ID']['input'];
  /** The Access  granted to the shared folder. */
  readonly sharedAccess: InputMaybe<SecurityType>;
};

export type ShareFolderPayload = {
  readonly __typename?: 'ShareFolderPayload';
  readonly errors: Maybe<ReadonlyArray<ShareFolderError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/** Represents the permissions for a shared resource. */
export type SharingSecurity = {
  readonly __typename?: 'SharingSecurity';
  /** The resource access level. */
  readonly access: SharingSecurityAccess;
  /** The customer contact that the resource is shared with. */
  readonly contact: OwnerContact;
  /** The customer that the resource is shared with. */
  readonly customer: OwnerCustomer;
};

export type SharingSecurityAccess =
  | 'READ'
  | 'READ_WRITE';

/** Represents a size group. */
export type SizeGroup = Node & {
  readonly __typename?: 'SizeGroup';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The size group code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the size group. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the size group. */
  readonly id: Scalars['ID']['output'];
  /** The size group identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the size group. */
  readonly modified: Scalars['DateTime']['output'];
  /** The size group name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the size group. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the size group. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents a stock class. */
export type StockClass = Node & {
  readonly __typename?: 'StockClass';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The stock class code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the stock class. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the stock class. */
  readonly id: Scalars['ID']['output'];
  /** The stock class identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** Indicates whether the stock class is continuing or not. */
  readonly isContinuing: Scalars['Boolean']['output'];
  /** The last modified date and time of the stock class. */
  readonly modified: Scalars['DateTime']['output'];
  /** The stock class name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the stock class. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the stock class. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

/** Represents the stock level of a product. */
export type StockIncomingLevel = {
  readonly __typename?: 'StockIncomingLevel';
  /** Incoming Estimated Time of Arrival. */
  readonly eta: Scalars['Date']['output'];
  /** Incoming Stock Level. */
  readonly incoming: Scalars['Int']['output'];
  /** The last modified date and time of the incoming level. */
  readonly modified: Scalars['DateTime']['output'];
};

/** Represents the stock level of a product. */
export type StockLevel = Node & {
  readonly __typename?: 'StockLevel';
  /** The available stock quantity. */
  readonly available: Scalars['Int']['output'];
  readonly code: Maybe<Scalars['String']['output']>;
  /** The confirmed reserved stock quantity. */
  readonly confirmedReserved: Scalars['Int']['output'];
  /** The unique identifier for the stock level. */
  readonly id: Scalars['ID']['output'];
  /**
   * Retrieves the incoming levels for the parent stock level.
   *
   *
   * **Returns:**
   * A List of Incoming Stock Levels.
   */
  readonly incomingLevels: ReadonlyArray<StockIncomingLevel>;
  /** The reserved stock quantity on incoming stock levels. */
  readonly incomingReserved: Scalars['Int']['output'];
  /** The stock level identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The inventory level of bonded stock. */
  readonly inventoryBonded: Scalars['Int']['output'];
  /** The inventory level of free stock. */
  readonly inventoryFree: Scalars['Int']['output'];
  /** The date and time when the stock level was last modified. */
  readonly modified: Scalars['DateTime']['output'];
  readonly product: Maybe<Product>;
  /**
   * Retrieves projected stock levels for the specified stock level variant.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a collection of stock projections for
   * the specified variant. Returns an empty collection if the variant identifier is null.
   */
  readonly projections: ReadonlyArray<StockProjection>;
  /** The reserved stock quantity. */
  readonly reserved: Scalars['Int']['output'];
  readonly segmentColorCode: Maybe<Scalars['String']['output']>;
  readonly sku: Maybe<Scalars['String']['output']>;
  readonly soldAsCode: Maybe<Scalars['String']['output']>;
  /** The source identifier. */
  readonly sourceIdentifier: Scalars['String']['output'];
  readonly styleCode: Maybe<Scalars['String']['output']>;
  /** The timestamp of the stock level. */
  readonly timestamp: Scalars['Long']['output'];
  /** The total incoming stock quantity. */
  readonly totalIncoming: Scalars['Int']['output'];
  /**
   * Gets the stock level type associated with the specified stock level.
   *
   *
   * **Returns:**
   * A value of type StockLevelType representing the type of the specified stock level. Returns StockLevelType.Unknown
   * if the type cannot be determined.
   */
  readonly type: StockLevelType;
  readonly variant: Maybe<Variant>;
  /**
   * Retrieves the level for all variants of the Parent product stock level.
   *
   *
   * **Returns:**
   * A List of Variant stock levels.
   */
  readonly variants: ReadonlyArray<StockLevel>;
};

/** Represents a delta of changes in stock levels. */
export type StockLevelDeltaIndex = {
  readonly __typename?: 'StockLevelDeltaIndex';
  /** The last modified date of the stock level. */
  readonly modified: Scalars['DateTime']['output'];
  /**
   * The timestamp of the latest change in stock level.
   * Use this in the next call to delta to get the latest changes.
   */
  readonly timestamp: Scalars['Long']['output'];
};

export type StockLevelFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<StockLevelFilterInput>>;
  readonly available: InputMaybe<GatewayIntOperationFilterInput>;
  readonly confirmedReserved: InputMaybe<GatewayIntOperationFilterInput>;
  readonly inProcess: InputMaybe<GatewayIntOperationFilterInput>;
  readonly incomingReserved: InputMaybe<GatewayIntOperationFilterInput>;
  readonly inventoryBonded: InputMaybe<GatewayIntOperationFilterInput>;
  readonly inventoryFree: InputMaybe<GatewayIntOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<StockLevelFilterInput>>;
  readonly reserved: InputMaybe<GatewayIntOperationFilterInput>;
  readonly totalIncoming: InputMaybe<GatewayIntOperationFilterInput>;
  readonly warehouse: InputMaybe<GatewayIntOperationFilterInput>;
};

export type StockLevelType =
  | 'COLOR'
  | 'STYLE'
  | 'UNKNOWN'
  | 'VARIANT';

/** A connection to a list of items. */
export type StockLevelsConnection = {
  readonly __typename?: 'StockLevelsConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<StockLevelsEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<StockLevel>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

/** A connection to a list of items. */
export type StockLevelsDeltaConnection = {
  readonly __typename?: 'StockLevelsDeltaConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<StockLevelsDeltaEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<StockLevel>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

/** An edge in a connection. */
export type StockLevelsDeltaEdge = {
  readonly __typename?: 'StockLevelsDeltaEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: StockLevel;
};

/** An edge in a connection. */
export type StockLevelsEdge = {
  readonly __typename?: 'StockLevelsEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: StockLevel;
};

/**
 * Represents a projection of stock quantities for a specific date, including incoming, opening, and projected
 * inventory levels.
 */
export type StockProjection = {
  readonly __typename?: 'StockProjection';
  /** The quantity of stock expected to be received by the projected date. This includes any incoming inventory that */
  readonly incomingQuantity: Scalars['Int']['output'];
  /** The quantity of stock available at the beginning of the projection period. This represents the inventory level */
  readonly openingQuantity: Scalars['Int']['output'];
  /** The date for which the stock projection is calculated. This represents the future date when the projected */
  readonly projectedDate: Scalars['Date']['output'];
  /** The projected quantity of stock available on the projected date, calculated based on the opening quantity and */
  readonly projectedQuantity: Scalars['Int']['output'];
};

export type StockProjectionFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<StockProjectionFilterInput>>;
  readonly incomingQuantity: InputMaybe<GatewayIntOperationFilterInput>;
  readonly openingStockLevel: InputMaybe<GatewayIntOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<StockProjectionFilterInput>>;
  readonly projectedDate: InputMaybe<GatewayDateOperationFilterInput>;
  readonly projectedStockLevel: InputMaybe<GatewayIntOperationFilterInput>;
};

export type TagArtworkError = BadRequestException | ConflictException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for linking an artwork tag. */
export type TagArtworkInput = {
  /** The identifier of the artwork. */
  readonly artworkId: Scalars['ID']['input'];
  /** Gets the list of tag identifiers associated with the entity. */
  readonly tagIds: ReadonlyArray<Scalars['ID']['input']>;
};

export type TagArtworkPayload = {
  readonly __typename?: 'TagArtworkPayload';
  readonly errors: Maybe<ReadonlyArray<TagArtworkError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type TextEncoding =
  | 'TEXT_HTML'
  | 'TEXT_PLAIN'
  | 'UNKNOWN';

/** Represents a tier. */
export type Tier = Node & {
  readonly __typename?: 'Tier';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The tier code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the tier. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the tier. */
  readonly id: Scalars['ID']['output'];
  /** The tier identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the tier. */
  readonly modified: Scalars['DateTime']['output'];
  /** The tier name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The region associated with the tier. */
  readonly region: Maybe<Region>;
  /** The sort index for the tier. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the tier. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

export type TierFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<TierFilterInput>>;
  readonly code: InputMaybe<TierStringOperationFilterInput>;
  readonly name: InputMaybe<TierStringOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<TierFilterInput>>;
};

/** Restricts the filter operations available when filtering tiers. */
export type TierStringOperationFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<TierStringOperationFilterInput>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly or: InputMaybe<ReadonlyArray<TierStringOperationFilterInput>>;
};

/** Represents an exception that is thrown when a request lacks valid authentication credentials. */
export type UnauthorizedException = Error & {
  readonly __typename?: 'UnauthorizedException';
  /** Gets or sets additional data associated with the object as key-value pairs. */
  readonly additionalData: Maybe<ReadonlyArray<KeyValuePairOfStringAndString>>;
  /** Gets the error code associated with the exception. */
  readonly code: Scalars['Long']['output'];
  /** Gets the detailed error message associated with the current operation. */
  readonly errorDetail: Maybe<Scalars['String']['output']>;
  /** Gets the error message associated with the exception. */
  readonly message: Scalars['String']['output'];
};

/** Represents a unit of measure. */
export type UnitOfMeasure = Node & {
  readonly __typename?: 'UnitOfMeasure';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The unit of measure code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the unit of measure. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the unit of measure. */
  readonly id: Scalars['ID']['output'];
  /** The unit of measure identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the unit of measure. */
  readonly modified: Scalars['DateTime']['output'];
  /** The unit of measure name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The number of decimal places for the unit of measure. */
  readonly precision: Scalars['Byte']['output'];
  /** The sort index for the unit of measure. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the unit of measure. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The symbol representing the unit of measure. */
  readonly symbol: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};

export type UpdateArtworkError = BadRequestException | ConflictException | NotFoundException | UnauthorizedException;

export type UpdateArtworkFolderError = BadRequestException | ConflictException | InputValidationException | NotFoundException | UnauthorizedException;

/** Input type for updating a folder. */
export type UpdateArtworkFolderInput = {
  /** The identifier of the folder. */
  readonly folderId: Scalars['ID']['input'];
  /** The new name of the folder. */
  readonly name: Scalars['String']['input'];
};

export type UpdateArtworkFolderPayload = {
  readonly __typename?: 'UpdateArtworkFolderPayload';
  readonly errors: Maybe<ReadonlyArray<UpdateArtworkFolderError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/** Input type for updating an artwork. */
export type UpdateArtworkInput = {
  /** The description of the artwork. */
  readonly description: InputMaybe<Scalars['String']['input']>;
  /** The identifier of the artwork. */
  readonly id: Scalars['ID']['input'];
  /** The name of the artwork. */
  readonly name: InputMaybe<Scalars['String']['input']>;
};

export type UpdateArtworkPayload = {
  readonly __typename?: 'UpdateArtworkPayload';
  readonly errors: Maybe<ReadonlyArray<UpdateArtworkError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type UpdateArtworkRetentionIndicatorError = BadRequestException | ConflictException | NotFoundException;

export type UpdateArtworkRetentionIndicatorInput = {
  /** The unique identifier of the artwork. */
  readonly artworkId: Scalars['ID']['input'];
};

export type UpdateArtworkRetentionIndicatorPayload = {
  readonly __typename?: 'UpdateArtworkRetentionIndicatorPayload';
  readonly errors: Maybe<ReadonlyArray<UpdateArtworkRetentionIndicatorError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type UpdateArtworkTagError = BadRequestException | ConflictException | NotFoundException | UnauthorizedException;

/** Input type for updating an artwork tag. */
export type UpdateArtworkTagInput = {
  /** The color of the artwork tag in hex format (e.g., "FF5733"). */
  readonly color: InputMaybe<Scalars['String']['input']>;
  /** The identifier of the artwork tag. */
  readonly id: Scalars['ID']['input'];
  /** The name of the artwork tag. */
  readonly name: InputMaybe<Scalars['String']['input']>;
};

export type UpdateArtworkTagPayload = {
  readonly __typename?: 'UpdateArtworkTagPayload';
  readonly errors: Maybe<ReadonlyArray<UpdateArtworkTagError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type UpdateGlobalSharingError = ConflictException | NotFoundException | UnauthorizedException;

/** Input type to update global sharing. */
export type UpdateGlobalSharingInput = {
  /** The securityType for the global sharing record. */
  readonly securityType: SecurityType;
};

export type UpdateGlobalSharingPayload = {
  readonly __typename?: 'UpdateGlobalSharingPayload';
  readonly errors: Maybe<ReadonlyArray<UpdateGlobalSharingError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

export type UpdateJobCardBrandingInfoError = ConflictException;

/** Represents the input data required to update the branding information of a job card. */
export type UpdateJobCardBrandingInfoInput = {
  /** The list of job card requests, each containing the job card number and associated branding details. */
  readonly jobCards: ReadonlyArray<JobCardBrandingDetailInput>;
  /** The master job card number for which the branding information is to be updated. */
  readonly masterJobCardNumber: Scalars['String']['input'];
};

export type UpdateJobCardBrandingInfoPayload = {
  readonly __typename?: 'UpdateJobCardBrandingInfoPayload';
  readonly errors: Maybe<ReadonlyArray<UpdateJobCardBrandingInfoError>>;
  readonly resultPayloadType: Maybe<ResultPayloadType>;
};

/** Represents a variant of a product style. */
export type Variant = Node & {
  readonly __typename?: 'Variant';
  /**
   * Retrieves the list of product attributes associated with the specified variant.
   *
   *
   * **Returns:**
   * A list of product attributes associated with the specified variant, or null if no attributes are found.
   */
  readonly attributes: Maybe<ReadonlyArray<ProductAttribute>>;
  /**
   * Retrieves the collection of branding positions associated with the specified variant asynchronously.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains an enumerable collection of
   * BrandingPosition objects for the specified variant.
   */
  readonly brandingPositions: ReadonlyArray<BrandingPosition>;
  /** The code for the variant. */
  readonly code: Scalars['String']['output'];
  /** The creation date and time of the variant. */
  readonly created: Scalars['DateTime']['output'];
  /**
   * Retrieves the e-commerce detail information for the specified variant using the provided web preference service.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the e-commerce detail for the variant,
   * or null if no detail is available.
   */
  readonly eCommerceDetail: Maybe<VariantECommerceDetail>;
  /**
   * Retrieves the collection of component variants that make up the specified giftset variant.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains an enumerable collection of component
   * variants, or null if no components are found.
   */
  readonly giftsetComponents: Maybe<ReadonlyArray<ProductSetContent>>;
  /** The unique identifier for the variant. */
  readonly id: Scalars['ID']['output'];
  /**
   * Gets the internal identifier of the variant.
   *
   *
   * **Returns:**
   * The internal identifier of the variant.
   */
  readonly internalId: Scalars['Int']['output'];
  /** Gets or sets a value indicating whether the variant is active. */
  readonly isActive: Scalars['Boolean']['output'];
  /** Indication if the variant is continuing or not. */
  readonly isContinuing: Scalars['Boolean']['output'];
  /** Indicates whether the variant is new or not. New variants are those which have arrived for the first time in the last 365 days. */
  readonly isNew: Scalars['Boolean']['output'];
  /** Variant's first landed date at the Woodmead facility. */
  readonly landedDate: Maybe<Scalars['Date']['output']>;
  /**
   * Retrieves the collection of matching style variants for the specified product variant.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a collection of matching style
   * variants, or null if no matches are found.
   */
  readonly matchingStyles: Maybe<ReadonlyArray<ProductMatchingStyleVariant>>;
  /** The minimum order quantity for the variant. */
  readonly minimumOrderQuantity: Maybe<Scalars['Int']['output']>;
  /** The last modified date and time of the variant. */
  readonly modified: Scalars['DateTime']['output'];
  /**
   * Gets the packaging associated with the variant.
   *
   *
   * **Returns:**
   * The packaging associated with the variant.
   */
  readonly packaging: ReadonlyArray<Packaging>;
  /**
   * Gets the packaging associated with the variant by packaging type.
   *
   *
   * **Returns:**
   * The packaging associated with the variant and type, or null if not found.
   */
  readonly packagingByType: Maybe<Packaging>;
  /**
   * The prices associated with the variant.
   *
   *
   * **Returns:**
   * The prices associated with the variant.
   */
  readonly prices: Maybe<ReadonlyArray<Price>>;
  /**
   * Gets the product associated with the variant.
   *
   *
   * **Returns:**
   * The product associated with the variant.
   */
  readonly product: Product;
  /**
   * Retrieves the collection of media items associated with the specified product variant.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains a collection of product media items for
   * the specified variant. The collection is empty if no media items are found.
   */
  readonly productMedia: ReadonlyArray<ProductMedia>;
  /**
   * Gets the segment color associated with the variant.
   *
   *
   * **Returns:**
   * The segment color associated with the variant, or null if not found.
   */
  readonly segmentColor: Maybe<SegmentColor>;
  /**
   * Gets the segment size associated with the variant.
   *
   *
   * **Returns:**
   * The segment size associated with the variant, or null if not found.
   */
  readonly segmentSize: Maybe<SegmentSize>;
  /** The SKU (Stock Keeping Unit) for the variant. */
  readonly sku: Scalars['String']['output'];
  /** The source identifier for the variant. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The stock class identifier associated with the variant. */
  readonly stockClassId: Scalars['Int']['output'];
  /**
   * Gets the stock level associated with the variant.
   *
   *
   * **Returns:**
   * The stock level associated with the variant, or null if not found.
   */
  readonly stockLevel: Maybe<StockLevel>;
  /** The timestamp for the variant. */
  readonly timestamp: Scalars['Long']['output'];
};


/** Represents a variant of a product style. */
export type VariantattributesArgs = {
  where: InputMaybe<ProductAttributeFilterInput>;
};


/** Represents a variant of a product style. */
export type VariantgiftsetComponentsArgs = {
  where: InputMaybe<ProductSetContentFilterInput>;
};


/** Represents a variant of a product style. */
export type VariantmatchingStylesArgs = {
  where: InputMaybe<ProductMatchingStyleVariantFilterInput>;
};


/** Represents a variant of a product style. */
export type VariantpackagingByTypeArgs = {
  packagingType: Scalars['String']['input'];
};


/** Represents a variant of a product style. */
export type VariantpricesArgs = {
  where: InputMaybe<PriceFilterInput>;
};


/** Represents a variant of a product style. */
export type VariantproductMediaArgs = {
  where: InputMaybe<ProductImageFilterInput>;
};

/**
 * Represents the e-commerce details of a variant, including metadata such as timestamps,  web-friendly name, and
 * description.
 */
export type VariantECommerceDetail = {
  readonly __typename?: 'VariantECommerceDetail';
  /**
   * Retrieves the behavior associated with the specified e-commerce variant detail.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the behavior associated with the
   * specified variant.
   */
  readonly behavior: Behavior;
  /** The date and time when the entity was created. */
  readonly created: Scalars['DateTime']['output'];
  /**
   * Returns the product description for the specified e-commerce variant, optionally encoded according to the specified
   * text encoding.
   *
   *
   * **Returns:**
   * A string containing the product description in the requested encoding, or null if the description is not available.
   */
  readonly description: Maybe<Scalars['String']['output']>;
  /** The date and time when the entity was last modified. */
  readonly modified: Scalars['DateTime']['output'];
  /** The web friendly name of the Variant. */
  readonly name: Maybe<Scalars['String']['output']>;
  /**
   * Retrieves the promotion associated with the specified e-commerce variant detail.
   *
   *
   * **Returns:**
   * A task that represents the asynchronous operation. The task result contains the promotion associated with the
   * specified variant.
   */
  readonly promotion: Promotion;
  /** The timestamp for the product web preferences. */
  readonly timestamp: Scalars['Long']['output'];
};


/**
 * Represents the e-commerce details of a variant, including metadata such as timestamps,  web-friendly name, and
 * description.
 */
export type VariantECommerceDetaildescriptionArgs = {
  textEncoding: InputMaybe<TextEncoding>;
};

export type VariantFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<VariantFilterInput>>;
  readonly code: InputMaybe<ProductStringOperationFilterInput>;
  readonly history: InputMaybe<HistoryFilterInput>;
  readonly isActive: InputMaybe<GatewayBoolOperationFilterInput>;
  readonly isNew: InputMaybe<GatewayBoolOperationFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<VariantFilterInput>>;
  readonly prices: InputMaybe<ListPriceFilterTypeFilterInput>;
  readonly product: InputMaybe<ProductFilterInput>;
  readonly segmentColor: InputMaybe<SegmentColorFilterInput>;
  readonly segmentSize: InputMaybe<SegmentSizeFilterInput>;
  readonly sku: InputMaybe<ProductStringOperationFilterInput>;
  readonly stockLevels: InputMaybe<ListStockLevelFilterTypeFilterInput>;
  readonly stockProjections: InputMaybe<ListStockProjectionFilterTypeFilterInput>;
  readonly variantECommerceDetail: InputMaybe<VariantWebsitePreferenceFilterInput>;
};

export type VariantWebsitePreferenceFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<VariantWebsitePreferenceFilterInput>>;
  readonly or: InputMaybe<ReadonlyArray<VariantWebsitePreferenceFilterInput>>;
  readonly promotion: InputMaybe<PromotionFilterInput>;
};

/** A connection to a list of items. */
export type VariantsConnection = {
  readonly __typename?: 'VariantsConnection';
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<VariantsEdge>>;
  /** A flattened list of the nodes. */
  readonly nodes: Maybe<ReadonlyArray<Variant>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type VariantsEdge = {
  readonly __typename?: 'VariantsEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  readonly node: Variant;
};

/**
 * Represents an authenticated viewer in the system, encapsulating user identity, associated customer information, and
 * impersonation scope.
 */
export type Viewer = {
  readonly __typename?: 'Viewer';
  /**
   * The customer associated with the authenticated user, if applicable. This property may be null if the user is
   * not directly associated with a customer or if the information is not available. It provides context about
   * the customer's details and can be used for authorization and personalization purposes.
   */
  readonly customer: Maybe<Customer>;
  /**
   * The customer contact associated with the authenticated user, if applicable. This property may be null if the
   * user is not directly associated with a customer contact or if the information is not available. It provides
   * context about the contact's details and can be used for authorization and personalization purposes.
   */
  readonly customerContact: Maybe<CustomerContact>;
  /**
   * The unique identifier of the authenticated user. This could be a username, email, or any other form of
   * identity depending on the authentication mechanism in place.
   */
  readonly identity: Scalars['String']['output'];
  /**
   * The type of identity used for authentication. This property indicates the specific identity category
   * assigned to the viewer, such as "Service", "User", or "Integrator". It can be
   * used to determine how to handle the identity and what claims or permissions they may have based on
   * the identity type.
   */
  readonly identityType: GatewayIdentityType;
  /**
   * The scope of customers that the authenticated user can impersonate, if applicable. This property may be null
   * if the user does not have impersonation privileges or if the information is not available. It provides
   * context about the customers that the user can act on behalf of.
   */
  readonly impersonationScope: Maybe<ReadonlyArray<Customer>>;
};

/** Represents a web color. */
export type WebColor = {
  readonly __typename?: 'WebColor';
  /** The checksum for change tracking. */
  readonly checksum: Maybe<Scalars['String']['output']>;
  /** The web color code. */
  readonly code: Maybe<Scalars['String']['output']>;
  /** The web color hexadecimal code. */
  readonly colorHex: Maybe<Scalars['String']['output']>;
  /** The creation date and time of the web color. */
  readonly created: Scalars['DateTime']['output'];
  /** The unique identifier for the web color. */
  readonly id: Scalars['Int']['output'];
  /** The web color identifier. */
  readonly internalId: Scalars['Int']['output'];
  /** The last modified date and time of the web color. */
  readonly modified: Scalars['DateTime']['output'];
  /** The web color name. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The sort index for the web color. */
  readonly sortIndex: Scalars['Int']['output'];
  /** The source identifier for the web color. */
  readonly sourceIdentifier: Maybe<Scalars['String']['output']>;
  /** The timestamp for concurrency control. */
  readonly timestamp: Scalars['Long']['output'];
};
