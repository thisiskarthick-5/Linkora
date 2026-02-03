import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

interface CategoryChipProps {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    selected: boolean;
    onPress: () => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
    label,
    icon,
    selected,
    onPress,
}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: selected ? theme.black : theme.white },
                !selected && { borderWidth: 1, borderColor: theme.border }
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Ionicons name={icon} size={16} color={selected ? theme.white : theme.black} />
            <Text style={[styles.text, { color: selected ? theme.white : theme.black }]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.full,
        marginRight: Spacing.sm,
        gap: Spacing.xs,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    },
});
