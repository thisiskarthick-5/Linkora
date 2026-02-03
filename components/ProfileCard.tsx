import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

interface ProfileCardProps {
    name: string;
    domain: string;
    avatar: string;
    onPress: () => void;
    color?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    domain,
    avatar,
    onPress,
    color,
}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const { width } = useWindowDimensions();

    // Responsive padding and width calculation
    const horizontalPadding = Spacing.md;
    const cardWidth = (width - (horizontalPadding * 3)) / 2;

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: color || theme.card, width: cardWidth }]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }]}>
                        <Ionicons name="person" size={40} color="#000" />
                    </View>
                )}
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>1/2</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.domain} numberOfLines={1}>{domain}</Text>
                <View style={styles.footer}>
                    <View style={styles.authorContainer}>
                        <Ionicons name="person-circle" size={14} color="#000" />
                        <Text style={styles.author} numberOfLines={1}>by {name}</Text>
                    </View>
                    <Ionicons name="documents-outline" size={18} color="#000" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: BorderRadius.xl,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: Spacing.sm,
    },
    avatar: {
        width: '100%',
        height: 100,
        borderRadius: BorderRadius.lg,
    },
    statusBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: BorderRadius.full,
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#000',
    },
    statusText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        gap: Spacing.xs,
    },
    domain: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Spacing.xs,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flex: 1,
        marginRight: 4,
    },
    author: {
        fontSize: 10,
        color: '#000',
        opacity: 0.7,
    },
});
