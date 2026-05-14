import ProfileRepositories from '../repositories/profile-repositories.js';
import response from '../../../utils/response.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await ProfileRepositories.getProfile(req.user.id);
    return response(res, 200, 'Profil berhasil diambil', profile);
  } catch (err) {
    return next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updated = await ProfileRepositories.updateProfile(req.user.id, req.validated);
    return response(res, 200, 'Profil berhasil diperbarui', updated);
  } catch (err) {
    return next(err);
  }
};