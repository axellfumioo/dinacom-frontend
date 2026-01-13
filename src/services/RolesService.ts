import { apiClient } from "@/common/lib/apiClient";
import { CreateRoleDto, UpdateRoleDto } from "@/common/dto/roleDto";
import { getCookies } from "@/lib/cookie";

class RolesService {

  async updateRole(id: string, dto: UpdateRoleDto) {
    const token = await getCookies();
    return apiClient({
      method: "patch",
      url: `/role/${id}/update`,
      data: dto,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async getAllRoles() {
    const token = await getCookies();
    return apiClient({
      method: "get",
      url: "/roles",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async createRole(dto: CreateRoleDto) {
    const token = await getCookies();
    return apiClient({
      method: "post",
      url: "/roles/create",
      data: dto,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async deleteRole(id: string) {
    const token = await getCookies();
    return apiClient({
      method: "delete",
      url: `api/v1/roles/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const rolesService = new RolesService();
