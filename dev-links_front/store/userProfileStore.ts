import { create } from "zustand";

interface Link {
  platform: string;
  link: string;
}

interface UserProfile {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  links: Link[];
}

interface UserProfileStore {
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addLink: (link: Link) => void;
  removeLink: (index: number) => void;
  updateLink: (index: number, link: Partial<Link>) => void;
}

const initialUserProfile: UserProfile = {
  image: "",
  firstName: "",
  lastName: "",
  email: "",
  profileImage: "",
  links: [],
};

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  userProfile: initialUserProfile,

  updateProfile: (profile) =>
    set((state) => ({
      userProfile: { ...state.userProfile, ...profile },
    })),

  addLink: (link) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        links: [...state.userProfile.links, link],
      },
    })),

  removeLink: (index) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        links: state.userProfile.links.filter((_, i) => i !== index),
      },
    })),

  updateLink: (index, link) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        links: state.userProfile.links.map((l, i) =>
          i === index ? { ...l, ...link } : l
        ),
      },
    })),
}));
