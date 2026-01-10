export interface CreateWebExtractRequestDto {
    domain: string;
    content: string;
    decisionId: string;
}

export interface UpdateWebExtractRequestDto {
    domain?: string;
    content?: string;
}