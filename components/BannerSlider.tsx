import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { BorderRadius, Spacing } from '../constants/theme';

const { width } = Dimensions.get('window');
const BANNERS = [
    { id: '1', uri: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/platform_banner_1_1770128574320.png' },
    { id: '2', uri: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/platform_banner_2_1770128590583.png' },
    { id: '3', uri: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/platform_banner_3_1770128607968.png' },
];

export const BannerSlider: React.FC = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {BANNERS.map((banner) => (
                    <View key={banner.id} style={styles.slide}>
                        <Image source={{ uri: banner.uri }} style={styles.image} resizeMode="cover" />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: Spacing.md,
        height: 180,
    },
    scrollContent: {
        paddingHorizontal: Spacing.md,
    },
    slide: {
        width: width - (Spacing.md * 2),
        marginRight: Spacing.md,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
