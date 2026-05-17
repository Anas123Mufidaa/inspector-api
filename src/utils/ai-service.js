const { InvariantError } = require('../exceptions/index.js');

const AI_BASE_URL = process.env.AI_SERVICE_URL;

const deriveRiskLabel = (botPercentage) => {
  if (botPercentage < 20) return 'low';
  if (botPercentage <= 30) return 'medium';
  return 'high';
};

const analyzeInstagramAccount = async (ig_username) => {
  const res = await fetch(`${AI_BASE_URL}/api/cek-bot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: ig_username }),
  });
  if (!res.ok) throw new InvariantError('AI service gagal memproses akun ini');
  const data = await res.json();
  if (data.status !== 'success') throw new InvariantError(data.message ?? 'AI service mengembalikan status gagal');
  return {
    total_sample:    data.total_sampel_diperiksa,
    bot_percentage:  data.metrik_kualitas.persentase_bot,
    real_percentage: data.metrik_kualitas.persentase_asli,
    recommendation:  data.rekomendasi,
    risk_label:      deriveRiskLabel(data.metrik_kualitas.persentase_bot),
    raw_ai_response: data,
  };
};

module.exports = { analyzeInstagramAccount, deriveRiskLabel };