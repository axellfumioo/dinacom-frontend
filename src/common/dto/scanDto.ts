import { AIRiskLevel } from "./airisklevelDto";

export interface createDecisionDto {
    needSearch: boolean;
    queries: string[];
    riskLevel: AIRiskLevel;
    requestType: "GOOGLE_SEARCH" | "EXTRACT" | "ANSWER";
}

export interface updateDecisionDto {
    needSearch?: boolean;
    queries?: string[];
    riskLevel?: AIRiskLevel;
    requestType?: "GOOGLE_SEARCH" | "EXTRACT" | "ANSWER";
}

