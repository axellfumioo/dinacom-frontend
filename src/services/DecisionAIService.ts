import api from "@/common/lib/apiClient";
import toast from "toastify-js";
import { createDecisionDto, updateDecisionDto } from "@/common/dto/decisionDto";


class ScanService {
    public async createDecision(): Promise<[]> {
        const res = await api.create
        return res.data.data;
    };

    public async updateDecision(): Promise<[]> {
        const res = await api.create
        return res.data.data;
    }
}