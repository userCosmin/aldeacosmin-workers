export interface ChannelVideo {
  id: string;
  title: string;
  /** ISO date from the channel feed */
  published: string;
}

/** Mountain videos from youtube.com/@aldea.sorin.cosmin (channel feed, newest first). */
export const FEATURED_VIDEOS: ChannelVideo[] = [
  { id: '3YuwX8THWcE', title: 'Vârful Țarcu — Munții Țarcu', published: '2026-06-21' },
  { id: '4IKMy7UYW9A', title: 'Tăul Țapului — Munții Retezat', published: '2026-06-14' },
  { id: 'GW4Cgixgi5k', title: 'Lacul Tarnița — Apuseni', published: '2026-05-10' },
  { id: 'n0eGIvhfDzg', title: 'Vârful Negoiu din Munții Făgăraș', published: '2025-09-28' },
  { id: 'D-DJmCHe7-s', title: 'Munții Bucegi', published: '2025-08-02' },
  { id: 'Xwnt_cBHcd8', title: 'Lacul Pietrele — Munții Retezat', published: '2025-07-27' },
];

export const youtubeThumb = (id: string, quality: 'hqdefault' | 'maxresdefault' | 'mqdefault' = 'hqdefault') =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
