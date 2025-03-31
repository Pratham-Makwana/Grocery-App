import {create} from 'zustand';

interface MapRedStore {
  mapRef: any;
  setMapRef: (ref: any) => void;
}

export const useMapRefStore = create<MapRedStore>(set => ({
  mapRef: null,
  setMapRef: ref => set({mapRef: ref}),
}));
