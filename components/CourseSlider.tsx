import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

const COURSES = [
    {
        id: '1',
        title: 'UX Lab: Motion Edition',
        author: 'Joseph Smith',
        progress: '2/3',
        image: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/course_ux_design_1770128732840.png',
        color: '#D49CFF',
    },
    {
        id: '2',
        title: 'Complete Web Development',
        author: 'Sarah Chen',
        progress: '1/5',
        image: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/course_web_dev_1770128754090.png',
        color: '#7C93FF',
    },
    {
        id: '3',
        title: 'SEO & Digital Marketing',
        author: 'Alex River',
        progress: '0/4',
        image: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/course_seo_marketing_1770128773182.png',
        color: '#FFB167',
    },
];

export const CourseSlider: React.FC = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const { width } = useWindowDimensions();

    const cardWidth = width - (Spacing.md * 2);

    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            snapToInterval={cardWidth + Spacing.md}
            decelerationRate="fast"
        >
            {COURSES.map((course) => (
                <View key={course.id} style={[styles.card, { backgroundColor: course.color, width: cardWidth }]}>
                    <Image source={{ uri: course.image }} style={styles.image} resizeMode="cover" />
                    <View style={styles.overlay}>
                        <View style={styles.header}>
                            <View style={styles.iconBox}>
                                <Ionicons name="disc-outline" size={20} color="#000" />
                            </View>
                            <View style={styles.progressBox}>
                                <Text style={styles.progressText}>{course.progress}</Text>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title} numberOfLines={1}>{course.title}</Text>
                                <Text style={styles.author}>{course.author}</Text>
                            </View>
                            <TouchableOpacity style={styles.joinBtn}>
                                <Text style={styles.joinBtnText}>JOIN NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: Spacing.md,
    },
    scrollContent: {
        paddingHorizontal: Spacing.md,
        gap: Spacing.md,
    },
    card: {
        height: 200,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: 0.6,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        padding: Spacing.lg,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconBox: {
        width: 32,
        height: 32,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: BorderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBox: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: Spacing.md,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    author: {
        fontSize: 14,
        color: '#000',
        opacity: 0.7,
    },
    joinBtn: {
        backgroundColor: '#000',
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.full,
        minWidth: 90,
        alignItems: 'center',
    },
    joinBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
