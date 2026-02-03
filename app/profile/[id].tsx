import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/CustomButton';
import { BorderRadius, Colors, Spacing } from '../../constants/theme';
import { useProfile } from '../../context/ProfileContext';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function ProfileScreen() {
    const { id } = useLocalSearchParams();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const router = useRouter();
    const { width } = useWindowDimensions();
    const { serviceProviders, myProfile } = useProfile();

    // Find the profile from global context
    const profile = useMemo(() => {
        if (id === myProfile.id) return myProfile;
        return serviceProviders.find(p => p.id === id) || serviceProviders[0];
    }, [id, myProfile, serviceProviders]);

    const isTablet = width > 600;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
            <StatusBar style="light" />

            {/* Premium Sticky Header matching the Home/Portfolio style */}
            <View style={[styles.stickyHeader, { backgroundColor: profile.color || theme.primary }]}>
                <View style={styles.circleDecorator} />
                <View style={styles.topNav}>
                    <TouchableOpacity onPress={() => router.back()} style={[styles.navBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                        <Ionicons name="arrow-back" size={24} color={theme.white} />
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={[styles.navBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                            <Ionicons name="share-social" size={22} color={theme.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.navBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                            <Ionicons name="bookmark-outline" size={24} color={theme.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.headerProfileInfo}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: profile.avatar }} style={styles.avatarImg} />
                    </View>
                    <View style={styles.headerText}>
                        <Text style={[styles.profileName, { color: theme.white }]}>{profile.name}</Text>
                        <Text style={[styles.profileDomain, { color: 'rgba(255,255,255,0.9)' }]}>{profile.domain}</Text>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, isTablet && styles.tabletScroll]}>
                <View style={[styles.mainWrapper, isTablet && styles.tabletWrapper]}>

                    {/* Unified Modern Profile Container */}
                    <View style={[styles.unifiedModernContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        {/* Professional Bio Section */}
                        <View style={styles.modernInfoItem}>
                            <View style={[styles.iconBox, { backgroundColor: profile.color || theme.primary }]}>
                                <Ionicons name="person-outline" size={18} color={theme.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={[styles.modernLabel, { color: theme.text }]}>Professional Bio</Text>
                                <Text style={[styles.modernValue, { color: theme.text }]}>{profile.bio}</Text>
                            </View>
                        </View>

                        <View style={[styles.modernDivider, { backgroundColor: theme.border }]} />

                        {/* Expertise & Skills Section */}
                        <View style={styles.modernInfoItem}>
                            <View style={[styles.iconBox, { backgroundColor: profile.color || theme.primary }]}>
                                <Ionicons name="star-outline" size={18} color={theme.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={[styles.modernLabel, { color: theme.text }]}>Expertise & Skills</Text>
                                <View style={styles.skillSection}>
                                    {profile.skills.split(',').map((skill: string) => (
                                        <View key={skill} style={[styles.skillBadge, { backgroundColor: 'rgba(124, 147, 255, 0.08)', borderColor: 'rgba(124, 147, 255, 0.15)' }]}>
                                            <Text style={[styles.skillText, { color: theme.primary }]}>{skill.trim()}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={[styles.modernDivider, { backgroundColor: theme.border }]} />

                        {/* Availability Section */}
                        <View style={styles.modernInfoItem}>
                            <View style={[styles.iconBox, { backgroundColor: profile.color || theme.primary }]}>
                                <Ionicons name="calendar-outline" size={18} color={theme.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={[styles.modernLabel, { color: theme.text }]}>Availability</Text>
                                <Text style={[styles.modernValue, { color: theme.text }]}>Mon - Fri, 9:00 AM - 6:00 PM</Text>
                            </View>
                        </View>

                        <CustomButton
                            title={`Connect with ${profile.name.split(' ')[0]}`}
                            onPress={() => Alert.alert('Connect', `Starting a conversation with ${profile.name}...`)}
                            variant="primary"
                            style={styles.contactBtn}
                        />
                    </View>

                    <View style={styles.socialStrip}>
                        <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.card }]}>
                            <Ionicons name="logo-linkedin" size={24} color={theme.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.card }]}>
                            <Ionicons name="logo-github" size={24} color={theme.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.socialIcon, { backgroundColor: theme.card }]}>
                            <Ionicons name="globe-outline" size={24} color={theme.icon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerInfo}>
                        <Ionicons name="shield-checkmark" size={20} color={theme.success || '#4CAF50'} />
                        <Text style={[styles.footerText, { color: theme.icon }]}>Verified Professional Provider</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stickyHeader: {
        paddingTop: Spacing.md,
        paddingBottom: Spacing.xl,
        paddingHorizontal: Spacing.lg,
        borderBottomLeftRadius: BorderRadius.xl,
        borderBottomRightRadius: BorderRadius.xl,
        zIndex: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },
    circleDecorator: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    headerRight: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    navBtn: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerProfileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.lg,
    },
    avatarContainer: {
        width: 85,
        height: 85,
        borderRadius: BorderRadius.full,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.4)',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    avatarImg: {
        width: '100%',
        height: '100%',
    },
    headerText: {
        flex: 1,
        gap: 2,
    },
    profileName: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    profileDomain: {
        fontSize: 17,
        opacity: 0.9,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    tabletScroll: {
        alignItems: 'center',
    },
    mainWrapper: {
        padding: Spacing.lg,
        width: '100%',
        gap: Spacing.lg,
    },
    tabletWrapper: {
        maxWidth: 600,
    },
    unifiedModernContainer: {
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.03,
        shadowRadius: 15,
        elevation: 3,
        gap: Spacing.md,
    },
    modernInfoItem: {
        flexDirection: 'row',
        gap: Spacing.md,
        alignItems: 'center',
    },
    iconBox: {
        width: 38,
        height: 38,
        borderRadius: BorderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContent: {
        flex: 1,
        gap: 2,
    },
    modernLabel: {
        fontSize: 11,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1,
        opacity: 0.4,
    },
    modernValue: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '600',
    },
    modernDivider: {
        height: 1,
        width: '100%',
        opacity: 0.05,
    },
    skillSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 2,
    },
    skillBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
    },
    skillText: {
        fontSize: 12,
        fontWeight: '700',
    },
    contactBtn: {
        marginTop: Spacing.sm,
        height: 52,
        borderRadius: BorderRadius.md,
    },
    socialStrip: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.lg,
        marginTop: Spacing.sm,
    },
    socialIcon: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    footerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: Spacing.md,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '500',
        opacity: 0.6,
    },
});
