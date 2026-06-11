import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { findUserByEmail } from '../data/store.js';

const router = Router();

const FARMING_RESPONSES = {
  weather: (farm) =>
    `Current conditions in **${farm.state}**: Clear skies, 28°C. Humidity 62%. No rain expected for 3 days — good for field work.\n\nSoil moisture: **68%** (optimal). Next irrigation recommended **Friday 6 AM**.`,
  market: () =>
    `**Today's Mandi Prices (Punjab):**\n\n• Wheat: ₹2,350/qtl (+1.2%)\n• Cotton: ₹6,800/qtl (+2.4%)\n• Mustard: ₹5,420/qtl (+0.8%)\n\nWheat prices trending upward — consider selling 40% of stored stock this week.`,
  irrigation: () =>
    `**Irrigation Schedule:**\n\nNo irrigation needed today. Soil moisture at 68%.\n\n• CRI stage (21 days): Critical 1st irrigation\n• Tillering (40–45 days): 2nd irrigation\n• Flowering (90 days): Most critical stage`,
  default: (query, farm) =>
    `Based on your farm (${farm.area} acres, ${farm.state}, ${farm.crops.join(' & ')}), here's my analysis for **"${query}"**:\n\nCurrent conditions look favorable. Soil moisture is at optimal 68%, temperature 28°C, and market prices are trending upward.\n\n**Recommendation:** Continue current practices and monitor field conditions. Consider applying micronutrients in the next irrigation cycle for best yield.`,
};

function buildResponse(message, farm) {
  const lower = message.toLowerCase();
  if (lower.includes('weather') || lower.includes('rain') || lower.includes('temperature')) {
    return { text: FARMING_RESPONSES.weather(farm), chips: ['Irrigation schedule', 'Pest forecast', 'Market prices'] };
  }
  if (lower.includes('market') || lower.includes('price') || lower.includes('mandi') || lower.includes('sell')) {
    return { text: FARMING_RESPONSES.market(), chips: ['Profit prediction', 'Best crop to sell', 'Storage tips'] };
  }
  if (lower.includes('irrigation') || lower.includes('water') || lower.includes('moisture')) {
    return { text: FARMING_RESPONSES.irrigation(), chips: ['Set reminder', 'Drip vs flood', 'Soil health'] };
  }
  if (lower.includes('wheat') && (lower.includes('sow') || lower.includes('variety') || lower.includes('october'))) {
    return {
      text: `For **${farm.state}** in October (early Rabi season), I recommend:\n\n🌾 **Wheat** — HD-2967 or PBW-550 are ideal varieties. Sow between Oct 15–Nov 5 for best yield (22–28 q/acre).\n\n🌱 **Mustard** — Pusa Bold or RH-30 for intercropping. Yield 12–15 q/acre, profit ₹22,000+/acre.\n\n💡 **Tip:** Apply DAP @ 2 bags/acre as basal dose. Current wheat MSP is ₹2,275/qtl.`,
      chips: ['Best wheat variety?', 'When to sow mustard?', 'DAP dosage guide'],
    };
  }
  return { text: FARMING_RESPONSES.default(message, farm), chips: ['Tell me more', 'Set a reminder', 'Market outlook'] };
}

router.post('/chat', requireAuth, (req, res) => {
  const { message } = req.body;
  if (!message?.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const user = findUserByEmail(req.user.email);
  const farm = user?.farm || { state: 'Punjab', area: 12, crops: ['Wheat', 'Cotton'] };
  const response = buildResponse(message.trim(), farm);
  res.json(response);
});

export default router;
