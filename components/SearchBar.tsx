import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search professionals...',
    value,
    onChangeText,
    style,
}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <View style={[styles.container, { backgroundColor: theme.card }, style]}>
            <Ionicons name="search" size={20} color={theme.icon} style={styles.icon} />
            <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder={placeholder}
                placeholderTextColor={theme.icon}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        height: 50,
        borderRadius: BorderRadius.xl,
        marginVertical: Spacing.sm,
    },
    icon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
});
