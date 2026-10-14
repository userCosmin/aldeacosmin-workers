import raw from './gallery.json';

export interface GalleryPhoto {
  src: string;
  title: string;
  /** Massif slug, see src/data/massifs.ts */
  massif: string;
}

export const GALLERY: GalleryPhoto[] = raw as GalleryPhoto[];
