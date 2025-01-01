import { fetchInstagramPhotos } from '../../src/server/api';

export default async function handler(req, res) {
  try {
    const data = await fetchInstagramPhotos();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
} 