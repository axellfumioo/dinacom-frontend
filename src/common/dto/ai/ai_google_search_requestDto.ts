export interface CreateGoogleSearchRequestDto {
    url: string;
    content: string;
    decisionId: string;
}

export interface UpdateGoogleSearchRequestDto {
    url?: string;
    content?: string;
}