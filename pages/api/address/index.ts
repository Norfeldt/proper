import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { q: query } = req.query
    fetch(
      `https://api.dataforsyningen.dk/adresser?q=${encodeURIComponent(String(query))}&per_side=10`,
      {
        headers: { token: process.env.TOKEN },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((error) => {
        res.status(404)
      })
  } else {
    res.status(400).send('Only GET requests are supported')
  }
}
