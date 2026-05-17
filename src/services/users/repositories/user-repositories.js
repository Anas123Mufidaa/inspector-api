import prisma from '../../../utils/prisma.js';

const UserRepositories = {
  async findByProviderId(provider_id) {
    return prisma.user.findUnique({
      where: { provider_id },
    });
  },

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async createUser({ email, name, avatar_url, provider, provider_id }) {
    return prisma.user.create({
      data: { email, name, avatar_url, provider, provider_id },
    });
  },

  async updateUser(id, { name, avatar_url }) {
    return prisma.user.update({
      where: { id },
      data: { avatar_url },
    });
  },
};

export default UserRepositories;