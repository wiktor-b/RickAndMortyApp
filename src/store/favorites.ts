import {atom} from 'jotai';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender?: string;
  origin?: {
    name: string;
  };
  image: string;
};

export const favoritesAtom = atom<Character[]>([]);
