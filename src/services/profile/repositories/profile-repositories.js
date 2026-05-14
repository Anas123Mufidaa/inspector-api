import prisma from '../../../utils/prisma.js';
import AuditRepositories from '../../audits/repositories/audit-repositories.js';

const ProfileRepositories = {
  async getProfile(user_id) {
    const user  = await prisma.user.findUnique({ where: { id: user_id } });
    const stats = await AuditRepositories.getUserAuditStats(user_id);
    return { ...user, stats };
  },

  async updateProfile(user_id, { name }) {
    return prisma.user.update({
      where: { id: user_id },
      data:  { name },
      select: { id: true, name: true, email: true, avatar_url: true, updated_at: true },
    });
  },
};

export default ProfileRepositories;