import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ProfileData = {
    id: string;
    name: string;
    bio: string;
    domain: string;
    skills: string;
    avatar: string;
    color?: string;
    links: {
        github: string;
        linkedin: string;
    };
};

type ProfileContextType = {
    myProfile: ProfileData;
    serviceProviders: ProfileData[];
    updateMyProfile: (data: Partial<ProfileData>) => Promise<void>;
};

const DEFAULT_MY_PROFILE: ProfileData = {
    id: 'me-123',
    name: 'Karthick',
    bio: 'Full Stack Developer & UI Enthusiast',
    domain: 'Software Engineer',
    skills: 'React Native, Expo, Node.js',
    avatar: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/avatar_male_1_1770129424460.png',
    links: {
        github: 'https://github.com/karthick',
        linkedin: 'https://linkedin.com/in/karthick',
    },
};

const MOCK_PROVIDERS: ProfileData[] = [
    {
        id: '1',
        name: 'Joseph Smith',
        bio: 'Visual designer specializing in motion UI.',
        domain: 'UX Lab: Motion Edition',
        skills: 'Figma, After Effects',
        avatar: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/avatar_male_1_1770129424460.png',
        color: '#D49CFF',
        links: { github: '', linkedin: '' }
    },
    {
        id: '2',
        name: 'Sarah Chen',
        bio: 'Graphic artist and illustrator.',
        domain: 'Design Odyssey',
        skills: 'Illustration, Branding',
        avatar: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/avatar_female_1_1770129441162.png',
        color: '#D49CFF',
        links: { github: '', linkedin: '' }
    },
    {
        id: '3',
        name: 'Alex River',
        bio: 'Product manager focusing on developer tools.',
        domain: 'Focus Mode',
        skills: 'Product Management, Agile',
        avatar: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/avatar_male_2_1770129457295.png',
        color: '#FFB167',
        links: { github: '', linkedin: '' }
    },
    {
        id: '4',
        name: 'Emily R.',
        bio: 'Full stack web developer.',
        domain: 'Web Development',
        skills: 'React, Next.js, Node',
        avatar: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/avatar_female_1_1770129441162.png',
        color: '#7C93FF',
        links: { github: '', linkedin: '' }
    },
    {
        id: '5',
        name: 'Maksym B.',
        bio: 'SEO specialist and digital marketer.',
        domain: 'SEO Strategy',
        skills: 'Google Ads, Analytics',
        avatar: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/avatar_male_2_1770129457295.png',
        color: '#FFB167',
        links: { github: '', linkedin: '' }
    },
];

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [myProfile, setMyProfile] = useState<ProfileData>(DEFAULT_MY_PROFILE);
    const [serviceProviders, setServiceProviders] = useState<ProfileData[]>(MOCK_PROVIDERS);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const savedProfile = await AsyncStorage.getItem('@my_profile');
            if (savedProfile) {
                setMyProfile(JSON.parse(savedProfile));
            }
        } catch (e) {
            console.error('Failed to load profile', e);
        }
    };

    const updateMyProfile = async (data: Partial<ProfileData>) => {
        const updated = { ...myProfile, ...data };
        setMyProfile(updated);
        try {
            await AsyncStorage.setItem('@my_profile', JSON.stringify(updated));
        } catch (e) {
            console.error('Failed to save profile', e);
        }
    };

    return (
        <ProfileContext.Provider value={{ myProfile, serviceProviders, updateMyProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) throw new Error('useProfile must be used within a ProfileProvider');
    return context;
};
