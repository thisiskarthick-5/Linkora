import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'accent' | 'outline';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const CustomButton: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return { backgroundColor: theme.primary };
            case 'secondary':
                return { backgroundColor: theme.secondary };
            case 'accent':
                return { backgroundColor: theme.accent };
            case 'outline':
                return { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.primary };
            default:
                return { backgroundColor: theme.primary };
        }
    };

    const getTextColor = () => {
        if (variant === 'outline') return theme.primary;
        return theme.white;
    };

    return (
        <TouchableOpacity
            style={[styles.button, getVariantStyles(), style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
